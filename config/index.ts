import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { avalancheFuji } from 'wagmi/chains'   // ✅ Fuji testnet chain from wagmi

// Your WalletConnect / AppKit Project ID
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID // <-- replace with your real projectId from WalletConnect/AppKit
console.log(projectId)
if (!projectId) {
  throw new Error('Project ID is not defined')
}

// ✅ use Avalanche Fuji chain
export const network = avalancheFuji

// Build wagmi adapter config
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  networks: [network],   // Fuji testnet
  projectId,
})

// Export wagmi config
export const config = wagmiAdapter.wagmiConfig
