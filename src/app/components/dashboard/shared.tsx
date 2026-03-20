"use client";

import { useState } from "react";
import { Copy, Check } from "@phosphor-icons/react";
import { fmt6 } from "../../hooks/useAccount";

// ── Animation ─────────────────────────────────────────────────────────────────

export const ease = [0.19, 1, 0.22, 1] as const;

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});

// ── Formatters ────────────────────────────────────────────────────────────────

export const f6 = (raw?: string) => parseFloat(fmt6(raw));

export const fmtDate = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  if (isToday) return `Today · ${time}`;
  return `${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · ${time}`;
};

export const fmtUsd = (n: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// ── AuricLogomark ─────────────────────────────────────────────────────────────

export function AuricLogomark({
  size = 24,
  color = "var(--text)",
}: {
  size?: number;
  color?: string;
}) {
  const scale = size / 29;
  return (
    <svg
      width={size}
      height={Math.round(19 * scale)}
      viewBox="0 0 29 19"
      fill="none"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        d="M19.5 0C24.7467 4.18767e-07 29 4.2533 29 9.5C29 14.7467 24.7467 19 19.5 19H9.5C4.2533 19 0 14.7467 0 9.5C0 4.2533 4.2533 0 9.5 0H19.5ZM10.5 4C7.46243 4 5 6.46243 5 9.5C5 12.5376 7.46243 15 10.5 15H18.5C21.5376 15 24 12.5376 24 9.5C24 6.46243 21.5376 4 18.5 4H10.5Z"
        fill={color}
      />
    </svg>
  );
}

// ── CopyBtn ───────────────────────────────────────────────────────────────────

export function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).catch(() => {});
        setDone(true);
        setTimeout(() => setDone(false), 1800);
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "2px 0",
        fontFamily: "inherit",
        fontSize: "var(--text-label)",
        fontWeight: "var(--weight-ui)",
        color: done
          ? "var(--accent)"
          : hov
            ? "var(--text-mid)"
            : "var(--text-muted)",
        letterSpacing: "-0.006em",
        transition: "color 0.12s ease",
      }}
    >
      {done ? (
        <Check size={11} weight="fill" />
      ) : (
        <Copy size={11} weight="fill" />
      )}
      {done ? "Copied" : "Copy"}
    </button>
  );
}

// ── XautCoin ──────────────────────────────────────────────────────────────────

export function XautCoin({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        d="M5.19922 11.1893L12.1623 17.5953L19.7824 10.9108L18.2898 5.34033H6.59183L5.19922 11.1893Z"
        fill="#6E643B"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1817 12.2569C14.6568 12.2569 16.7135 11.8383 17.2277 11.2763C16.7973 10.798 15.2547 10.4274 13.2817 10.3317V11.5155C12.935 11.5394 12.5643 11.5394 12.1817 11.5394C11.799 11.5394 11.4402 11.5275 11.0815 11.5036V10.3317C9.10852 10.4393 7.56602 10.81 7.13555 11.2763C7.63777 11.8383 9.70644 12.2569 12.1817 12.2569ZM16.57 6.6966V8.32282H13.2698V9.44683C15.5895 9.56641 17.3234 10.0567 17.3354 10.6545V11.8862C17.3234 12.484 15.5895 12.9743 13.2698 13.0939V15.8561H11.0815V13.1059C8.76177 12.9863 7.02793 12.496 7.01598 11.8982V10.6545C7.02793 10.0567 8.76177 9.56641 11.0815 9.44683V8.32282H7.78128V6.6966H16.57ZM6.48984 4.11377H18.0647C18.3398 4.11377 18.5909 4.25726 18.7344 4.49641L22.1064 10.2839C22.2857 10.5828 22.226 10.9655 21.9749 11.2046L12.6958 20.2684C12.3969 20.5673 11.9066 20.5673 11.6077 20.2684L2.34058 11.2166C2.08947 10.9655 2.04164 10.5828 2.221 10.2719L5.83218 4.4725C5.97567 4.25726 6.22678 4.11377 6.48984 4.11377Z"
        fill="url(#xaut_g)"
      />
      <path
        d="M18.0644 4.11377C18.3395 4.11377 18.5911 4.25733 18.7346 4.49648L22.1067 10.2838C22.2859 10.5827 22.2255 10.9653 21.9744 11.2044L12.696 20.2685C12.3971 20.5673 11.9067 20.5672 11.6078 20.2685L2.3408 11.2168C2.0897 10.9657 2.04151 10.5823 2.22088 10.2715L5.83191 4.47267C5.97538 4.25746 6.22671 4.1138 6.48974 4.11377H18.0644Z"
        fill="black"
        fillOpacity="0.03"
      />
      <path
        d="M18.0652 3C18.6962 3 19.2725 3.31139 19.6233 3.81921L19.6903 3.92326L19.6974 3.93561L23.0624 9.71064L23.1409 9.85614C23.4962 10.588 23.3199 11.4526 22.7529 12.0007L22.7538 12.0016L13.4753 21.0649L13.4744 21.0641C12.7426 21.7863 11.5615 21.7865 10.8298 21.0641V21.0649L1.56279 12.0131L1.55838 12.0087L1.55309 12.0043C0.938337 11.3893 0.830808 10.4534 1.2568 9.71505L1.26562 9.69918L1.2762 9.68331L4.88725 3.88358L4.89607 3.86859L4.90577 3.85448C5.24312 3.34846 5.83247 3.00003 6.4904 3H18.0652ZM6.4904 4.11374C6.22736 4.11377 5.97603 4.25743 5.83256 4.47264L2.22151 10.2715C2.04215 10.5824 2.09033 10.9657 2.34144 11.2168L11.6085 20.2687C11.9074 20.5673 12.3978 20.5675 12.6966 20.2687L21.9751 11.2044C22.2262 10.9654 22.2867 10.5827 22.1074 10.2838L18.7353 4.49645C18.5918 4.2573 18.3402 4.11374 18.0652 4.11374H6.4904Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="xaut_g"
          x1="12.1616"
          y1="4.11377"
          x2="12.1616"
          y2="20.4926"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFEA98" />
          <stop offset="1" stopColor="#EBD891" />
        </linearGradient>
      </defs>
    </svg>
  );
}
