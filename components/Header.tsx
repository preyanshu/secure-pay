"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useAccount } from "wagmi";

export default function Header() {
  const { address, isConnected } = useAccount();

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
          </div>
          <Link href="/">
            <h1 className="text-xl font-bold text-white">SecurePay</h1>
          </Link>
        </div>

        <ConnectButton />
      </div>

      {/* {isConnected && (
        <div className="flex justify-center py-2">
          <span className="text-green-400 font-mono text-sm">
            Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
      )} */}
    </div>
  );
}
