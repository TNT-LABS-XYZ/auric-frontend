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
  return (
    <div style={{ minHeight: '100svh', background: 'var(--bg)' }}>
      <Header onLogout={handleLogout} />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: 'var(--space-4) var(--space-3) var(--space-7)' }}>
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
          initial="initial"
          animate="animate"
        >
          <BalanceSection balance={balance} price={price} executions={executions} />
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
