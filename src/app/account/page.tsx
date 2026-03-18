'use client'

import { useState, useEffect } from 'react'
import { formatUnits } from 'viem'
import { QRCodeSVG } from 'qrcode.react'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3002'
const TELEGRAM_BOT = process.env.NEXT_PUBLIC_TELEGRAM_BOT ?? ''
const STORAGE_KEY = 'auric_account'
const ETHERSCAN_BASE = 'https://etherscan.io/address/'

interface Account {
  user_id: string
  api_key: string
  smart_account_address: string
  telegram_token: string | null
}

interface UserProfile {
  smart_account_address: string
  created_at: string
  telegram: { chat_id: number; username: string; linked_at: string } | null
}

interface Strategy {
  _id: string
  type: 'dca' | 'price_trigger' | 'goal'
  status: 'active' | 'paused' | 'completed' | 'cancelled'
  amount?: string
  frequency?: string
  day_of_week?: number
  buy_below?: string
  target?: string
  accumulated?: string
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
    smart_account_address: data.smart_account_address,
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

async function fetchUserProfile(apiKey: string): Promise<UserProfile | null> {
  const res = await fetch(`${API_URL}/users/me`, {
    headers: { 'x-api-key': apiKey },
  })
  if (!res.ok) return null
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
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function WalletIcon({ stroke = '#96938E' }: { stroke?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  )
}

function KeyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" /><path d="m21 2-9.6 9.6" /><circle cx="7.5" cy="15.5" r="5.5" />
    </svg>
  )
}

function CopyIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}

function QRIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="3" height="3" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4880D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-px">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
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
  return <div className={`inline-block w-8 h-8 border-[3px] border-[#EDEBE9] border-t-[#00B97D] rounded-full animate-spin ${className}`} />
}

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-[#F5F4F2] rounded-md animate-pulse ${className}`} />
}

function BalancesSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-3">
      <Skeleton className="h-3 w-16 mb-4" />
      <div className="flex justify-between items-center py-2"><Skeleton className="h-3.5 w-10" /><Skeleton className="h-4 w-20" /></div>
      <div className="flex justify-between items-center py-2 border-t border-[rgba(0,0,0,0.06)]"><Skeleton className="h-3.5 w-10" /><Skeleton className="h-4 w-16" /></div>
    </div>
  )
}

function RulesSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-3">
      <Skeleton className="h-3 w-20 mb-4" /><Skeleton className="h-3.5 w-48" />
    </div>
  )
}

function PriceSkeleton() {
  return (
    <div className="flex items-baseline justify-between px-1 mb-3 pb-3 border-b border-dashed border-[rgba(0,0,0,0.06)]">
      <Skeleton className="h-3 w-20" /><Skeleton className="h-4 w-24" />
    </div>
  )
}

// ─── Shared components ────────────────────────────────────────────────────────

function CopyButton({ value, size = 'default' }: { value: string; size?: 'default' | 'small' }) {
  const [copied, setCopied] = useState(false)
  const cls = size === 'small' ? 'text-[12px] px-2.5 py-1' : 'text-[13px] px-3 py-1.5'
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      className={`inline-flex items-center gap-1.5 font-medium text-[#96938E] bg-[#F5F4F2] rounded-[6px] hover:bg-[#EDEBE9] hover:text-[#201F1D] transition-colors cursor-pointer ${cls}`}
    >
      <CopyIcon />{copied ? 'Copied' : 'Copy'}
    </button>
  )
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#96938E] hover:text-[#201F1D] transition-colors">
      {children}<ExternalIcon />
    </a>
  )
}

function StepDots({ current }: { current: number }) {
  return (
    <div className="flex gap-2 justify-center py-2">
      {[0, 1].map((i) => (
        <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-[#00B97D]' : i < current ? 'bg-[#00B97D] opacity-40' : 'bg-[#EDEBE9]'}`} />
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: Strategy['status'] }) {
  const styles = { active: 'text-[#00B97D] bg-[rgba(0,185,125,0.1)]', paused: 'text-[#C4880D] bg-[#FFF8F0]', completed: 'text-[#201F1D] bg-[#F5F4F2]', cancelled: 'text-[#96938E] bg-[#F5F4F2]' }
  const labels = { active: 'Active', paused: 'Paused', completed: 'Completed', cancelled: 'Cancelled' }
  return <span className={`text-[11px] font-medium px-2 py-0.5 rounded-[6px] ${styles[status]}`}>{labels[status]}</span>
}

function WalletCard({ address, showDeposit }: { address: string; showDeposit: boolean }) {
  const [showQR, setShowQR] = useState(false)
  return (
    <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-3">
      {showDeposit && (
        <div className="flex gap-3.5 pb-3.5 mb-3.5 border-b border-[rgba(0,0,0,0.06)]">
          <div className="shrink-0 w-9 h-9 bg-[rgba(0,185,125,0.1)] rounded-lg flex items-center justify-center"><WalletIcon stroke="#00B97D" /></div>
          <div>
            <p className="text-sm font-medium text-[#201F1D] mb-1">Start accumulating XAU₮</p>
            <p className="text-[13px] text-[#6B6A66] leading-relaxed">Deposit USD₮ to your wallet. Gas is sponsored.</p>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-[#96938E] uppercase tracking-wide"><WalletIcon />Wallet</div>
        <div className="flex gap-1.5">
          <button onClick={() => setShowQR(!showQR)} className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#96938E] bg-[#F5F4F2] rounded-[6px] px-2.5 py-1 hover:bg-[#EDEBE9] hover:text-[#201F1D] transition-colors cursor-pointer">
            <QRIcon />{showQR ? 'Address' : 'QR'}
          </button>
          <CopyButton value={address} size="small" />
        </div>
      </div>
      {showQR ? (
        <div className="flex justify-center py-3"><div className="bg-[#F5F4F2] rounded-lg p-3"><QRCodeSVG value={address} size={120} /></div></div>
      ) : (
        <div className="text-[13px] font-medium font-mono text-[#201F1D] bg-[#F5F4F2] rounded-lg px-3.5 py-2.5 break-all leading-relaxed">{address}</div>
      )}
      <div className="mt-1.5"><ExtLink href={`${ETHERSCAN_BASE}${address}`}>View on Etherscan</ExtLink></div>
    </div>
  )
}

function fmt6(raw?: string): string {
  if (!raw) return '0'
  return formatUnits(BigInt(raw), 6)
}

function formatRuleSummary(s: Strategy): string {
  if (s.type === 'dca') return `DCA — $${fmt6(s.amount)} ${s.frequency}`
  if (s.type === 'price_trigger') return `Price trigger — below $${Number(s.buy_below).toLocaleString()}`
  if (s.type === 'goal') return `Goal — ${Number(fmt6(s.accumulated)).toFixed(3)} / ${fmt6(s.target)} XAU₮`
  return s.label ?? s.type
}

function formatRuleDetail(s: Strategy): string {
  if (s.type === 'dca') return s.label ?? `$${fmt6(s.amount)} ${s.frequency}`
  if (s.type === 'price_trigger') return `Buy $${fmt6(s.amount)} when triggered`
  if (s.type === 'goal') return `$${fmt6(s.amount)} ${s.frequency}`
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
  const [walletReady, setWalletReady] = useState(false)
  const [error, setError] = useState('')
  const [balance, setBalance] = useState<{ xaut: number; usdt: number } | null>(null)
  const [price, setPrice] = useState<number | null>(null)
  const [strategies, setStrategies] = useState<Strategy[]>([])
  const [apiKeyOpen, setApiKeyOpen] = useState(false)
  const [telegramLinked, setTelegramLinked] = useState(false)
  const [telegramUsername, setTelegramUsername] = useState<string | null>(null)
  const [dashboardLoading, setDashboardLoading] = useState(false)

  const isZeroBalance = balance != null && balance.xaut === 0 && balance.usdt === 0
  const visibleStrategies = strategies.filter((s) => s.status !== 'cancelled')
  const hasRules = visibleStrategies.length > 0
  const hasActiveRules = visibleStrategies.some((s) => s.status === 'active')
  const xautUsdValue = balance && price ? (balance.xaut * price) : null

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    try {
      const saved = JSON.parse(raw) as Account
      setAccount(saved)
      setStep(2)
      setDashboardLoading(true)
      loadDashboard(saved.api_key).finally(() => setDashboardLoading(false))
    } catch { localStorage.removeItem(STORAGE_KEY) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadDashboard = async (apiKey: string) => {
    const [{ balance: b, price: p }, strats, profile] = await Promise.all([
      fetchBalances(apiKey),
      fetchStrategies(apiKey),
      fetchUserProfile(apiKey),
    ])
    if (b) setBalance(b)
    if (p != null) setPrice(p)
    setStrategies(strats)
    if (profile) {
      if (profile.smart_account_address) {
        setAccount((prev) => prev ? { ...prev, smart_account_address: profile.smart_account_address } : prev)
      }
      if (profile.telegram) {
        setTelegramLinked(true)
        setTelegramUsername(profile.telegram.username)
      }
    }
  }

  const handleCreate = async () => {
    setError('')
    setIsCreating(true)
    setStep(1)
    try {
      const acc = await createAccount()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(acc))
      setAccount(acc)
      setBalance({ xaut: 0, usdt: 0 })
      void loadDashboard(acc.api_key)
      setTimeout(() => setWalletReady(true), 800)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to create account')
      setStep(0)
    } finally { setIsCreating(false) }
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
    setTelegramUsername(null)
    setApiKeyOpen(false)
    setStep(0)
  }

  return (
    <main className="min-h-screen bg-white font-[family-name:var(--font-inter)]" style={{ letterSpacing: '-0.1px' }}>
      <AuricWordmark />
      {step < 2 && <StepDots current={step} />}

      <div className="max-w-[400px] mx-auto px-5 py-8">

        {/* ─── Step 0: Welcome ─────────────────────────────────── */}
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
            <button onClick={handleCreate} disabled={isCreating} className="w-full py-3.5 bg-[#00B97D] hover:bg-[#00a66f] text-white text-[15px] font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
              Create your wallet
            </button>
          </div>
        )}

        {/* ─── Step 1: Creating → Wallet Ready ─────────────────── */}
        {step === 1 && !walletReady && (
          <div className="text-center pt-16 animate-in">
            <Spinner className="mb-4" />
            <h2 className="text-xl font-medium text-[#201F1D] mb-2">Creating your wallet</h2>
            <p className="text-[15px] text-[#96938E]">Setting up your smart account on Ethereum...</p>
          </div>
        )}

        {step === 1 && walletReady && account && (
          <div className="animate-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(0,185,125,0.1)] mb-4"><CheckIcon /></div>
              <h2 className="text-xl font-medium text-[#201F1D] mb-1">Your wallet is ready</h2>
              <p className="text-[15px] text-[#96938E]">Deposit USD₮ to start accumulating XAU₮.</p>
            </div>
            <WalletCard address={account.smart_account_address} showDeposit={false} />
            <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-4">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2 text-xs font-medium text-[#96938E] uppercase tracking-wide"><KeyIcon />API Key</div>
                <CopyButton value={account.api_key} size="small" />
              </div>
              <div className="text-sm font-medium font-mono text-[#201F1D] bg-[#F5F4F2] rounded-lg px-3.5 py-2.5 break-all leading-relaxed">{account.api_key}</div>
              <p className="text-xs text-[#6B6A66] mt-2">Use this key to authenticate API requests.</p>
            </div>
            <button onClick={() => setStep(2)} className="w-full py-3.5 bg-transparent border border-[rgba(0,0,0,0.06)] hover:bg-[#F5F4F2] text-[#96938E] hover:text-[#201F1D] text-[15px] font-medium rounded-lg transition-colors cursor-pointer">
              Continue to dashboard
            </button>
          </div>
        )}

        {/* ─── Step 2: Dashboard ────────────────────────────────── */}
        {step === 2 && account && (
          <div>
            {/* Skeleton state for returning users */}
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
            {/* Rules at top when they exist */}
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

            {/* Wallet card (always visible) */}
            <WalletCard address={account.smart_account_address} showDeposit={isZeroBalance && !hasRules} />

            {/* Balances */}
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

            {/* XAU₮ price */}
            {price != null && (
              <a href="https://www.coingecko.com/en/coins/tether-gold" target="_blank" rel="noopener noreferrer" className="flex items-baseline justify-between px-1 mb-3 pb-3 border-b border-dashed border-[rgba(0,0,0,0.06)] hover:opacity-80 transition-opacity">
                <span className="text-[13px] text-[#96938E]">XAU₮ price<ExternalIcon /></span>
                <span className="text-[15px] font-medium font-mono text-[#DCCFBA]">${price.toLocaleString()} <span className="text-[11px] font-normal text-[#96938E]">/ oz</span></span>
              </a>
            )}

            {/* Empty rules */}
            {!hasRules && (
              <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-3">
                <div className="text-xs font-medium text-[#96938E] uppercase tracking-wide mb-2">Active Rules</div>
                <p className="text-sm text-[#96938E] leading-relaxed">No rules yet. Connect Telegram to set your first strategy.</p>
              </div>
            )}

            {/* Telegram */}
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
                      <button onClick={() => void loadDashboard(account.api_key)} className="text-xs text-[#96938E] hover:text-[#201F1D] transition-colors cursor-pointer">I&apos;ve connected — refresh</button>
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
                <p className="text-[13px] text-[#6B6A66]">{telegramUsername ? `@${telegramUsername}` : 'You\'ll receive confirmations after each execution.'}</p>
              </div>
            )}

            {/* API Key (expandable) */}
            <button onClick={() => setApiKeyOpen(!apiKeyOpen)} className="flex items-center justify-center gap-1.5 w-full py-2.5 mt-4 border-t border-[rgba(0,0,0,0.06)] text-[13px] font-medium text-[#96938E] hover:text-[#201F1D] transition-colors cursor-pointer">
              <span className="inline-flex items-center gap-1.5"><KeyIcon size={14} />API Key</span>
              <span className={`transition-transform ${apiKeyOpen ? 'rotate-180' : ''}`}><ChevronIcon /></span>
            </button>
            {apiKeyOpen && (
              <div className="pt-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-[#6B6A66]">Use this key to authenticate API requests.</p>
                  <CopyButton value={account.api_key} size="small" />
                </div>
                <div className="text-[13px] font-medium font-mono text-[#201F1D] bg-[#F5F4F2] rounded-lg px-3.5 py-2.5 break-all leading-relaxed">{account.api_key}</div>
                <button onClick={reset} className="w-full py-2.5 mt-4 text-sm text-[#96938E] hover:text-[#201F1D] transition-colors cursor-pointer">Reset account</button>
              </div>
            )}
            </>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
