'use client'

import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

export interface Account {
  smart_account_address: string
  telegram_token: string | null
}

export interface UserProfile {
  smart_account_address: string
  created_at: string
  telegram: { chat_id: number; username: string; linked_at: string } | null
}

export interface Strategy {
  _id: string
  type: 'dca' | 'price_trigger' | 'goal'
  status: 'active' | 'paused' | 'completed' | 'cancelled'
  amount?: string
  frequency?: string
  day_of_week?: number
  buy_below?: string
  target?: string
  accumulated?: string
  label?: string
  last_executed_at?: string
}

// ─── API ──────────────────────────────────────────────────────────────────────

const authHeaders = (token: string) => ({ Authorization: `Bearer ${token}` })

const apiFetchBalances = async (token: string) => {
  const headers = authHeaders(token)
  const [balRes, priceRes] = await Promise.allSettled([
    axios.get(`${API_URL}/wallet/balance`, { headers }).then((r) => r.data),
    axios.get(`${API_URL}/wallet/price`, { headers }).then((r) => r.data),
  ])
  return {
    balance: balRes.status === 'fulfilled' ? balRes.value : null,
    price: priceRes.status === 'fulfilled' ? priceRes.value.xaut_usd : null,
  }
}

const apiFetchStrategies = async (token: string): Promise<Strategy[]> => {
  try {
    const { data } = await axios.get<Strategy[]>(`${API_URL}/strategies`, { headers: authHeaders(token) })
    return data
  } catch {
    return []
  }
}

const apiFetchProfile = async (token: string): Promise<UserProfile | null> => {
  try {
    const { data } = await axios.get<UserProfile>(`${API_URL}/users/me`, { headers: authHeaders(token) })
    return data
  } catch {
    return null
  }
}

const apiRequestTelegramToken = async (token: string): Promise<string | null> => {
  try {
    const { data } = await axios.post(`${API_URL}/telegram/link`, null, { headers: authHeaders(token) })
    return data.token ?? null
  } catch {
    return null
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAccount = () => {
  const { isAuthenticated, isLoading: authLoading, loginWithRedirect, getAccessTokenSilently, logout } = useAuth0()

  const [step, setStep] = useState(0)
  const [account, setAccount] = useState<Account | null>(null)
  const [isProvisioning, setIsProvisioning] = useState(false)
  const [error, setError] = useState('')
  const [balance, setBalance] = useState<{ xaut: number; usdt: number } | null>(null)
  const [price, setPrice] = useState<number | null>(null)
  const [strategies, setStrategies] = useState<Strategy[]>([])
  const [telegramLinked, setTelegramLinked] = useState(false)
  const [telegramUsername, setTelegramUsername] = useState<string | null>(null)
  const [dashboardLoading, setDashboardLoading] = useState(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const visibleStrategies = strategies.filter((s) => s.status !== 'cancelled')
  const hasRules = visibleStrategies.length > 0
  const hasActiveRules = visibleStrategies.some((s) => s.status === 'active')
  const isZeroBalance = balance != null && balance.xaut === 0 && balance.usdt === 0
  const xautUsdValue = balance && price ? balance.xaut * price : null

  useEffect(() => {
    if (isAuthenticated) void loadProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  const loadDashboard = async (token: string) => {
    const [{ balance: b, price: p }, strats, profile] = await Promise.all([
      apiFetchBalances(token),
      apiFetchStrategies(token),
      apiFetchProfile(token),
    ])
    if (b) setBalance(b)
    if (p != null) setPrice(p)
    setStrategies(strats)
    if (profile) {
      if (profile.smart_account_address) {
        setAccount((prev) => prev ? { ...prev, smart_account_address: profile.smart_account_address } : prev)
      }
      if (profile.telegram) {
        setTelegramLinked(true)
        setTelegramUsername(profile.telegram.username)
      }
    }
  }

  const loadProfile = async () => {
    setError('')
    setIsProvisioning(true)
    setStep(1)
    try {
      const token = await getAccessTokenSilently()
      setAccessToken(token)
      const profile = await apiFetchProfile(token)
      if (!profile) throw new Error('Failed to load account')

      const telegramToken = await apiRequestTelegramToken(token)
      setAccount({ smart_account_address: profile.smart_account_address, telegram_token: telegramToken })

      if (profile.telegram) {
        setTelegramLinked(true)
        setTelegramUsername(profile.telegram.username)
      }

      setDashboardLoading(true)
      setStep(2)
      await loadDashboard(token)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load account')
      setStep(0)
    } finally {
      setIsProvisioning(false)
      setDashboardLoading(false)
    }
  }

  const handleRefreshToken = async () => {
    try {
      const token = await getAccessTokenSilently()
      const telegramToken = await apiRequestTelegramToken(token)
      if (telegramToken) setAccount((prev) => prev ? { ...prev, telegram_token: telegramToken } : null)
    } catch { /* silent */ }
  }

  const handleRefreshDashboard = async () => {
    try {
      const token = await getAccessTokenSilently()
      await loadDashboard(token)
    } catch { /* silent */ }
  }

  const handleLogin = () => loginWithRedirect()

  const handleLogout = () => logout({ logoutParams: { returnTo: window.location.origin } })

  return {
    // auth
    authLoading,
    isAuthenticated,
    handleLogin,
    handleLogout,
    // step
    step,
    isProvisioning,
    error,
    // account
    account,
    balance,
    price,
    // strategies
    visibleStrategies,
    hasRules,
    hasActiveRules,
    isZeroBalance,
    xautUsdValue,
    // telegram
    telegramLinked,
    telegramUsername,
    // loading
    dashboardLoading,
    // token
    accessToken,
    // handlers
    handleRefreshToken,
    handleRefreshDashboard,
  }
}
