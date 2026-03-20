"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { WalletIcon, QRIcon } from "./Icons";
import { CopyButton, ExtLink } from "./ui";

const ETHERSCAN_BASE = "https://etherscan.io/address/";

export const WalletCard = ({
  address,
  showDeposit,
}: {
  address: string;
  showDeposit: boolean;
}) => {
  const [showQR, setShowQR] = useState(false);
  return (
    <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-4 mb-3">
      {showDeposit && (
        <div className="flex gap-3.5 pb-3.5 mb-3.5 border-b border-[rgba(0,0,0,0.06)]">
          <div className="shrink-0 w-9 h-9 bg-[rgba(0,185,125,0.1)] rounded-lg flex items-center justify-center">
            <WalletIcon stroke="#00B97D" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#201F1D] mb-1">
              Start accumulating XAU₮
            </p>
            <p className="text-[13px] text-[#6B6A66] leading-relaxed">
              Deposit USD₮ to your wallet. Gas is sponsored.
            </p>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-[#96938E] uppercase tracking-wide">
          <WalletIcon />
          Wallet
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => setShowQR(!showQR)}
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#96938E] bg-[#F5F4F2] rounded-[6px] px-2.5 py-1 hover:bg-[#EDEBE9] hover:text-[#201F1D] transition-colors cursor-pointer"
          >
            <QRIcon />
            {showQR ? "Address" : "QR"}
          </button>
          <CopyButton value={address} size="small" />
        </div>
      </div>
      {showQR ? (
        <div className="flex justify-center py-3">
          <div className="bg-[#F5F4F2] rounded-lg p-3">
            <QRCodeSVG value={address} size={120} />
          </div>
        </div>
      ) : (
        <div className="text-[13px] font-medium font-mono text-[#201F1D] bg-[#F5F4F2] rounded-lg px-3.5 py-2.5 break-all leading-relaxed">
          {address}
        </div>
      )}
      <div className="mt-1.5">
        <ExtLink href={`${ETHERSCAN_BASE}${address}`}>
          View on Etherscan
        </ExtLink>
      </div>
    </div>
  );
};
