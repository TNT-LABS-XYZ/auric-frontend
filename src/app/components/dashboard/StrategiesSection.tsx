'use client'

import { motion } from 'motion/react'
import {
  ChartLine, Lightning, Target, Robot, Pause, Play,
  type Icon,
} from '@phosphor-icons/react'
import { type Strategy } from '../../hooks/useAccount'
import { fadeUp, ease, f6 } from './shared'

function strategyProps(s: Strategy): { Icon: Icon; label: string; primary: string; meta: string; progress?: number } {
  if (s.type === 'dca') {
    const next = s.last_executed_at
      ? new Date(new Date(s.last_executed_at).getTime() + (
          s.frequency === 'hourly' ? 3600000 :
          s.frequency === 'daily' ? 86400000 :
          s.frequency === 'weekly' ? 604800000 :
          2592000000
        )).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      : 'Pending'
    return { Icon: ChartLine, label: 'DCA', primary: `$${f6(s.amount).toFixed(2)} / ${s.frequency ?? ''}`, meta: `Next: ${next}` }
  }

  if (s.type === 'price_trigger') {
    const lastHit = s.last_executed_at
      ? new Date(s.last_executed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : 'Never'
    return { Icon: Lightning, label: 'Price trigger', primary: `< $${s.buy_below_usd?.toLocaleString() ?? '—'}`, meta: `Last hit ${lastHit}` }
  }

  if (s.type === 'goal') {
    const acc = f6(s.accumulated)
    const target = s.target_xaut ?? 0
    const pct = target > 0 ? Math.min(100, Math.round((acc / target) * 100)) : 0
    return { Icon: Target, label: 'Goal', primary: `${target} XAU₮`, meta: `${acc.toFixed(3)} accumulated`, progress: pct }
  }

  const pending = s.pending_steps?.length ?? 0
  return {
    Icon: Robot, label: 'AI Agent', primary: s.label ?? 'AI Agent',
    meta: pending > 0 ? `${pending} step${pending === 1 ? '' : 's'} pending` : 'Monitoring',
  }
}

function StrategyRow({
  strategy, isLast, onPause, onResume,
}: {
  strategy: Strategy
  isLast: boolean
  onPause: (id: string) => void
  onResume: (id: string) => void
}) {
  const paused = strategy.status === 'paused'
  const { Icon, label, primary, meta, progress } = strategyProps(strategy)

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '36px 1fr auto',
      alignItems: 'center', gap: 14,
      padding: '14px var(--space-2)',
      borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,.04)',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: 'var(--bg-secondary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon size={14} weight="fill" color={paused ? 'var(--text-muted)' : 'var(--text)'} />
      </div>

      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
          <span style={{
            fontSize: 'var(--text-body)', fontWeight: 'var(--weight-heading)',
            color: paused ? 'var(--text-muted)' : 'var(--text)', letterSpacing: '-0.02em',
          }}>
            {primary}
          </span>
          <span style={{ fontSize: 'var(--text-label)', color: 'var(--text-muted)', fontWeight: 'var(--weight-ui)' }}>
            {label}
          </span>
        </div>
        {progress != null ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, maxWidth: 140, height: 3, background: 'rgba(0,0,0,.06)', borderRadius: 99, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease, delay: 0.3 }}
                style={{ height: '100%', background: 'var(--gold)', borderRadius: 99 }}
              />
            </div>
            <span style={{ fontSize: 'var(--text-label)', color: 'var(--text-muted)', fontWeight: 'var(--weight-ui)', whiteSpace: 'nowrap' }}>
              {progress}% · {meta}
            </span>
          </div>
        ) : (
          <p style={{ fontSize: 'var(--text-label)', color: 'var(--text-muted)', letterSpacing: '-0.003em' }}>
            {meta}
          </p>
        )}
      </div>

      <button
        onClick={() => paused ? onResume(strategy._id) : onPause(strategy._id)}
        style={{
          display: 'flex', alignItems: 'center', gap: 4,
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 0, fontFamily: 'inherit',
          fontSize: 'var(--text-label)', fontWeight: 'var(--weight-ui)',
          color: paused ? 'var(--text-muted)' : 'var(--accent)',
          letterSpacing: '-0.003em', transition: 'color 0.15s ease', whiteSpace: 'nowrap',
        }}
      >
        {paused
          ? <><Play size={10} weight="fill" style={{ marginRight: 3 }} />Resume</>
          : <><Pause size={10} weight="fill" style={{ marginRight: 3 }} />Pause</>
        }
      </button>
    </div>
  )
}

export function StrategiesSection({
  strategies, onPause, onResume,
}: {
  strategies: Strategy[]
  onPause: (id: string) => void
  onResume: (id: string) => void
}) {
  return (
    <motion.div {...fadeUp(0.12)}>
      <p style={{
        fontSize: 'var(--text-label)', fontWeight: 'var(--weight-ui)',
        color: 'var(--text-muted)', letterSpacing: '-0.003em', marginBottom: 'var(--space-1)',
      }}>
        Strategies
      </p>
      {strategies.length === 0 ? (
        <div style={{ background: '#fff', boxShadow: 'var(--shadow-card)', borderRadius: 12, padding: 'var(--space-3)' }}>
          <p style={{ fontSize: 'var(--text-body)', color: 'var(--text-muted)', margin: 0 }}>
            No rules yet. Connect Telegram to set your first strategy.
          </p>
        </div>
      ) : (
        <div style={{ background: '#fff', boxShadow: 'var(--shadow-card)', borderRadius: 12 }}>
          {strategies.map((s, i) => (
            <StrategyRow
              key={s._id}
              strategy={s}
              isLast={i === strategies.length - 1}
              onPause={onPause}
              onResume={onResume}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
