'use client'

import { useState, useEffect } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3002'
const TELEGRAM_BOT = process.env.NEXT_PUBLIC_TELEGRAM_BOT ?? ''
const STORAGE_KEY = 'auric_account'

interface Account {
  user_id: string
  api_key: string
  wallet_address: string
  telegram_token: string | null
}

interface Strategy {
  _id: string
  type: 'dca' | 'price_trigger' | 'goal'
  status: 'active' | 'paused' | 'completed' | 'cancelled'
  amount_usd?: number
  frequency?: string
  day_of_week?: number
  buy_below_usd?: number
  target_xaut?: number
  accumulated_xaut?: number
  label?: string
  last_executed_at?: string
}

// ─── API ──────────────────────────────────────────────────────────────────────

async function createAccount(): Promise<Account> {
  const res = await fetch('/api/account', { method: 'POST' })
  const data = await res.json()
  if (!res.ok) throw new Error(data?.error ?? `HTTP ${res.status}`)
  return {
    user_id: data.user_id,
    api_key: data.api_key,
    wallet_address: data.wallet_address,
    telegram_token: data.telegram_token,
  }
}

async function fetchBalances(apiKey: string) {
  const h = { 'x-api-key': apiKey }
  const [balRes, priceRes] = await Promise.allSettled([
    fetch(`${API_URL}/wallet/balance`, { headers: h }).then((r) => r.json()),
    fetch(`${API_URL}/wallet/price`, { headers: h }).then((r) => r.json()),
  ])
  return {
    balance: balRes.status === 'fulfilled' ? balRes.value : null,
    price: priceRes.status === 'fulfilled' ? priceRes.value.xaut_usd : null,
  }
}

async function fetchStrategies(apiKey: string): Promise<Strategy[]> {
  const res = await fetch(`${API_URL}/strategies`, {
    headers: { 'x-api-key': apiKey },
  })
  if (!res.ok) return []
  return res.json()
}

async function refreshTelegramToken(apiKey: string): Promise<string | null> {
  const res = await fetch(`${API_URL}/telegram/link`, {
    method: 'POST',
    headers: { 'x-api-key': apiKey },
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.token
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00B97D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function WalletIcon({ stroke = '#96938E' }: { stroke?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  )
}

function KeyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#96938E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
      <path d="m21 2-9.6 9.6" />
      <circle cx="7.5" cy="15.5" r="5.5" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B6A66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4880D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-px">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.04 9.613c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 14.803l-2.95-.924c-.642-.2-.654-.642.136-.953l11.514-4.44c.537-.194 1.006.131.382.762z" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00B97D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function Spinner({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-block w-8 h-8 border-[3px] border-[#EDEBE9] border-t-[#00B97D] rounded-full animate-spin ${className}`} />
  )
}

// ─── Shared components ────────────────────────────────────────────────────────

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#96938E] bg-[#F5F4F2] rounded-[6px] px-3 py-1.5 hover:bg-[#EDEBE9] hover:text-[#201F1D] transition-colors cursor-pointer"
    >
      <CopyIcon />
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

function StepDots({ current }: { current: number }) {
  return (
    <div className="flex gap-2 justify-center py-2">
      {[0, 1].map((i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-colors ${
            i === current ? 'bg-[#00B97D]' : i < current ? 'bg-[#00B97D] opacity-40' : 'bg-[#EDEBE9]'
          }`}
        />
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: Strategy['status'] }) {
  const styles = {
    active: 'text-[#00B97D] bg-[rgba(0,185,125,0.1)]',
    paused: 'text-[#C4880D] bg-[#FFF8F0]',
    completed: 'text-[#201F1D] bg-[#F5F4F2]',
    cancelled: 'text-[#96938E] bg-[#F5F4F2]',
  }
  const labels = { active: 'Active', paused: 'Paused', completed: 'Completed', cancelled: 'Cancelled' }
  return (
    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-[6px] ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

function formatRuleSummary(s: Strategy): string {
  if (s.type === 'dca') return `DCA — $${s.amount_usd} ${s.frequency}`
  if (s.type === 'price_trigger') return `Price trigger — below $${s.buy_below_usd?.toLocaleString()}`
  if (s.type === 'goal') return `Goal — ${s.accumulated_xaut?.toFixed(3) ?? '0'} / ${s.target_xaut} XAU₮`
  return s.label ?? s.type
}

function formatRuleDetail(s: Strategy): string {
  if (s.type === 'dca') return s.label ?? `$${s.amount_usd} ${s.frequency}`
  if (s.type === 'price_trigger') return `Buy $${s.amount_usd} when triggered`
  if (s.type === 'goal') return `$${s.amount_usd} ${s.frequency}`
  return ''
}

// ─── Wordmark ─────────────────────────────────────────────────────────────────

function AuricWordmark() {
  return (
    <div className="flex items-center justify-center pt-6 pb-2">
      <svg width="98" height="20" viewBox="0 0 98 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.5 0.278748C24.7467 0.278748 29 4.53204 29 9.77875C29 15.0255 24.7467 19.2787 19.5 19.2787H9.5C4.2533 19.2787 0 15.0255 0 9.77875C0 4.53204 4.2533 0.278748 9.5 0.278748H19.5ZM10.5 4.27875C7.46243 4.27875 5 6.74118 5 9.77875C5 12.8163 7.46243 15.2787 10.5 15.2787H18.5C21.5376 15.2787 24 12.8163 24 9.77875C24 6.74118 21.5376 4.27875 18.5 4.27875H10.5Z" fill="#201F1D"/>
        <path d="M91.2799 19.5575C87.234 19.5575 84.7036 16.7767 84.7036 12.3354V12.3223C84.7036 7.93369 87.2867 5.15295 91.2403 5.15295C94.8118 5.15295 96.9731 7.44608 97.2104 10.0555L97.2235 10.1477H94.5087L94.4823 10.0423C94.1792 8.68489 93.1249 7.53833 91.2667 7.53833C89.0527 7.53833 87.6162 9.38337 87.6162 12.3486V12.3618C87.6162 15.3929 89.079 17.1721 91.2799 17.1721C93.0327 17.1721 94.1529 16.1573 94.4955 14.6549L94.5087 14.5495H97.2499L97.2367 14.6417C96.9336 17.4225 94.6141 19.5575 91.2799 19.5575Z" fill="#201F1D"/>
        <path d="M80.9608 3.28154C80.0383 3.28154 79.3003 2.54352 79.3003 1.64736C79.3003 0.738016 80.0383 0 80.9608 0C81.8965 0 82.6214 0.738016 82.6214 1.64736C82.6214 2.54352 81.8965 3.28154 80.9608 3.28154ZM79.5375 19.2807V5.41651H82.3841V19.2807H79.5375Z" fill="#201F1D"/>
        <path d="M70.5627 19.2807V5.41653H73.4093V7.78873H73.4752C73.9233 6.16773 75.0831 5.15295 76.6645 5.15295C77.0731 5.15295 77.4289 5.21885 77.6529 5.25838V7.90734C77.4289 7.81508 76.9281 7.74919 76.3746 7.74919C74.5427 7.74919 73.4093 8.94847 73.4093 11.0175V19.2807H70.5627Z" fill="#201F1D"/>
        <path d="M60.5731 19.5574C57.5288 19.5574 55.7892 17.5938 55.7892 14.4045V5.4165H58.6358V13.851C58.6358 15.9464 59.6111 17.1062 61.5879 17.1062C63.5911 17.1062 64.8826 15.6697 64.8826 13.5083V5.4165H67.7424V19.2807H64.8826V17.1984H64.8167C64.0919 18.5954 62.6818 19.5574 60.5731 19.5574Z" fill="#201F1D"/>
        <path d="M37.4969 19.2806L44.4159 0.26355H47.6051L54.5109 19.2806H51.4138L49.6742 14.1409H42.3468L40.594 19.2806H37.4969ZM45.9841 3.4133L43.1375 11.7687H48.8703L46.0369 3.4133H45.9841Z" fill="#201F1D"/>
      </svg>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AccountPage() {
  const [step, setStep] = useState(0)
  const [account, setAccount] = useState<Account | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')
  const [balance, setBalance] = useState<{ xaut: number; usdt: number } | null>(null)
  const [price, setPrice] = useState<number | null>(null)
  const [strategies, setStrategies] = useState<Strategy[]>([])
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [telegramLinked, setTelegramLinked] = useState(false)

  const isZeroBalance = balance != null && balance.xaut === 0 && balance.usdt === 0
  const visibleStrategies = strategies.filter((s) => s.status !== 'cancelled')
  const hasActiveRules = visibleStrategies.some((s) => s.status === 'active')

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    try {
      const saved = JSON.parse(raw) as Account
      setAccount(saved)
      setStep(2)
      void loadDashboard(saved.api_key)
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadDashboard = async (apiKey: string) => {
    const [{ balance: b, price: p }, strats] = await Promise.all([
      fetchBalances(apiKey),
      fetchStrategies(apiKey),
    ])
    if (b) setBalance(b)
    if (p != null) setPrice(p)
    setStrategies(strats)
  }

  const handleCreate = async () => {
    setError('')
    setIsCreating(true)
    setStep(1)
    try {
      const acc = await createAccount()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(acc))
      setAccount(acc)
      void loadDashboard(acc.api_key)
      setTimeout(() => setStep(2), 600)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to create account')
      setStep(0)
    } finally {
      setIsCreating(false)
    }
  }

  const handleRefreshToken = async () => {
    if (!account) return
    const token = await refreshTelegramToken(account.api_key)
    if (token) {
      const updated = { ...account, telegram_token: token }
      setAccount(updated)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }
  }

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY)
    setAccount(null)
    setBalance(null)
    setPrice(null)
    setStrategies([])
    setTelegramLinked(false)
    setDetailsOpen(false)
    setStep(0)
  }

  return (
    <main className="min-h-screen bg-white font-[family-name:var(--font-inter)]" style={{ letterSpacing: '-0.1px' }}>
      <AuricWordmark />
      {step < 2 && <StepDots current={step} />}

      <div className="max-w-[400px] mx-auto px-5 py-8">

        {/* ─── Step 0: Welcome ───────────────────────────────── */}
        {step === 0 && (
          <div>
            <h1 className="text-[28px] font-medium text-[#201F1D] mb-2">
              Gold savings on autopilot.
            </h1>
            <p className="text-[15px] text-[#96938E] leading-relaxed mb-8">
              Set your accumulation rules once. Auric monitors XAU₮ markets,
              evaluates your conditions, and executes on-chain — while you sleep.
            </p>

            <div className="bg-[#F5F4F2] rounded-xl p-5 mb-4">
              <div className="flex gap-3.5">
                <div className="shrink-0 w-9 h-9 bg-[rgba(0,185,125,0.1)] rounded-lg flex items-center justify-center">
                  <LockIcon />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#201F1D] mb-1.5">
                    Non-custodial smart wallet
                  </p>
                  <p className="text-[13px] text-[#6B6A66] leading-relaxed">
                    Powered by Tether&apos;s WDK. Only you hold the keys.
                    Gas is sponsored — you only need USDT.
                  </p>
                </div>
              </div>
            </div>

            {error && <p className="text-xs text-red-600 mb-3">{error}</p>}

            <button
              onClick={handleCreate}
              disabled={isCreating}
              className="w-full py-3.5 bg-[#00B97D] hover:bg-[#00a66f] text-white text-[15px] font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Create your wallet
            </button>
          </div>
        )}

        {/* ─── Step 1: Creating → Wallet Ready ───────────────── */}
        {step === 1 && !account && (
          <div className="text-center pt-16">
            <Spinner className="mb-4" />
            <h2 className="text-xl font-medium text-[#201F1D] mb-2">Creating your wallet</h2>
            <p className="text-[15px] text-[#96938E]">Setting up your smart account on Ethereum...</p>
          </div>
        )}

        {step === 1 && account && (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(0,185,125,0.1)] mb-4">
                <CheckIcon />
              </div>
              <h2 className="text-xl font-medium text-[#201F1D] mb-1">Your wallet is ready</h2>
              <p className="text-[15px] text-[#96938E]">Send USDT to your wallet to start accumulating gold.</p>
            </div>

            {/* Wallet address prominent */}
            <div className="bg-[#F5F4F2] rounded-xl p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-medium text-[#96938E] uppercase tracking-wide">
                  <WalletIcon />
                  Your Wallet Address
                </div>
                <CopyButton value={account.wallet_address} />
              </div>
              <div className="text-sm font-medium font-mono text-[#201F1D] bg-white rounded-lg px-3.5 py-2.5 break-all leading-relaxed">
                {account.wallet_address}
              </div>
              <p className="text-xs text-[#6B6A66] mt-2">Gas is sponsored. You only need USDT.</p>
            </div>

            {/* API Key */}
            <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-4">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2 text-xs font-medium text-[#96938E] uppercase tracking-wide">
                  <KeyIcon />
                  API Key
                </div>
                <CopyButton value={account.api_key} />
              </div>
              <div className="text-sm font-medium font-mono text-[#201F1D] bg-[#F5F4F2] rounded-lg px-3.5 py-2.5 break-all leading-relaxed">
                {account.api_key}
              </div>
              <div className="flex items-start gap-2.5 bg-[#F5F4F2] rounded-lg p-3 mt-3">
                <div className="shrink-0 mt-px"><InfoIcon /></div>
                <p className="text-[13px] text-[#6B6A66] leading-relaxed">
                  Use this key to authenticate API requests and manage your strategies.
                </p>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-[#00B97D] hover:bg-[#00a66f] text-white text-[15px] font-medium rounded-lg transition-colors cursor-pointer"
            >
              Continue to dashboard
            </button>
          </div>
        )}

        {/* ─── Step 2: Dashboard ─────────────────────────────── */}
        {step === 2 && account && (
          <div>
            {/* Fund wallet hero (zero balance) */}
            {isZeroBalance && (
              <div className="bg-[#F5F4F2] rounded-xl p-5 mb-3">
                <div className="flex gap-3.5 mb-4">
                  <div className="shrink-0 w-9 h-9 bg-[rgba(0,185,125,0.1)] rounded-lg flex items-center justify-center">
                    <WalletIcon stroke="#00B97D" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#201F1D] mb-1">
                      Deposit USDT to start accumulating gold.
                    </p>
                    <p className="text-[13px] text-[#6B6A66] leading-relaxed">
                      Send USDT to your smart wallet. Gas is sponsored — you only need USDT.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg px-3.5 py-2.5">
                  <span className="text-[13px] font-medium font-mono text-[#201F1D]">
                    {account.wallet_address.slice(0, 10)}...{account.wallet_address.slice(-8)}
                  </span>
                  <CopyButton value={account.wallet_address} />
                </div>
              </div>
            )}

            {/* Balances */}
            <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-3">
              <div className="text-xs font-medium text-[#96938E] uppercase tracking-wide mb-2">
                Balances
              </div>
              {balance ? (
                <div>
                  <div className="flex justify-between items-baseline py-2">
                    <span className="text-sm text-[#96938E]">XAU₮</span>
                    <span className={`text-base font-medium font-mono ${balance.xaut > 0 ? 'text-[#DCCFBA]' : 'text-[#96938E]'}`}>
                      {balance.xaut}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline py-2 border-t border-[rgba(0,0,0,0.06)]">
                    <span className="text-sm text-[#96938E]">USDT</span>
                    <span className={`text-base font-medium font-mono ${balance.usdt > 0 ? 'text-[#201F1D]' : 'text-[#96938E]'}`}>
                      ${balance.usdt}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#96938E]">Loading...</p>
              )}
            </div>

            {/* Gold price (separate) */}
            {price != null && (
              <div className="flex items-baseline justify-between px-1 mb-3">
                <span className="text-[13px] text-[#96938E]">Gold price</span>
                <span className="text-[15px] font-medium font-mono text-[#DCCFBA]">
                  ${price.toLocaleString()} <span className="text-[11px] font-normal text-[#96938E]">/ oz</span>
                </span>
              </div>
            )}

            {/* Rules */}
            <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-3">
              <div className="text-xs font-medium text-[#96938E] uppercase tracking-wide mb-2">
                {visibleStrategies.length > 0 ? 'Rules' : 'Active Rules'}
              </div>
              {visibleStrategies.length === 0 ? (
                <p className="text-sm text-[#96938E] leading-relaxed">
                  No rules yet. Connect Telegram to set your first strategy.
                </p>
              ) : (
                <div>
                  {visibleStrategies.map((s, i) => (
                    <div
                      key={s._id}
                      className={`flex items-center justify-between py-2.5 ${i > 0 ? 'border-t border-[rgba(0,0,0,0.06)]' : ''}`}
                    >
                      <div>
                        <div className={`text-sm font-medium ${s.status === 'active' ? 'text-[#201F1D]' : 'text-[#96938E]'}`}>
                          {formatRuleSummary(s)}
                        </div>
                        <div className="text-xs text-[#96938E] mt-0.5">{formatRuleDetail(s)}</div>
                      </div>
                      <StatusBadge status={s.status} />
                    </div>
                  ))}
                  {/* Warning: rules + zero balance */}
                  {isZeroBalance && hasActiveRules && (
                    <div className="flex items-start gap-2 bg-[#FFF8F0] rounded-lg p-2.5 mt-2">
                      <WarningIcon />
                      <p className="text-[13px] text-[#8B6914] leading-snug">
                        Your rules won&apos;t execute until you deposit USDT. Fund your wallet above to activate them.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Telegram */}
            {!telegramLinked ? (
              <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-3">
                <div className="text-xs font-medium text-[#96938E] uppercase tracking-wide mb-2">
                  Telegram
                </div>
                <p className="text-sm text-[#6B6A66] mb-3">
                  Manage your rules and receive execution confirmations.
                </p>
                {account.telegram_token ? (
                  <div>
                    <a
                      href={`https://t.me/${TELEGRAM_BOT}?start=${account.telegram_token}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#229ED9] hover:bg-[#1a8fc4] text-white text-[15px] font-medium rounded-lg transition-colors"
                    >
                      <TelegramIcon />
                      Connect Telegram
                    </a>
                    <button
                      onClick={handleRefreshToken}
                      className="block text-xs text-[#96938E] hover:text-[#6B6A66] mt-2 cursor-pointer"
                    >
                      Generate a new token
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleRefreshToken}
                    className="w-full py-3 bg-[#F5F4F2] hover:bg-[#EDEBE9] text-[#201F1D] text-sm font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Generate Link Token
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-[#F5F4F2] rounded-xl px-4 py-3 mb-3 border-l-[3px] border-[#00B97D]">
                <p className="text-sm font-medium text-[#201F1D] mb-0.5">Telegram linked</p>
                <p className="text-[13px] text-[#6B6A66]">You&apos;ll receive confirmations after each execution.</p>
              </div>
            )}

            {/* Account Details (collapsible) */}
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="flex items-center justify-center gap-1.5 w-full py-2.5 mt-4 border-t border-[rgba(0,0,0,0.06)] text-[13px] font-medium text-[#96938E] hover:text-[#201F1D] transition-colors cursor-pointer"
            >
              Account Details
              <span className={`transition-transform ${detailsOpen ? 'rotate-180' : ''}`}>
                <ChevronIcon />
              </span>
            </button>

            {detailsOpen && (
              <div className="pt-3">
                {/* Smart Wallet */}
                <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-3">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#96938E] uppercase tracking-wide">
                      <WalletIcon />
                      Smart Wallet
                    </div>
                    <CopyButton value={account.wallet_address} />
                  </div>
                  <div className="text-sm font-medium font-mono text-[#201F1D] bg-[#F5F4F2] rounded-lg px-3.5 py-2.5 break-all leading-relaxed">
                    {account.wallet_address}
                  </div>
                </div>

                {/* API Key */}
                <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-3">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#96938E] uppercase tracking-wide">
                      <KeyIcon />
                      API Key
                    </div>
                    <CopyButton value={account.api_key} />
                  </div>
                  <div className="text-sm font-medium font-mono text-[#201F1D] bg-[#F5F4F2] rounded-lg px-3.5 py-2.5 break-all leading-relaxed">
                    {account.api_key}
                  </div>
                  <div className="flex items-start gap-2.5 bg-[#F5F4F2] rounded-lg p-3 mt-3">
                    <div className="shrink-0 mt-px"><InfoIcon /></div>
                    <p className="text-[13px] text-[#6B6A66] leading-relaxed">
                      Use this key to authenticate API requests and manage your strategies.
                    </p>
                  </div>
                </div>

                {/* Reset */}
                <button
                  onClick={reset}
                  className="w-full py-2.5 text-sm text-[#96938E] hover:text-[#201F1D] transition-colors cursor-pointer"
                >
                  Reset account
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
