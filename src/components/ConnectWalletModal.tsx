import React, { Dispatch, SetStateAction, useEffect } from "react"
import { useWeb3Modal } from "@web3modal/react"
import { ConnectorNotFoundError, useAccount, useConnect } from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"

import { ReactComponent as Loader } from "@/assets/icons/loader.svg"
import { ReactComponent as MetaMask } from "@/assets/icons/wallets/metamask-icon.svg"
import { ReactComponent as TrustWallet } from "@/assets/icons/wallets/trust-wallet-logo.svg"
import { ReactComponent as WalletConnect } from "@/assets/icons/wallets/wallet-connect-logo.svg"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog"

import { cn } from "@/lib/classNames"
import { TrustWalletConnector } from "@/lib/TrustWalletConnector"

const ConnectWalletModal = ({
  open,
  onOpenChange,
  closeConnectModal,
  setIsAuthStarted,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  closeConnectModal: () => void
  setIsAuthStarted?: Dispatch<SetStateAction<boolean>>
}) => {
  const { address, isConnected } = useAccount()

  const { connectAsync: connectMMAsync, isLoading: isMMLoading } = useConnect({
    connector: new MetaMaskConnector(),
  })

  const { connectAsync: connectTWAsync, isLoading: isTWLoading } = useConnect({
    connector: new TrustWalletConnector(),
  })

  const { open: web3open, isOpen } = useWeb3Modal()

  useEffect(() => {
    console.log("Rerender")
    if (isConnected) closeConnectModal()
  }, [isConnected])

  const onMetamaskClick = async () => {
    if (setIsAuthStarted) setIsAuthStarted(true)
    try {
      if (!isConnected) await connectMMAsync()
    } catch (error) {
      if (error instanceof ConnectorNotFoundError) {
        window.open(
          "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
          "_blank"
        )
      }
    }
  }

  const onTrustWalletClick = async () => {
    if (setIsAuthStarted) setIsAuthStarted(true)
    try {
      if (!isConnected) await connectTWAsync()
    } catch (error) {
      if (error instanceof ConnectorNotFoundError) {
        window.open(
          "https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph",
          "_blank"
        )
      }
    }
  }

  const onWalletConnectClick = () => {
    if (setIsAuthStarted) setIsAuthStarted(true)

    // if (!isConnected) web3open()
    web3open()
    // else closeConnectModal()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:w-[400px]">
        <DialogHeader className="typography-text-1 mb-6">
          <DialogTitle>Подключение кошелька</DialogTitle>
        </DialogHeader>

        {isMMLoading && (
          <div className="flex items-center gap-2 typography-text-0">
            <Loader className="animate-spin" />
            <p>Подключение кошелька MetaMask</p>
          </div>
        )}

        {isTWLoading && (
          <div className="flex items-center gap-2 typography-text-0">
            <Loader className="animate-spin" />
            <p>Подключение кошелька Trust Wallet</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <ConnectButton onClick={onMetamaskClick}>
            <MetaMask className="w-6 h-6" /> MetaMask
          </ConnectButton>
          <ConnectButton onClick={onTrustWalletClick}>
            <TrustWallet className="w-6 h-6" /> Trust Wallet
          </ConnectButton>
          <ConnectButton onClick={onWalletConnectClick}>
            <WalletConnect className="w-6 h-6" /> WalletConnect
          </ConnectButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConnectWalletModal

const ConnectButton = ({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "flex items-center gap-4 text-base py-2 px-4 rounded-md text-gray-1 hover:text-white border dark:text-gray-6 dark:hover:text-gray-1 border-gray-1 dark:border-gray-6 bg-white hover:bg-gray-1 dark:bg-gray-1 dark:hover:bg-gray-6 active:bg-opacity-80 dark:active:bg-opacity-80 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
