'use client'

import { motion } from 'motion/react'
import { type Execution } from '../../hooks/useAccount'
import { fadeUp, f6, fmtUsd, XautCoin } from './shared'

function StatItem({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div>
      <p style={{
        fontSize: 'var(--text-label)', fontWeight: 'var(--weight-ui)',
        color: 'var(--text-muted)', letterSpacing: '-0.003em', marginBottom: 4,
      }}>
        {label}
      </p>
      <p style={{ margin: 0 }}>
        <span style={{
          fontSize: 15, fontWeight: 'var(--weight-heading)', letterSpacing: '-0.03em',
          color: accent ? 'var(--accent)' : 'var(--text)',
        }}>
          {value}
        </span>
        {sub && (
          <span style={{
            fontSize: 'var(--text-label)', color: 'var(--text-muted)',
            fontWeight: 'var(--weight-ui)', marginLeft: 3,
          }}>
            {sub}
          </span>
        )}
      </p>
    </div>
  )
}

export function BalanceSection({
  balance,
  price,
  executions,
}: {
  balance: { xaut: number; usdt: number } | null
  price: number | null
  executions: Execution[]
}) {
  const xautHeld = balance?.xaut ?? 0
  const usdtAvailable = balance?.usdt ?? 0

  const totalInvested = executions
    .filter((e) => e.status === 'success')
    .reduce((sum, e) => sum + f6(e.amount_spent), 0)

  const totalReceived = executions
    .filter((e) => e.status === 'success')
    .reduce((sum, e) => sum + f6(e.amount_received), 0)

  const avgPrice = totalReceived > 0 ? totalInvested / totalReceived : null
  const currentValue = xautHeld * (price ?? 0)
  const returnPct = totalInvested > 0 ? ((currentValue - totalInvested) / totalInvested) * 100 : null
  const returnPositive = returnPct != null && returnPct >= 0

  return (
    <motion.div {...fadeUp(0.04)} style={{
      background: '#fff',
      boxShadow: 'var(--shadow-card)',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      {/* Hero balance */}
      <div style={{ padding: 'var(--space-3) var(--space-3) var(--space-2)' }}>
        <p style={{
          fontSize: 'var(--text-label)', fontWeight: 'var(--weight-ui)',
          color: 'var(--text-muted)', letterSpacing: '-0.003em', marginBottom: 8,
        }}>
          Gold held
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <XautCoin size={28} />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{
              fontSize: 38, fontWeight: 'var(--weight-heading)', letterSpacing: '-0.05em',
              color: 'var(--text)', lineHeight: 1,
            }}>
              {xautHeld.toFixed(3)}
            </span>
            <span style={{
              fontSize: 16, fontWeight: 'var(--weight-ui)', color: 'var(--text-muted)',
              letterSpacing: '-0.02em',
            }}>
              XAU₮
            </span>
          </div>
        </div>
      </div>

      {/* Position stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--space-2)',
        padding: '0 var(--space-3) var(--space-2)',
      }}>
        <StatItem
          label="Total invested"
          value={currentValue > 0 ? `$${fmtUsd(currentValue)}` : '—'}
        />
        <StatItem
          label="Avg buy price"
          value={avgPrice != null ? `$${Math.round(avgPrice).toLocaleString()}` : '—'}
          sub={avgPrice != null ? '/ oz' : undefined}
        />
        <StatItem
          label="Return"
          value={returnPct != null ? `${returnPositive ? '+' : ''}${returnPct.toFixed(2)}%` : '—'}
          accent={returnPositive}
        />
      </div>

      {/* Footer row: USDT available + XAUT price */}
      <div style={{
        borderTop: '1px solid var(--border-rule)',
        padding: '10px var(--space-3)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
          <span style={{
            fontSize: 13, fontWeight: 'var(--weight-heading)',
            color: 'var(--text-mid)', letterSpacing: '-0.02em',
          }}>
            {fmtUsd(usdtAvailable)}
          </span>
          <span style={{
            fontSize: 'var(--text-label)', fontWeight: 'var(--weight-ui)',
            color: 'var(--text-muted)',
          }}>
            USDT available
          </span>
        </div>
        {price != null && (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
            <span style={{
              fontSize: 13, fontWeight: 'var(--weight-heading)',
              color: 'var(--text-mid)', letterSpacing: '-0.02em',
            }}>
              ${price.toLocaleString()}
            </span>
            <span style={{
              fontSize: 'var(--text-label)', fontWeight: 'var(--weight-ui)',
              color: 'var(--text-muted)',
            }}>
              XAUT price
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
