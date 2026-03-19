'use client'

import { formatUnits } from 'viem'
import { useAccount } from './hooks/useAccount'
import type { Strategy } from './hooks/useAccount'
import { AuricWordmark } from './components/AuricWordmark'
import { LockIcon, WarningIcon, TelegramIcon, ExternalIcon } from './components/Icons'
import { Spinner, BalancesSkeleton, PriceSkeleton, RulesSkeleton } from './components/Skeletons'
import { WalletCard } from './components/WalletCard'
import { StatusBadge } from './components/StatusBadge'
import { useState } from 'react'

function TokenInfoTooltip() {
  const [visible, setVisible] = useState(false)
  return (
    <span className="relative flex items-center">
      <button
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="text-[#96938E] hover:text-[#201F1D] transition-colors cursor-default"
        aria-label="Token info"
        tabIndex={0}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </button>
      {visible && (
        <span className="absolute bottom-full right-0 mb-2 w-[220px] bg-[#201F1D] text-white text-[11px] leading-snug rounded-lg px-3 py-2.5 z-10 shadow-lg pointer-events-none">
          This token expires after 30 days and rotates when you log out and back in. If your MCP connection stops working, re-copy this config with your new token.
          <span className="absolute bottom-[-5px] right-[4px] w-2.5 h-2.5 bg-[#201F1D] rotate-45" />
        </span>
      )}
    </span>
  )
}

function McpSnippet({ token }: { token: string | null }) {
  const [copied, setCopied] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const snippet = JSON.stringify(
    {
      mcpServers: {
        auric: {
          command: 'npx',
          args: ['-y', 'mcp-remote', 'https://auric-backend-production.up.railway.app/mcp', '--header', `Authorization: Bearer ${token ?? 'YOUR_JWT_HERE'}`],
        },
      },
    },
    null,
    2
  )

  const handleCopy = () => {
    void navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-medium text-[#96938E] uppercase tracking-wide">MCP Server</div>
        <div className="flex items-center gap-3">
          {revealed && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                className="text-xs font-medium text-[#96938E] hover:text-[#201F1D] transition-colors cursor-pointer"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
              <TokenInfoTooltip />
            </div>
          )}
          <button
            onClick={() => setRevealed((v) => !v)}
            className="text-[#96938E] hover:text-[#201F1D] transition-colors cursor-pointer"
            aria-label={revealed ? 'Hide config' : 'Reveal config'}
          >
            {revealed ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {!revealed ? (
        <div className="bg-[#FFF8F0] rounded-lg px-3 py-2.5 flex items-start gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[1px]">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <p className="text-[12px] text-[#8B6914] leading-snug">
            This config contains your auth token. Treat it like a password — don&apos;t share it. Click the eye icon to reveal.
          </p>
        </div>
      ) : (
        <pre className="bg-[#F5F4F2] rounded-lg p-3 text-[11px] font-mono text-[#201F1D] overflow-x-auto leading-relaxed whitespace-pre">{snippet}</pre>
      )}
    </div>
  )
}

const TELEGRAM_BOT = process.env.NEXT_PUBLIC_TELEGRAM_BOT ?? ''

const fmt6 = (raw?: string): string => {
  if (!raw) return '0'
  return formatUnits(BigInt(raw), 6)
}

const formatRuleSummary = (s: Strategy): string => {
  if (s.type === 'dca') return `DCA — $${fmt6(s.amount)} ${s.frequency}`
  if (s.type === 'price_trigger') return `Price trigger — below $${Number(s.buy_below).toLocaleString()}`
  if (s.type === 'goal') return `Goal — ${Number(fmt6(s.accumulated)).toFixed(3)} / ${fmt6(s.target)} XAU₮`
  return s.label ?? s.type
}

const formatRuleDetail = (s: Strategy): string => {
  if (s.type === 'dca') return s.label ?? `$${fmt6(s.amount)} ${s.frequency}`
  if (s.type === 'price_trigger') return `Buy $${fmt6(s.amount)} when triggered`
  if (s.type === 'goal') return `$${fmt6(s.amount)} ${s.frequency}`
  return ''
}

const Page = () => {
  const {
    authLoading,
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
    telegramLinked,
    telegramUsername,
    dashboardLoading,
    handleLogin,
    handleLogout,
    handleRefreshToken,
    handleRefreshDashboard,
    accessToken,
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

  return (
    <main className="min-h-screen bg-white font-[family-name:var(--font-inter)]" style={{ letterSpacing: '-0.1px' }}>
      <AuricWordmark />

      <div className="max-w-[400px] mx-auto px-5 py-8">

        {/* ─── Step 0: Login gate ───────────────────────────────── */}
        {step === 0 && (
          <div>
            <h1 className="text-[28px] font-medium text-[#201F1D] mb-2">Gold savings on autopilot.</h1>
            <p className="text-[15px] text-[#96938E] leading-relaxed mb-8">
              Set your accumulation rules once. Auric monitors XAU₮ markets, evaluates your conditions, and executes on-chain — while you sleep.
            </p>
            <div className="bg-[#F5F4F2] rounded-xl p-5 mb-4">
              <div className="flex gap-3.5">
                <div className="shrink-0 w-9 h-9 bg-[rgba(0,185,125,0.1)] rounded-lg flex items-center justify-center"><LockIcon /></div>
                <div>
                  <p className="text-sm font-medium text-[#201F1D] mb-1.5">Non-custodial smart wallet</p>
                  <p className="text-[13px] text-[#6B6A66] leading-relaxed">
                    Powered by <a href="https://wdk.tether.io/" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted hover:text-[#201F1D] transition-colors">Tether&apos;s WDK</a>. Only you hold the keys. Gas is sponsored — you only need USD₮.
                  </p>
                </div>
              </div>
            </div>
            {error && <p className="text-xs text-red-600 mb-3">{error}</p>}
            <button onClick={handleLogin} className="w-full py-3.5 bg-[#00B97D] hover:bg-[#00a66f] text-white text-[15px] font-medium rounded-lg transition-colors cursor-pointer">
              Get started
            </button>
          </div>
        )}

        {/* ─── Step 1: Provisioning ─────────────────────────────── */}
        {step === 1 && isProvisioning && (
          <div className="text-center pt-16 animate-in">
            <Spinner className="mb-4" />
            <h2 className="text-xl font-medium text-[#201F1D] mb-2">Setting up your wallet</h2>
            <p className="text-[15px] text-[#96938E]">Creating your smart account on Ethereum...</p>
          </div>
        )}

        {/* ─── Step 2: Dashboard ────────────────────────────────── */}
        {step === 2 && account && (
          <div>
            {dashboardLoading && (
              <>
                <WalletCard address={account.smart_account_address} showDeposit={false} />
                <BalancesSkeleton />
                <PriceSkeleton />
                <RulesSkeleton />
              </>
            )}

            {!dashboardLoading && (
              <>
                {hasRules && (
                  <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-3">
                    <div className="text-xs font-medium text-[#96938E] uppercase tracking-wide mb-2">Rules</div>
                    {visibleStrategies.map((s, i) => (
                      <div key={s._id} className={`flex items-center justify-between py-2.5 ${i > 0 ? 'border-t border-[rgba(0,0,0,0.06)]' : ''}`}>
                        <div>
                          <div className={`text-sm font-medium ${s.status === 'active' ? 'text-[#201F1D]' : 'text-[#96938E]'}`}>{formatRuleSummary(s)}</div>
                          <div className="text-xs text-[#96938E] mt-0.5">{formatRuleDetail(s)}</div>
                        </div>
                        <StatusBadge status={s.status} />
                      </div>
                    ))}
                    {isZeroBalance && hasActiveRules && (
                      <div className="flex items-start gap-2 bg-[#FFF8F0] rounded-lg p-2.5 mt-2">
                        <WarningIcon />
                        <p className="text-[13px] text-[#8B6914] leading-snug">Your rules won&apos;t execute until you deposit USD₮.</p>
                      </div>
                    )}
                  </div>
                )}

                <WalletCard address={account.smart_account_address} showDeposit={isZeroBalance && !hasRules} />

                <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-3">
                  <div className="text-xs font-medium text-[#96938E] uppercase tracking-wide mb-2">Balances</div>
                  {balance ? (
                    <div>
                      <div className="flex justify-between items-baseline py-2">
                        <span className="text-sm text-[#96938E]">XAU₮</span>
                        <span>
                          <span className={`text-base font-medium font-mono ${balance.xaut > 0 ? 'text-[#DCCFBA]' : 'text-[#96938E]'}`}>{balance.xaut}</span>
                          {xautUsdValue != null && xautUsdValue > 0 && <span className="text-xs font-mono text-[#96938E] ml-1.5">~${xautUsdValue.toFixed(2)}</span>}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline py-2 border-t border-[rgba(0,0,0,0.06)]">
                        <span className="text-sm text-[#96938E]">USD₮</span>
                        <span className={`text-base font-medium font-mono ${balance.usdt > 0 ? 'text-[#201F1D]' : 'text-[#96938E]'}`}>${balance.usdt}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-[#96938E]">Loading...</p>
                  )}
                </div>

                {price != null && (
                  <a href="https://www.coingecko.com/en/coins/tether-gold" target="_blank" rel="noopener noreferrer" className="flex items-baseline justify-between px-1 mb-3 pb-3 border-b border-dashed border-[rgba(0,0,0,0.06)] hover:opacity-80 transition-opacity">
                    <span className="text-[13px] text-[#96938E]">XAU₮ price<ExternalIcon /></span>
                    <span className="text-[15px] font-medium font-mono text-[#DCCFBA]">${price.toLocaleString()} <span className="text-[11px] font-normal text-[#96938E]">/ oz</span></span>
                  </a>
                )}

                {!hasRules && (
                  <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-3">
                    <div className="text-xs font-medium text-[#96938E] uppercase tracking-wide mb-2">Active Rules</div>
                    <p className="text-sm text-[#96938E] leading-relaxed">No rules yet. Connect Telegram to set your first strategy.</p>
                  </div>
                )}

                {!telegramLinked ? (
                  <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-3">
                    <div className="text-xs font-medium text-[#96938E] uppercase tracking-wide mb-2">Telegram</div>
                    <p className="text-sm text-[#6B6A66] mb-3">Manage your rules and receive execution confirmations.</p>
                    {account.telegram_token ? (
                      <div>
                        <a href={`https://t.me/${TELEGRAM_BOT}?start=${account.telegram_token}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#229ED9] hover:bg-[#1a8fc4] text-white text-[15px] font-medium rounded-lg transition-colors">
                          <TelegramIcon />Connect Telegram
                        </a>
                        <div className="flex items-center justify-between mt-2">
                          <button onClick={() => void handleRefreshDashboard()} className="text-xs text-[#96938E] hover:text-[#201F1D] transition-colors cursor-pointer">I&apos;ve connected — refresh</button>
                          <button onClick={handleRefreshToken} className="text-xs text-[#96938E] hover:text-[#6B6A66] transition-colors cursor-pointer">Generate a new token</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={handleRefreshToken} className="w-full py-3 bg-[#F5F4F2] hover:bg-[#EDEBE9] text-[#201F1D] text-sm font-medium rounded-lg transition-colors cursor-pointer">Generate Link Token</button>
                    )}
                  </div>
                ) : (
                  <div className="bg-[#F5F4F2] rounded-xl px-4 py-3 mb-3 border-l-[3px] border-[#00B97D]">
                    <p className="text-sm font-medium text-[#201F1D] mb-0.5">Telegram linked</p>
                    <p className="text-[13px] text-[#6B6A66]">{telegramUsername ? `@${telegramUsername}` : "You'll receive confirmations after each execution."}</p>
                  </div>
                )}

                <McpSnippet token={accessToken} />

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full py-2.5 mt-4 border-t border-[rgba(0,0,0,0.06)] text-[13px] font-medium text-[#96938E] hover:text-[#201F1D] transition-colors cursor-pointer"
                >
                  Log out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

export default Page
