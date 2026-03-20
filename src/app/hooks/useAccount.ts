"use client";

import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { formatUnits } from "viem";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export const fmt6 = (raw?: string): string => {
  if (!raw) return "0";
  return formatUnits(BigInt(raw), 6);
};

// ─── Types ────────────────────────────────────────────────────────────────────

export type StrategyType = "dca" | "price_trigger" | "goal" | "ai_agent";
export type StrategyStatus = "active" | "paused" | "completed" | "cancelled";
export type DcaFrequency = "hourly" | "daily" | "weekly" | "monthly";
export type ExecutionTriggeredBy =
  | "dca"
  | "price_trigger"
  | "goal_progress"
  | "ai_agent"
  | "withdrawal";
export type ExecutionStatus = "success" | "failed";

export interface PendingStep {
  amount_usdt: number;
  execute_after: string;
  price_below?: number;
  label?: string;
  expires_at: string;
}

export interface Strategy {
  _id: string;
  user_id: string;
  type: StrategyType;
  status: StrategyStatus;
  smart_account_address: string;
  label?: string;

  // DCA / Goal
  amount?: string; // wei, 6 dec
  frequency?: DcaFrequency;
  day_of_week?: number;
  last_executed_at?: string;

  // Price trigger
  buy_below_usd?: number;
  cooldown_hours?: number;

  // Goal
  target_xaut?: number;
  accumulated: string; // wei, 6 dec

  // AI Agent
  max_amount_usdt?: number;
  min_interval_minutes?: number;
  ai_system_prompt?: string;
  agent_memory?: string;
  pending_steps: PendingStep[];

  // Spending cap (DCA + AI Agent)
  max_total_usdt?: number;
  total_spent_usdt: string; // wei, 6 dec

  // Stats
  completed_buys: number;
  consecutive_failures: number;
  max_consecutive_failures: number;

  created_at: string;
  updated_at: string;
}

export interface Execution {
  _id: string;
  strategy_id?: string | null;
  user_id: string;
  triggered_by: ExecutionTriggeredBy;
  xaut_price_usd: number;
  amount_spent: string; // wei, 6 dec
  amount_received: string; // wei, 6 dec
  tx_hash?: string;
  status: ExecutionStatus;
  error?: string;
  reasoning?: string; // ai_agent only
  token?: "usdt" | "xaut"; // withdrawal only
  to_address?: string; // withdrawal only
  executed_at: string;
}

export interface WalletBalance {
  xaut: number;
  usdt: number;
  user_id?: string;
}

export interface Account {
  smart_account_address: string;
  telegram_token: string | null;
}

export interface UserProfile {
  smart_account_address: string;
  created_at?: string;
  telegram: { chat_id: number; username?: string; linked_at?: string } | null;
}

// ─── API ──────────────────────────────────────────────────────────────────────

const authHeaders = (token: string) => ({ Authorization: `Bearer ${token}` });

const apiFetchBalances = async (
  token: string,
): Promise<{ balance: WalletBalance | null; price: number | null }> => {
  const headers = authHeaders(token);
  const [balRes, priceRes] = await Promise.allSettled([
    axios
      .get<WalletBalance>(`${API_URL}/wallet/balance`, { headers })
      .then((r) => r.data),
    axios
      .get<{ xaut_usd: number }>(`${API_URL}/wallet/price`, { headers })
      .then((r) => r.data),
  ]);
  const raw = balRes.status === "fulfilled" ? balRes.value : null;
  return {
    balance: raw
      ? { ...raw, xaut: Number(raw.xaut), usdt: Number(raw.usdt) }
      : null,
    price: priceRes.status === "fulfilled" ? priceRes.value.xaut_usd : null,
  };
};

const apiFetchStrategies = async (token: string): Promise<Strategy[]> => {
  try {
    const { data } = await axios.get<Strategy[]>(`${API_URL}/strategies`, {
      headers: authHeaders(token),
    });
    return data;
  } catch {
    return [];
  }
};

const apiFetchExecutions = async (token: string): Promise<Execution[]> => {
  try {
    const { data } = await axios.get<Execution[]>(`${API_URL}/executions`, {
      headers: authHeaders(token),
    });
    return data;
  } catch {
    return [];
  }
};

const apiFetchProfile = async (token: string): Promise<UserProfile | null> => {
  try {
    const { data } = await axios.get<UserProfile>(`${API_URL}/users/me`, {
      headers: authHeaders(token),
    });
    return data;
  } catch {
    return null;
  }
};

const apiRequestTelegramToken = async (
  token: string,
): Promise<string | null> => {
  try {
    const { data } = await axios.post<{ token: string }>(
      `${API_URL}/telegram/link`,
      null,
      { headers: authHeaders(token) },
    );
    return data.token ?? null;
  } catch {
    return null;
  }
};

const apiPauseStrategy = async (token: string, id: string): Promise<void> => {
  await axios.post(`${API_URL}/strategies/${id}/pause`, null, {
    headers: authHeaders(token),
  });
};

const apiResumeStrategy = async (token: string, id: string): Promise<void> => {
  await axios.post(`${API_URL}/strategies/${id}/resume`, null, {
    headers: authHeaders(token),
  });
};

const apiUnlinkTelegram = async (token: string): Promise<void> => {
  await axios.delete(`${API_URL}/telegram/link`, {
    headers: authHeaders(token),
  });
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAccount = () => {
  const {
    isAuthenticated,
    isLoading: authLoading,
    loginWithRedirect,
    getAccessTokenSilently,
    logout,
  } = useAuth0();

  const [step, setStep] = useState(0);
  const [account, setAccount] = useState<Account | null>(null);
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [telegramLinked, setTelegramLinked] = useState(false);
  const [telegramUsername, setTelegramUsername] = useState<string | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const visibleStrategies = strategies.filter((s) => s.status !== "cancelled");
  const hasRules = visibleStrategies.length > 0;
  const hasActiveRules = visibleStrategies.some((s) => s.status === "active");
  const isZeroBalance =
    balance != null && balance.xaut === 0 && balance.usdt === 0;
  const xautUsdValue = balance && price ? balance.xaut * price : null;

  useEffect(() => {
    if (isAuthenticated) void loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Poll dashboard data every 60 seconds while logged in
  useEffect(() => {
    if (!accessToken) return;
    const id = setInterval(() => {
      void loadDashboard(accessToken);
    }, 60_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const loadDashboard = async (token: string) => {
    const [{ balance: b, price: p }, strats, execs, profile] =
      await Promise.all([
        apiFetchBalances(token),
        apiFetchStrategies(token),
        apiFetchExecutions(token),
        apiFetchProfile(token),
      ]);
    if (b) setBalance(b);
    if (p != null) setPrice(p);
    setStrategies(strats);
    setExecutions(execs);
    if (profile?.telegram) {
      setTelegramLinked(true);
      setTelegramUsername(profile.telegram.username ?? null);
    }
  };

  const loadProfile = async () => {
    setError("");
    setIsProvisioning(true);
    setStep(1);
    try {
      const token = await getAccessTokenSilently();
      setAccessToken(token);
      const profile = await apiFetchProfile(token);
      if (!profile) throw new Error("Failed to load account");

      const alreadyLinked = !!profile.telegram;
      const telegramToken = alreadyLinked
        ? null
        : await apiRequestTelegramToken(token);
      setAccount({
        smart_account_address: profile.smart_account_address,
        telegram_token: telegramToken,
      });

      if (alreadyLinked) {
        setTelegramLinked(true);
        setTelegramUsername(profile.telegram!.username ?? null);
      }

      setDashboardLoading(true);
      setStep(2);
      await loadDashboard(token);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load account");
      setStep(0);
    } finally {
      setIsProvisioning(false);
      setDashboardLoading(false);
    }
  };

  const handleRefreshToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      const telegramToken = await apiRequestTelegramToken(token);
      if (telegramToken)
        setAccount((prev) =>
          prev ? { ...prev, telegram_token: telegramToken } : null,
        );
    } catch {
      /* silent */
    }
  };

  const handleRefreshDashboard = async () => {
    try {
      const token = await getAccessTokenSilently();
      await loadDashboard(token);
    } catch {
      /* silent */
    }
  };

  const pauseStrategy = async (id: string) => {
    // Optimistic update
    setStrategies((prev) =>
      prev.map((s) => (s._id === id ? { ...s, status: "paused" } : s)),
    );
    try {
      const token = await getAccessTokenSilently();
      await apiPauseStrategy(token, id);
    } catch {
      // Revert on failure
      setStrategies((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: "active" } : s)),
      );
    }
  };

  const resumeStrategy = async (id: string) => {
    setStrategies((prev) =>
      prev.map((s) => (s._id === id ? { ...s, status: "active" } : s)),
    );
    try {
      const token = await getAccessTokenSilently();
      await apiResumeStrategy(token, id);
    } catch {
      setStrategies((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: "paused" } : s)),
      );
    }
  };

  const unlinkTelegram = async () => {
    setTelegramLinked(false);
    setTelegramUsername(null);
    try {
      const token = await getAccessTokenSilently();
      await apiUnlinkTelegram(token);
      const telegramToken = await apiRequestTelegramToken(token);
      setAccount((prev) =>
        prev ? { ...prev, telegram_token: telegramToken } : null,
      );
    } catch {
      setTelegramLinked(true);
    }
  };

  const handleLogin = () => loginWithRedirect();
  const handleLogout = () =>
    logout({ logoutParams: { returnTo: window.location.origin } });

  return {
    authLoading,
    isAuthenticated,
    handleLogin,
    handleLogout,
    step,
    isProvisioning,
    error,
    account,
    balance,
    price,
    visibleStrategies,
    hasRules,
    hasActiveRules,
    isZeroBalance,
    xautUsdValue,
    executions,
    telegramLinked,
    telegramUsername,
    dashboardLoading,
    accessToken,
    handleRefreshToken,
    handleRefreshDashboard,
    pauseStrategy,
    resumeStrategy,
    unlinkTelegram,
  };
};
