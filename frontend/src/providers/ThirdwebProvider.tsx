import { ThirdwebProvider } from "@thirdweb-dev/react"

const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID || "your-client-id-here"

export function ThirdwebAppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider
      clientId={clientId}
      activeChain={{
        chainId: 57054,
        rpc: ["https://rpc.blaze.soniclabs.com"],
        nativeCurrency: {
          decimals: 18,
          name: "Sonic",
          symbol: "S",
        },
        shortName: "sonic-blaze",
        slug: "sonic-blaze-testnet",
        testnet: true,
        chain: "Sonic Blaze Testnet",
        name: "Sonic Blaze Testnet",
      }}
    >
      {children}
    </ThirdwebProvider>
  )
}
