"use client";

import { TelegramLogo } from "@phosphor-icons/react";
import { AuricLogomark } from "./shared";

const TELEGRAM_BOT = process.env.NEXT_PUBLIC_TELEGRAM_BOT ?? "";

export function Header({ onLogout }: { onLogout: () => void }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 var(--space-3)",
        background: "var(--nav-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-rule)",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}
      >
        <AuricLogomark size={18} />
        <span
          style={{
            fontSize: 14,
            fontWeight: "var(--weight-heading)",
            color: "var(--text)",
            letterSpacing: "-0.02em",
          }}
        >
          Auric
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {TELEGRAM_BOT && (
          <a
            href={`https://t.me/${TELEGRAM_BOT}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn--sm btn--ghost"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              textDecoration: "none",
            }}
          >
            <TelegramLogo size={12} weight="fill" />
            Open bot
          </a>
        )}
        <button
          onClick={onLogout}
          className="btn btn--sm btn--ghost"
          style={{ color: "var(--text-muted)" }}
        >
          Log out
        </button>
      </div>
    </header>
  );
}
