'use client'
import { useAccount } from 'wagmi';

export default function WelcomeSection() {
  const { address } = useAccount();

  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold text-white mb-6">
        Send Crypto <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Safely</span>
      </h1>
      <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
        Never worry about wrong wallet addresses again. Send crypto using usernames through our secure escrow system. 
        Your funds are protected until the receiver withdraws them.
      </p>

      <div className="inline-flex items-center space-x-3 bg-green-500/20 border border-green-500/30 rounded-full px-6 py-3 mb-8">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-green-300 font-medium">Wallet Connected</span>
        <span className="text-green-200 font-mono text-sm">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
      </div>
    </div>
  );
}
