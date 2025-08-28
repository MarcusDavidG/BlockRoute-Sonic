import { Chain } from 'wagmi'

export const sonicBlaze = {
  id: 57054,
  name: 'Sonic Blaze Testnet',
  network: 'sonic-blaze',
  nativeCurrency: {
    decimals: 18,
    name: 'Sonic',
    symbol: 'S',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.blaze.soniclabs.com'],
    },
    public: {
      http: ['https://rpc.blaze.soniclabs.com'],
    },
  },
  blockExplorers: {
    default: { 
      name: 'SonicScan', 
      url: 'https://testnet.sonicscan.org' 
    },
  },
  testnet: true,
} as const satisfies Chain

export const SUPPORTED_CHAINS = [sonicBlaze]
