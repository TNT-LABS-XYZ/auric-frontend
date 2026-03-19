'use client'

import { useState } from 'react'
import { CopyIcon, ExternalIcon } from './Icons'

export const CopyButton = ({ value, size = 'default' }: { value: string; size?: 'default' | 'small' }) => {
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

export const ExtLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#96938E] hover:text-[#201F1D] transition-colors">
    {children}<ExternalIcon />
  </a>
)
