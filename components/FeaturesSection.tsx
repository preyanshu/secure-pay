'use client'

export default function FeaturesSection() {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-white mb-12">Why Choose SecurePay?</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard title="No Wrong Addresses" colorFrom="blue-500" colorTo="yellow-500" description="Send crypto using simple usernames instead of complex wallet addresses" />
        <FeatureCard title="Escrow Protected" colorFrom="green-500" colorTo="teal-600" description="Funds held safely in smart contract until receiver withdraws" />
        <FeatureCard title="Instant Withdrawals" colorFrom="purple-500" colorTo="pink-600" description="Recipients can withdraw their funds immediately" />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, colorFrom, colorTo }: { title: string; description: string; colorFrom: string; colorTo: string }) {
  return (
    <div className="text-center">
      <div className={`w-20 h-20 bg-gradient-to-r from-${colorFrom} to-${colorTo} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}
