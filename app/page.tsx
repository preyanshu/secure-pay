'use client'
import { useState } from 'react';
import { useAccount } from 'wagmi';
import Header from '@/components/Header';
import WelcomeSection from '@/components/WelcomeSection';
import ActionCards from '@/components/ActionCards';
import FeaturesSection from '@/components/FeaturesSection';
import UserRegistory from '@/components/UserRegistory';
import WalletConnect from '@/components/WalletConnect';
import Footer from '@/components/Footer';

export default function Home() {
  const { isConnected } = useAccount();

  if (!isConnected) return <WalletConnect />;

  return (
    <div className=''>
      {/* <Header /> */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <WelcomeSection />
        <ActionCards />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
