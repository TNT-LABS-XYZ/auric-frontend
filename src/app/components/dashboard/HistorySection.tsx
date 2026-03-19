'use client'

import { motion } from 'motion/react'
import { type Execution } from '../../hooks/useAccount'
import { fadeUp, f6, fmtDate, fmtUsd } from './shared'

const TRIGGER_META: Record<string, { label: string; color: string; bg: string }> = {
  dca:           { label: 'DCA',     color: 'var(--accent)', bg: 'var(--accent-surface)' },
  price_trigger: { label: 'Trigger', color: 'var(--gold)',   bg: 'rgba(201,148,42,.1)' },
  goal_progress: { label: 'Goal',    color: 'var(--text)',   bg: 'var(--bg-surface)' },
  ai_agent:      { label: 'AI',      color: '#9896FF',       bg: 'rgba(152,150,255,.1)' },
}

const thStyle: React.CSSProperties = {
  padding: '10px 12px', textAlign: 'left',
  fontSize: 'var(--text-label)', fontWeight: 'var(--weight-ui)',
  color: 'var(--text-muted)', letterSpacing: '-0.003em',
  whiteSpace: 'nowrap', borderBottom: '1px solid var(--border-rule)',
}

const tdStyle: React.CSSProperties = {
  padding: '12px 12px', fontSize: 'var(--text-body)', color: 'var(--text)',
  borderBottom: '1px solid rgba(0,0,0,.04)', letterSpacing: '-0.006em', verticalAlign: 'middle',
}

export function HistorySection({ executions }: { executions: Execution[] }) {
  return (
    <motion.div {...fadeUp(0.24)}>
      <p style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--weight-ui)', color: 'var(--text-muted)', letterSpacing: '-0.003em', marginBottom: 'var(--space-1)' }}>
        History
      </p>

      <div style={{ background: '#fff', borderRadius: 12, boxShadow: 'var(--shadow-card)', overflow: 'auto' }}>
        {executions.length === 0 ? (
          <div style={{ padding: 'var(--space-3)' }}>
            <p style={{ fontSize: 'var(--text-body)', color: 'var(--text-muted)', margin: 0 }}>No transactions yet.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Strategy</th>
                <th style={thStyle}>Acquired</th>
                <th style={thStyle}>Cost</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {executions.map((ex, i) => {
                const meta = TRIGGER_META[ex.triggered_by] ?? TRIGGER_META.dca
                const isLast = i === executions.length - 1
                const border = isLast ? 'none' : tdStyle.borderBottom
                return (
                  <tr
                    key={ex._id}
                    style={{ transition: 'background 0.1s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,.01)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                  >
                    <td style={{ ...tdStyle, color: 'var(--text-muted)', borderBottom: border }}>{fmtDate(ex.executed_at)}</td>
                    <td style={{ ...tdStyle, borderBottom: border }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        padding: '3px 8px', borderRadius: 50,
                        fontSize: 'var(--text-label)', fontWeight: 'var(--weight-ui)',
                        background: meta.bg, color: meta.color,
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: meta.color, flexShrink: 0 }} />
                        {meta.label}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, fontFamily: '"SF Mono", Consolas, Menlo, monospace', fontWeight: 'var(--weight-ui)', letterSpacing: '-0.02em', borderBottom: border }}>
                      +{f6(ex.amount_received).toFixed(3)} XAU₮
                    </td>
                    <td style={{ ...tdStyle, color: 'var(--text-muted)', borderBottom: border }}>
                      ${fmtUsd(f6(ex.amount_spent))}
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'right', borderBottom: border }}>
                      <span style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--weight-ui)', color: ex.status === 'success' ? 'var(--accent)' : 'var(--error)' }}>
                        {ex.status === 'success' ? 'Done' : 'Failed'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {executions.length > 0 && (
        <div style={{ display: 'flex', padding: 'var(--space-1) 2px', fontSize: 'var(--text-label)', color: 'var(--text-muted)' }}>
          <span>{executions.length} transaction{executions.length === 1 ? '' : 's'}</span>
        </div>
      )}
    </motion.div>
  )
}
