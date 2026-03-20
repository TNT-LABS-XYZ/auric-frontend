"use client";

import { useAccount } from "./hooks/useAccount";
import { AuricWordmark, AuricLogoMark } from "./components/AuricWordmark";
import { Spinner } from "./components/Skeletons";
import Dashboard from "./components/Dashboard";

const SpinnerScreen = () => (
  <main
    className="min-h-screen bg-white font-[family-name:var(--font-inter)]"
    style={{ letterSpacing: "-0.1px" }}
  >
    <AuricWordmark />
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "calc(100vh - 52px)",
        alignItems: "center",
      }}
    >
      <Spinner />
    </div>
  </main>
);

const Page = () => {
  const {
    authLoading,
    isAuthenticated,
    step,
    isProvisioning,
    error,
    handleLogin,
    handleLogout,
    account,
    balance,
    price,
    visibleStrategies,
    executions,
    telegramLinked,
    telegramUsername,
    accessToken,
    pauseStrategy,
    resumeStrategy,
    unlinkTelegram,
  } = useAccount();

  // Auth0 still resolving session, or session resolved + authenticated but profile not loaded yet
  if (authLoading || (isAuthenticated && step === 0)) {
    return <SpinnerScreen />;
  }

  // Step 0: Login gate — only shown when definitively not authenticated
  if (step === 0) {
    return (
      <main
        className="font-[family-name:var(--font-inter)] flex flex-col bg-white"
        style={{ minHeight: "100svh", animation: "fadeIn 150ms ease-out" }}
      >
        <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
        <AuricWordmark />
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px 32px",
          }}
        >
          <div style={{ width: "100%", maxWidth: 340 }}>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 500,
                letterSpacing: "-0.04em",
                color: "#1D1C1A",
                textAlign: "center",
                lineHeight: 1.2,
                margin: "0 0 10px",
              }}
            >
              Gold savings on autopilot.
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "#96938E",
                textAlign: "center",
                letterSpacing: "-0.1px",
                lineHeight: 1.6,
                margin: "0 0 28px",
              }}
            >
              Set your rules once. Auric monitors XAUT, executes on-chain —
              while you sleep.
            </p>
            <div
              style={{
                background: "#F7F6F6",
                borderRadius: 14,
                padding: "14px 16px",
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  flexShrink: 0,
                  background: "#FFEA98",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AuricLogoMark size={14} color="#8B7B2E" />
              </div>
              <div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#1D1C1A",
                    letterSpacing: "-0.1px",
                    margin: "0 0 3px",
                  }}
                >
                  Non-custodial smart wallet
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#96938E",
                    letterSpacing: "-0.1px",
                    lineHeight: 1.45,
                    margin: 0,
                  }}
                >
                  Powered by Tether&apos;s WDK. Gas is sponsored — you only need
                  USDT
                </p>
              </div>
            </div>
            {error && (
              <p style={{ fontSize: 12, color: "#dc2626", marginBottom: 12 }}>
                {error}
              </p>
            )}
            <button
              onClick={handleLogin}
              style={{
                display: "flex",
                height: 44,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 999,
                border: "2px solid rgba(127,117,76,.06)",
                background: "#FFEA98",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "inherit",
                color: "#1D1C1A",
                letterSpacing: "-0.1px",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#FFE37A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#FFEA98")
              }
            >
              Create your wallet
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Step 1: Provisioning
  if (step === 1 && isProvisioning) {
    return <SpinnerScreen />;
  }

  // Step 2: Dashboard
  return (
    <Dashboard
      account={account}
      balance={balance}
      price={price}
      visibleStrategies={visibleStrategies}
      executions={executions}
      telegramLinked={telegramLinked}
      telegramUsername={telegramUsername}
      accessToken={accessToken}
      handleLogout={handleLogout}
      pauseStrategy={pauseStrategy}
      resumeStrategy={resumeStrategy}
      unlinkTelegram={unlinkTelegram}
    />
  );
};

export default Page;
