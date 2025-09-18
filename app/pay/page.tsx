'use client'

import { useAccount } from 'wagmi';
import WalletConnect from '@/components/WalletConnect';
import PayPage from '@/components/PayUsers';

export default function Page() {
  const { isConnected } = useAccount();

  // If wallet is not connected, show WalletConnect
  if (!isConnected) {
    return <WalletConnect />;
  }

  // If connected, render PayPage
  return <PayPage />;
}
