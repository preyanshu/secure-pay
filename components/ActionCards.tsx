'use client'
import Link from 'next/link';

export default function ActionCards() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-16">
      {/* Register Card */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl hover:transform hover:scale-102 transition-all duration-300">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Register Username</h3>
        <p className="text-slate-400 mb-6 leading-relaxed">
          Create your unique username and link it to your wallet address. Others can send you crypto using just your username.
        </p>
        <Link href="/register">
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 cursor-pointer rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-102 active:scale-95 shadow-lg"
          >
            Get Started
          </button>
        </Link>
      </div>

      {/* Send Payment Card */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl hover:transform hover:scale-102 transition-all duration-300">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Send & Withdraw</h3>
        <p className="text-slate-400 mb-6 leading-relaxed">
          Send crypto to any registered username. Funds go to our secure smart contract escrow.
        </p>
        <Link href="/pay">
          <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all cursor-pointer duration-200 transform hover:scale-102 active:scale-95 shadow-lg">
            Send Payment
          </button>
        </Link>
      </div>
    </div>
  );
}
