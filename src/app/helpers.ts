import { formatUnits } from 'viem'

export interface Strategy {
  _id: string
  type: 'dca' | 'price_trigger' | 'goal'
  status: 'active' | 'paused' | 'completed' | 'cancelled'
  amount?: string
  frequency?: string
  day_of_week?: number
  buy_below_usd?: number
  target_xaut?: number
  accumulated?: string
  label?: string
  last_executed_at?: string
}

export function parseBalance(raw: { xaut: unknown; usdt: unknown }): { xaut: number; usdt: number } {
  return { xaut: Number(raw.xaut), usdt: Number(raw.usdt) }
}

export function fmt6(raw?: string): string {
  if (!raw) return '0'
  return formatUnits(BigInt(raw), 6)
}

export function formatRuleSummary(s: Strategy): string {
  if (s.type === 'dca') return `DCA — $${fmt6(s.amount)} ${s.frequency}`
  if (s.type === 'price_trigger') return `Price trigger — below $${(s.buy_below_usd ?? 0).toLocaleString()}`
  if (s.type === 'goal') return `Goal — ${Number(fmt6(s.accumulated)).toFixed(3)} / ${(s.target_xaut ?? 0).toFixed(4)} XAU₮`
  return s.label ?? s.type
}

export function formatRuleDetail(s: Strategy): string {
  if (s.type === 'dca') return s.label ?? `$${fmt6(s.amount)} ${s.frequency}`
  if (s.type === 'price_trigger') return `Buy $${fmt6(s.amount)} when triggered`
  if (s.type === 'goal') return `$${fmt6(s.amount)} ${s.frequency}`
  return ''
}

export function isZeroBalance(balance: { xaut: number; usdt: number } | null): boolean {
  return balance != null && balance.xaut === 0 && balance.usdt === 0
}
