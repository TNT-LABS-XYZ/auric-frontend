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
      <main className="min-h-screen bg-white font-[family-name:var(--font-inter)] relative flex flex-col" style={{ letterSpacing: '-0.1px' }}>
        <AuricWordmark />
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-[400px] w-full px-5">
            <h1 className="text-[28px] font-medium text-[#201F1D] mb-2 text-center">Gold savings on autopilot.</h1>
            <p className="text-[15px] text-[#96938E] leading-relaxed mb-8 text-center">
              Set your rules once. Auric monitors XAUT, executes on-chain — while you sleep.
            </p>
            <div className="bg-[#F5F4F2] rounded-xl p-5 mb-4">
              <div className="flex gap-3.5">
                <div className="shrink-0 w-9 h-9 bg-[#EDD97A] rounded-lg flex items-center justify-center">
                  <AuricLogoMark size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#201F1D] mb-1.5">Non-custodial smart wallet</p>
                  <p className="text-[13px] text-[#6B6A66] leading-relaxed">
                    Powered by Tether&apos;s WDK. Gas is sponsored — you only need USDT
                  </p>
                </div>
              </div>
            </div>
            {error && <p className="text-xs text-red-600 mb-3">{error}</p>}
            <button onClick={handleLogin} className="w-full py-3.5 bg-[#EDD97A] hover:bg-[#e5cf6a] text-[#201F1D] text-[15px] font-medium rounded-full transition-colors cursor-pointer">
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
