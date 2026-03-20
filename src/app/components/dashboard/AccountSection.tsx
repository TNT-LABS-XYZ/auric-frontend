'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Eye, EyeSlash, TelegramLogo, ArrowUpRight } from '@phosphor-icons/react'
import { QRCodeSVG } from 'qrcode.react'
import { fadeUp, CopyBtn } from './shared'

const TELEGRAM_BOT = process.env.NEXT_PUBLIC_TELEGRAM_BOT ?? ''
const ETHERSCAN_BASE = 'https://etherscan.io/address/'

const tinyBtn: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 4,
  background: 'none', border: 'none', cursor: 'pointer',
  padding: 0, fontFamily: 'inherit',
  fontSize: 'var(--text-label)', fontWeight: 'var(--weight-ui)',
  letterSpacing: '-0.006em', transition: 'color 0.12s ease',
}

function WalletRow({ address }: { address: string }) {
  const [showQR, setShowQR] = useState(false)
  const display = address.length > 26 ? address.slice(0, 12) + '\u2026' + address.slice(-8) : address

  return (
    <div style={{ background: 'var(--bg-subtle)', borderRadius: 8, padding: '10px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--weight-ui)', color: 'var(--text-muted)', letterSpacing: '-0.003em' }}>
          Wallet address
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => setShowQR((v) => !v)}
            style={{ ...tinyBtn, color: showQR ? 'var(--accent)' : 'var(--text-muted)' }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/></svg>
            {showQR ? 'Address' : 'QR'}
          </button>
          <CopyBtn text={address} />
        </div>
      </div>
      {showQR ? (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px 0 8px' }}>
            <div style={{ position: 'relative', background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 0 0 1px rgba(0,0,0,.06), 0 2px 8px rgba(0,0,0,.04)' }}>
              <QRCodeSVG value={address} size={140} level="M" />
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-mid)', letterSpacing: '-0.003em', marginTop: 10, textAlign: 'center', lineHeight: 1.4 }}>
              Only send USDT
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              marginTop: 4, padding: '4px 10px',
              background: 'var(--bg-secondary)', borderRadius: 99,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#627EEA"/><path d="M12 3v7.5l6 3L12 3z" fill="#fff" fillOpacity=".6"/><path d="M12 3l-6 10.5 6-3V3z" fill="#fff"/><path d="M12 16.5v4.5l6-8.5-6 4z" fill="#fff" fillOpacity=".6"/><path d="M12 21v-4.5L6 12.5 12 21z" fill="#fff"/></svg>
              <span style={{ fontSize: 11, fontWeight: 'var(--weight-ui)', color: 'var(--text-mid)', letterSpacing: '-0.003em' }}>
                Ethereum
              </span>
            </div>
          </div>
        </>
      ) : (
        <p style={{
          fontFamily: '"SF Mono", Consolas, Menlo, monospace',
          fontSize: 11, color: 'var(--text-mid)',
          letterSpacing: '0.02em', margin: 0,
          userSelect: 'all', wordBreak: 'break-all',
        }}>
          {display}
        </p>
      )}
      <div style={{ marginTop: 6 }}>
        <a
          href={`${ETHERSCAN_BASE}${address}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 11, fontWeight: 'var(--weight-ui)', color: 'var(--text-muted)',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 3,
            letterSpacing: '-0.003em', transition: 'color 0.12s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-mid)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
        >
          View on Etherscan
          <ArrowUpRight size={9} weight="fill" />
        </a>
      </div>
    </div>
  )
}

function KeyRow({ label, value, secret = false }: { label: string; value: string; secret?: boolean }) {
  const [visible, setVisible] = useState(!secret)
  const [eyeHov, setEyeHov] = useState(false)
  const display = value.length > 26 ? value.slice(0, 12) + '\u2026' + value.slice(-8) : value

  return (
    <div style={{ background: 'var(--bg-subtle)', borderRadius: 8, padding: '10px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--weight-ui)', color: 'var(--text-muted)', letterSpacing: '-0.003em' }}>
          {label}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {secret && (
            <button
              onClick={() => setVisible((v) => !v)}
              onMouseEnter={() => setEyeHov(true)}
              onMouseLeave={() => setEyeHov(false)}
              aria-label={visible ? `Hide ${label}` : `Show ${label}`}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 0, display: 'flex', alignItems: 'center',
                color: eyeHov ? 'var(--text-mid)' : 'var(--text-muted)',
                transition: 'color 0.12s ease',
              }}
            >
              {visible ? <EyeSlash size={12} weight="fill" /> : <Eye size={12} weight="fill" />}
            </button>
          )}
          <CopyBtn text={value} />
        </div>
      </div>
      <p style={{
        fontFamily: '"SF Mono", Consolas, Menlo, monospace',
        fontSize: 11, color: 'var(--text-mid)',
        letterSpacing: '0.02em', margin: 0,
        userSelect: 'all', wordBreak: 'break-all',
      }}>
        {secret && !visible ? '\u2022'.repeat(28) : display}
      </p>
    </div>
  )
}

function McpRow({ token }: { token: string }) {
  const [visible, setVisible] = useState(false)
  const [eyeHov, setEyeHov] = useState(false)
  const [tooltipVisible, setTooltipVisible] = useState(false)

  const snippet = JSON.stringify(
    {
      mcpServers: {
        auric: {
          command: 'npx',
          args: ['-y', 'mcp-remote', 'https://auric-backend-production.up.railway.app/mcp', '--header', `Authorization: Bearer ${token}`],
        },
      },
    },
    null, 2,
  )

  return (
    <div style={{ background: 'var(--bg-subtle)', borderRadius: 8, padding: '10px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--weight-ui)', color: 'var(--text-muted)', letterSpacing: '-0.003em' }}>
          MCP Server
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {visible && <CopyBtn text={snippet} />}
          <span style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <button
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
              onFocus={() => setTooltipVisible(true)}
              onBlur={() => setTooltipVisible(false)}
              aria-label="Token info"
              style={{ background: 'none', border: 'none', cursor: 'default', padding: 0, display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </button>
            {tooltipVisible && (
              <span style={{
                position: 'absolute', bottom: '100%', right: 0, marginBottom: 8, width: 220,
                background: 'var(--ink)', color: '#fff', fontSize: 11, lineHeight: 1.4,
                borderRadius: 8, padding: '8px 10px', zIndex: 10,
                boxShadow: 'var(--shadow-elevated)', pointerEvents: 'none',
              }}>
                This token expires after 30 days and rotates when you log out and back in. If your MCP connection stops working, re-copy this config with your new token.
              </span>
            )}
          </span>
          <button
            onClick={() => setVisible((v) => !v)}
            onMouseEnter={() => setEyeHov(true)}
            onMouseLeave={() => setEyeHov(false)}
            aria-label={visible ? 'Hide config' : 'Reveal config'}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 0, display: 'flex', alignItems: 'center',
              color: eyeHov ? 'var(--text-mid)' : 'var(--text-muted)',
              transition: 'color 0.12s ease',
            }}
          >
            {visible ? <EyeSlash size={12} weight="fill" /> : <Eye size={12} weight="fill" />}
          </button>
        </div>
      </div>

      {!visible ? (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7, background: 'rgba(201,148,42,.08)', borderRadius: 6, padding: '7px 9px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c9942a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <p style={{ fontSize: 11, color: '#a37420', lineHeight: 1.4, margin: 0 }}>
            This config contains your auth token. Treat it like a password — don&apos;t share it. Click the eye icon to reveal.
          </p>
        </div>
      ) : (
        <pre style={{
          fontFamily: '"SF Mono", Consolas, Menlo, monospace',
          fontSize: 10, color: 'var(--text-mid)',
          background: 'var(--bg-surface)', borderRadius: 6, padding: '8px 10px',
          margin: 0, overflowX: 'auto', lineHeight: 1.6, whiteSpace: 'pre', userSelect: 'all',
        }}>
          {snippet}
        </pre>
      )}
    </div>
  )
}

export function AccountSection({
  walletAddress, accessToken, telegramLinked, telegramUsername, telegramToken, onUnlinkTelegram,
}: {
  walletAddress: string
  accessToken: string | null
  telegramLinked: boolean
  telegramUsername: string | null
  telegramToken: string | null
  onUnlinkTelegram: () => Promise<void>
}) {
  return (
    <motion.div {...fadeUp(0.18)}>
      <p style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--weight-ui)', color: 'var(--text-muted)', letterSpacing: '-0.003em', marginBottom: 'var(--space-1)' }}>
        Account
      </p>

      <div style={{ background: '#fff', boxShadow: 'var(--shadow-card)', borderRadius: 12 }}>
        <div style={{ padding: 'var(--space-2)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <WalletRow address={walletAddress} />
          {accessToken && <McpRow token={accessToken} />}
        </div>

        <div style={{
          borderTop: '1px solid var(--border-rule)', padding: '12px var(--space-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#229ED9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <TelegramLogo size={10} weight="fill" color="#fff" />
            </div>
            <span style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--weight-ui)', color: 'var(--text-mid)', letterSpacing: '-0.003em' }}>
              {telegramLinked ? (telegramUsername ? `@${telegramUsername}` : 'Connected') : 'Not connected'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {telegramLinked && (
              <button
                onClick={onUnlinkTelegram}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 'var(--text-label)', fontWeight: 'var(--weight-ui)', color: 'var(--text-muted)', letterSpacing: '-0.003em', transition: 'color 0.12s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--error)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
              >
                Unlink
              </button>
            )}
            {TELEGRAM_BOT && (
              <a
                href={!telegramLinked && telegramToken ? `https://t.me/${TELEGRAM_BOT}?start=${telegramToken}` : `https://t.me/${TELEGRAM_BOT}`}
                target="_blank" rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 'var(--text-label)', fontWeight: 'var(--weight-ui)', color: 'var(--text-muted)', textDecoration: 'none', letterSpacing: '-0.003em', transition: 'color 0.12s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
              >
                Open <ArrowUpRight size={10} weight="fill" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
