export const WALLET_CONNECT_PROJECT_ID = 'c9424654f7514d8f8e3a25d5d0bb7c60' // This is a test project ID, replace with your own from WalletConnect Cloud

export const SUPPORTED_CHAINS = [
  {
    id: 4202, // Lisk Sepolia testnet
    name: 'Lisk Sepolia',
    network: 'lisk-sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://rpc.sepolia-api.lisk.com'],
      },
      public: {
        http: ['https://rpc.sepolia-api.lisk.com'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Lisk Explorer',
        url: 'https://sepolia-blockscout.lisk.com',
      },
    },
    testnet: true,
  },
]
