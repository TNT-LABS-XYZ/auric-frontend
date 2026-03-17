'use client'

import { useState, useEffect } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

async function createUser(masterKey: string): Promise<{ user_id: string; api_key: string; wallet_address: string }> {
  const res = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'x-api-key': masterKey },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.message ?? `HTTP ${res.status}`)
  return data
}

async function fetchBalances(userApiKey: string) {
  const h = { 'x-api-key': userApiKey }
  const [balRes, priceRes] = await Promise.allSettled([
    fetch(`${API_BASE}/wallet/balance`, { headers: h }).then(r => r.json()),
    fetch(`${API_BASE}/wallet/price`, { headers: h }).then(r => r.json()),
  ])
  return {
    balance: balRes.status === 'fulfilled' ? balRes.value : null,
    price: priceRes.status === 'fulfilled' ? priceRes.value.xaut_usd : null,
  }
}

// ─── UI primitives ────────────────────────────────────────────────────────────

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-5 ${className}`}>
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
      {children}
    </h2>
  )
}

function Btn({
  onClick,
  children,
  variant = 'primary',
  disabled = false,
  className = '',
}: {
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
  className?: string
}) {
  const base =
    'inline-flex items-center justify-center rounded-lg font-medium text-sm px-3 py-1.5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-amber-500 text-white hover:bg-amber-600',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    ghost: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
  }
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

function CopyBtn({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="ml-1.5 text-xs text-gray-400 hover:text-amber-600 transition-colors cursor-pointer"
    >
      {copied ? '✓ copied' : 'copy'}
    </button>
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Account {
  user_id: string
  api_key: string
  address: string
}

const STORAGE_KEY = 'auric_account'

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AccountPage() {
  const [inputKey, setInputKey] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [createError, setCreateError] = useState('')

  const [account, setAccount] = useState<Account | null>(null)
  const [balance, setBalance] = useState<{ xaut: number; usdt: number } | null>(null)
  const [price, setPrice] = useState<number | null>(null)

  const [telegramToken, setTelegramToken] = useState<string | null>(null)
  const [telegramError, setTelegramError] = useState('')

  const loadBalances = async (apiKey: string) => {
    const { balance: b, price: p } = await fetchBalances(apiKey)
    if (b) setBalance(b)
    if (p != null) setPrice(p)
  }

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    try {
      const saved = JSON.parse(raw) as Account
      setAccount(saved)
      void loadBalances(saved.api_key)
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCreate = async (key: string) => {
    setCreateError('')
    setIsCreating(true)
    try {
      const res = await createUser(key)
      const acc: Account = { user_id: res.user_id, api_key: res.api_key, address: res.wallet_address }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(acc))
      setAccount(acc)
      void loadBalances(acc.api_key)
    } catch (e: unknown) {
      setCreateError(e instanceof Error ? e.message : 'Failed to create account')
    } finally {
      setIsCreating(false)
    }
  }

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY)
    setAccount(null)
    setBalance(null)
    setPrice(null)
    setTelegramToken(null)
    setInputKey('')
  }

  const genTelegramToken = async () => {
    if (!account) return
    setTelegramError('')
    try {
      const res = await fetch(`${API_BASE}/telegram/link`, {
        method: 'POST',
        headers: { 'x-api-key': account.api_key },
      })
      const data = await res.json()
      setTelegramToken(data.token)
    } catch {
      setTelegramError('Failed to generate token')
    }
  }

  const inp =
    'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-amber-400'

  // ─── Create screen ──────────────────────────────────────────────────────────
  if (!account) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-[family-name:var(--font-geist-sans)]">
        <div className="w-full max-w-sm space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Auric</h1>
            <p className="text-sm text-gray-500 mt-0.5">Enter your operator key to create a new account.</p>
          </div>
          <Card>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Operator API Key</label>
            <input
              type="password"
              className={`${inp} mb-3`}
              placeholder="xxxxxxxx-xxxx-…"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate(inputKey)}
              autoFocus
            />
            {createError && <p className="text-xs text-red-600 mb-3">{createError}</p>}
            <Btn onClick={() => handleCreate(inputKey)} disabled={!inputKey || isCreating} className="w-full">
              {isCreating ? 'Creating…' : 'Create Account'}
            </Btn>
          </Card>
          <p className="text-xs text-gray-400 text-center">
            A new wallet and API key will be generated for you.
          </p>
        </div>
      </main>
    )
  }

  // ─── Dashboard ─────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-gray-50 font-[family-name:var(--font-geist-sans)]">
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-bold text-gray-900">Auric</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-500">Account</span>
          <span className="text-gray-300">/</span>
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono text-xs">
            {account.user_id.slice(0, 8)}…{account.user_id.slice(-4)}
          </span>
        </div>
        <Btn variant="ghost" onClick={reset}>Reset</Btn>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {/* API Key */}
        <Card>
          <SectionTitle>Your API Key</SectionTitle>
          <p className="text-xs font-mono text-gray-700 break-all">{account.api_key}</p>
          <CopyBtn value={account.api_key} />
          <p className="text-xs text-gray-400 mt-2">Use this key to authenticate API requests.</p>
        </Card>

        {/* Wallet + Balance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <SectionTitle>Smart Wallet</SectionTitle>
            <p className="text-xs font-mono text-gray-700 break-all leading-relaxed">
              {account.address}
            </p>
            <CopyBtn value={account.address} />
            <p className="text-xs text-gray-400 mt-2">Deposit USDT here. Gas is sponsored.</p>
          </Card>

          <Card>
            <SectionTitle>
              Balances
              {price != null && (
                <span className="text-xs text-gray-400 font-normal ml-2">
                  1 XAU₮ = ${price.toLocaleString()}
                </span>
              )}
            </SectionTitle>
            {balance ? (
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-500">XAU₮</span>
                  <span className="font-mono font-semibold text-gray-900">{balance.xaut}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-500">USDT</span>
                  <span className="font-mono font-semibold text-gray-900">${balance.usdt}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-400">Loading…</p>
            )}
          </Card>
        </div>

        {/* Telegram */}
        <Card>
          <SectionTitle>Telegram</SectionTitle>
          <p className="text-sm text-gray-600 mb-3">
            Link your Telegram account to receive buy notifications and manage strategies from the bot.
          </p>
          {telegramToken ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-2">Expires in 15 min, single-use:</p>
              <a
                href={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT}?start=${telegramToken}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#229ED9] hover:bg-[#1a8fc4] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.04 9.613c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 14.803l-2.95-.924c-.642-.2-.654-.642.136-.953l11.514-4.44c.537-.194 1.006.131.382.762z"/>
                </svg>
                Open in Telegram
              </a>
              <button
                onClick={() => setTelegramToken(null)}
                className="block text-xs text-gray-400 hover:text-gray-600 mt-2 cursor-pointer"
              >
                Generate a new token
              </button>
            </div>
          ) : (
            <div>
              <Btn variant="secondary" onClick={genTelegramToken}>
                Generate Link Token
              </Btn>
              {telegramError && <p className="text-xs text-red-600 mt-2">{telegramError}</p>}
            </div>
          )}
        </Card>
      </div>
    </main>
  )
}
