'use client'

import { useAccount } from './hooks/useAccount'
import { AuricWordmark, AuricLogoMark } from './components/AuricWordmark'
import { Spinner } from './components/Skeletons'
import Dashboard from './components/Dashboard'

const Page = () => {
  const {
    authLoading,
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
  } = useAccount()

  if (authLoading) {
    return (
      <main className="min-h-screen bg-white font-[family-name:var(--font-inter)]" style={{ letterSpacing: '-0.1px' }}>
        <AuricWordmark />
        <div className="max-w-[400px] mx-auto px-5 py-8 text-center pt-16">
          <Spinner />
        </div>
      </main>
    )
  }

  // Step 0: Login gate
  if (step === 0) {
    return (
      <main
        className="font-[family-name:var(--font-inter)] flex flex-col bg-white"
        style={{ minHeight: '100svh' }}
      >
        <AuricWordmark />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px 32px' }}>
          <div style={{ width: '100%', maxWidth: 340 }}>
            <h1 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.04em', color: '#1D1C1A', textAlign: 'center', lineHeight: 1.2, margin: '0 0 10px' }}>
              Gold savings on autopilot.
            </h1>
            <p style={{ fontSize: 14, color: '#96938E', textAlign: 'center', letterSpacing: '-0.1px', lineHeight: 1.6, margin: '0 0 28px' }}>
              Set your rules once. Auric monitors XAUT, executes on-chain — while you sleep.
            </p>
            <div style={{ background: '#F7F6F6', borderRadius: 14, padding: '14px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0, background: '#FFEA98', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AuricLogoMark size={14} color="#8B7B2E" />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: '#1D1C1A', letterSpacing: '-0.1px', margin: '0 0 3px' }}>
                  Non-custodial smart wallet
                </p>
                <p style={{ fontSize: 12, color: '#96938E', letterSpacing: '-0.1px', lineHeight: 1.45, margin: 0 }}>
                  Powered by Tether&apos;s WDK. Gas is sponsored — you only need USDT
                </p>
              </div>
            </div>
            {error && <p style={{ fontSize: 12, color: '#dc2626', marginBottom: 12 }}>{error}</p>}
            <button
              onClick={handleLogin}
              style={{ display: 'flex', height: 44, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 999, border: '2px solid rgba(127,117,76,.06)', background: '#FFEA98', cursor: 'pointer', fontSize: 14, fontWeight: 500, fontFamily: 'inherit', color: '#1D1C1A', letterSpacing: '-0.1px', boxSizing: 'border-box' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#FFE37A')}
              onMouseLeave={e => (e.currentTarget.style.background = '#FFEA98')}
            >
              Create your wallet
            </button>
          </div>
        </div>
      </main>
    )
  }

  // Step 1: Provisioning
  if (step === 1 && isProvisioning) {
    return (
      <main className="min-h-screen bg-white font-[family-name:var(--font-inter)]" style={{ letterSpacing: '-0.1px' }}>
        <AuricWordmark />
        <div className="max-w-[400px] mx-auto px-5 py-8 text-center pt-16 animate-in">
          <Spinner className="mb-4" />
          <h2 className="text-xl font-medium text-[#201F1D] mb-2">Setting up your wallet</h2>
          <p className="text-[15px] text-[#96938E]">Creating your smart account on Ethereum...</p>
        </div>
      </main>
    )
  }

  // Step 2: Dashboard — hook already called once above, pass state as props
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
  )
}

export default Page
