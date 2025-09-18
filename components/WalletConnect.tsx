'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from "wagmi";

export default function WalletConnect() {
  const { address, isConnected } = useAccount();

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 w-full max-w-lg shadow-2xl">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">SecurePay</h1>
          <h2 className="text-2xl font-semibold text-slate-300 mb-2">Safe Crypto Transactions</h2>
          <p className="text-slate-400 leading-relaxed">
            Send crypto safely by username instead of wallet addresses. Built on Avalanche C-Chain.
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-slate-300">Fast & Secure Transactions</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-slate-300">Testnet Environment</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-slate-300">User Management</span>
          </div>
        </div>

        {/* Connect Button Section */}
        <div className="text-center mb-6">
          <div className="mb-4">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                          >
                            <span className="flex items-center justify-center space-x-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              <span>Connect Wallet</span>
                            </span>
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button
                            onClick={openChainModal}
                            type="button"
                            className="w-full bg-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:bg-red-700 transition-colors"
                          >
                            Wrong Network
                          </button>
                        );
                      }

                      return (
                        <div className="space-y-3">
                          <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                            <div className="flex items-center justify-center space-x-2 text-green-400 mb-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="font-medium">Wallet Connected</span>
                            </div>
                            <p className="text-sm text-green-300 text-center">
                              {account.displayName}
                            </p>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={openChainModal}
                              className="flex-1 bg-slate-700 text-white py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors font-medium text-sm"
                            >
                              {chain.hasIcon && (
                                <div className="inline-block w-4 h-4 mr-2">
                                  {chain.iconUrl && (
                                    <img
                                      alt={chain.name ?? 'Chain icon'}
                                      src={chain.iconUrl}
                                      className="w-4 h-4"
                                    />
                                  )}
                                </div>
                              )}
                              {chain.name}
                            </button>
                            
                            <button
                              onClick={openAccountModal}
                              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                            >
                              Account
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>

        {/* Status Section */}
        {isConnected && address && (
          <div className="mt-6 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
            <p className="text-sm text-slate-400 mb-2">Connected Address:</p>
            <p className="font-mono text-xs text-slate-200 break-all">{address}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
          <p className="text-xs text-slate-500 mb-2">
            Powered by Avalanche C-Chain Smart Contracts
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-slate-400">
            <span>🔒 Escrow Protected</span>
            <span>👤 Username Based</span>
            <span>⚡ Instant Withdrawals</span>
          </div>
        </div>
      </div>
    </div>
  );
}