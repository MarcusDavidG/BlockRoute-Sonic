import { ConnectWallet as ThirdwebConnectWallet, useAddress } from "@thirdweb-dev/react"

interface ConnectWalletProps {
  className?: string
  fullScreen?: boolean
}

export function ConnectWallet({ className = '', fullScreen = false }: ConnectWalletProps) {
  const address = useAddress()

  const content = (
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {address ? 'Wallet Connected' : 'Connect Your Wallet'}
      </h2>
      {address && (
        <p className="text-gray-600 dark:text-gray-400 mb-6 font-mono">
          {`${address.slice(0, 6)}...${address.slice(-4)}`}
        </p>
      )}
      <div className={`inline-block ${className}`}>
        <ThirdwebConnectWallet
          theme="dark"
          btnTitle="Connect Wallet"
          modalTitle="Choose your wallet"
        />
      </div>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50">
        {content}
      </div>
    )
  }

  return content
}

export function WalletButton() {
  const address = useAddress()

  return (
    <ThirdwebConnectWallet
      theme="dark"
      btnTitle={address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
      modalTitle="Choose your wallet"
    />
  )
}
