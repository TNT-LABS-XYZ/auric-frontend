'use client'

import { motion } from 'motion/react'
import { type WalletBalance, type Strategy, type Execution } from '../hooks/useAccount'
import { Header } from './dashboard/Header'
import { BalanceSection } from './dashboard/BalanceSection'
import { StrategiesSection } from './dashboard/StrategiesSection'
import { AccountSection } from './dashboard/AccountSection'
import { HistorySection } from './dashboard/HistorySection'

export interface DashboardProps {
  account: { smart_account_address: string; telegram_token: string | null } | null
  balance: WalletBalance | null
  price: number | null
  visibleStrategies: Strategy[]
  executions: Execution[]
  telegramLinked: boolean
  telegramUsername: string | null
  accessToken: string | null
  handleLogout: () => void
  pauseStrategy: (id: string) => void
  resumeStrategy: (id: string) => void
  unlinkTelegram: () => Promise<void>
}

export default function Dashboard({
  account,
  balance,
  price,
  visibleStrategies,
  executions,
  telegramLinked,
  telegramUsername,
  accessToken,
  handleLogout,
  pauseStrategy,
  resumeStrategy,
  unlinkTelegram,
}: DashboardProps) {
  const isZeroBalance = balance != null && balance.xaut === 0 && balance.usdt === 0
  const hasActivePlans = visibleStrategies.some((s) => s.status === 'active')
  const walletAddress = account?.smart_account_address ?? ''

  return (
    <div style={{ minHeight: '100svh', background: 'var(--bg)' }}>
      <Header onLogout={handleLogout} />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: 'var(--space-4) var(--space-3) var(--space-7)' }}>
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
          initial="initial"
          animate="animate"
        >
          {/* Warning banner: has active plans but zero balance */}
          {isZeroBalance && hasActivePlans && (
            <motion.div {...{ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0 } }} style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              padding: '14px 16px', borderRadius: 10,
              background: 'rgba(201,148,42,.06)', border: '1px solid rgba(201,148,42,.12)',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'rgba(201,148,42,.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a37420" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#7a5d12', letterSpacing: '-0.006em', margin: '0 0 4px' }}>
                  Your plans won&apos;t execute without USDT.
                </p>
                <p style={{ fontSize: 13, color: '#8b6914', lineHeight: 1.45, letterSpacing: '-0.006em', margin: 0 }}>
                  Deposit USDT to your wallet so your plans can run on schedule.
                </p>
                {walletAddress && (
                  <span style={{
                    display: 'inline-block', fontFamily: '"SF Mono", Consolas, monospace',
                    fontSize: 11, background: 'rgba(201,148,42,.1)', padding: '2px 6px',
                    borderRadius: 4, marginTop: 6, wordBreak: 'break-all', lineHeight: 1.4, color: '#7a5d12',
                  }}>
                    {walletAddress}
                  </span>
                )}
              </div>
            </motion.div>
          )}

          <BalanceSection balance={balance} price={price} executions={executions} showDepositCta={isZeroBalance && !hasActivePlans} />
          <StrategiesSection strategies={visibleStrategies} onPause={pauseStrategy} onResume={resumeStrategy} />
          <AccountSection
            walletAddress={account?.smart_account_address ?? ''}
            accessToken={accessToken}
            telegramLinked={telegramLinked}
            telegramUsername={telegramUsername}
            telegramToken={account?.telegram_token ?? null}
            onUnlinkTelegram={unlinkTelegram}
          />
          <HistorySection executions={executions} />
        </motion.div>
      </main>
    </div>
  )
}
