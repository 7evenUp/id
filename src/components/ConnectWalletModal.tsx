import React, { Dispatch, SetStateAction, useEffect } from "react"
import { useWeb3Modal } from "@web3modal/react"
import { ConnectorNotFoundError, useAccount, useConnect } from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { InjectedConnector } from "wagmi/connectors/injected"
import { useTranslation } from "react-i18next"

import { ReactComponent as Loader } from "@/assets/icons/loader.svg"
import { ReactComponent as MetaMask } from "@/assets/icons/wallets/metamask-icon.svg"
import { ReactComponent as TrustWallet } from "@/assets/icons/wallets/trust-wallet-logo.svg"
import { ReactComponent as Injected } from "@/assets/icons/wallets/injected-icon.svg"
import { ReactComponent as WalletConnect } from "@/assets/icons/wallets/wallet-connect-logo.svg"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog"

import { cn } from "@/lib/classNames"
import { TrustWalletConnector } from "@/lib/TrustWalletConnector"

const METAMASK_INSTALL_LINK =
  "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
const TRUSTWALLET_INSTALL_LINK =
  "https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph"

const ConnectWalletModal = ({
  open,
  onOpenChange,
  close,
  setIsAuthStarted,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  close: () => void
  setIsAuthStarted?: Dispatch<SetStateAction<boolean>>
}) => {
  const { t } = useTranslation("modals")

  const { isConnected } = useAccount()

  const { connectAsync: connectMMAsync, isLoading: isMMLoading } = useConnect({
    connector: new MetaMaskConnector(),
  })

  const { connectAsync: connectTWAsync, isLoading: isTWLoading } = useConnect({
    connector: new TrustWalletConnector(),
  })

  const { connectAsync: connectInjectedAsync, isLoading: isInjectedLoading } =
    useConnect({
      connector: new InjectedConnector(),
    })

  const { open: web3open } = useWeb3Modal()

  useEffect(() => {
    if (isConnected) close()
  }, [isConnected, close])

  const onMetamaskClick = async () => {
    if (setIsAuthStarted) setIsAuthStarted(true)
    try {
      if (!isConnected) await connectMMAsync()
    } catch (error) {
      if (error instanceof ConnectorNotFoundError) {
        window.open(METAMASK_INSTALL_LINK, "_blank")
      }
    }
  }

  const onTrustWalletClick = async () => {
    if (setIsAuthStarted) setIsAuthStarted(true)
    try {
      if (!isConnected) await connectTWAsync()
    } catch (error) {
      if (error instanceof ConnectorNotFoundError) {
        window.open(TRUSTWALLET_INSTALL_LINK, "_blank")
      }
    }
  }

  const onInjectedClick = async () => {
    if (setIsAuthStarted) setIsAuthStarted(true)
    try {
      if (!isConnected) await connectInjectedAsync()
    } catch (error) {
      if (error instanceof ConnectorNotFoundError) {
        window.open(METAMASK_INSTALL_LINK, "_blank")
      }
    }
  }

  const onWalletConnectClick = () => {
    if (setIsAuthStarted) setIsAuthStarted(true)

    web3open()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:w-[400px] 3xl:w-[26.041vw]">
        <DialogHeader className="mb-6 3xl:mb-[1.563vw]">
          <DialogTitle>{t("connect-wallet.title")}</DialogTitle>
        </DialogHeader>

        {isMMLoading && (
          <div className="flex items-center gap-2 3xl:gap-[0.521vw] text-sm -tracking-[0.01em] 3xl:text-[0.911vw]/[1.302vw]">
            <Loader className="animate-spin 3xl:w-[1.563vw] 3xl:h-[1.563vw]" />
            <p>{t("connect-wallet.connecting-metamask")}</p>
          </div>
        )}

        {isTWLoading && (
          <div className="flex items-center gap-2 3xl:gap-[0.521vw] text-sm -tracking-[0.01em] 3xl:text-[0.911vw]/[1.302vw]">
            <Loader className="animate-spin 3xl:w-[1.563vw] 3xl:h-[1.563vw]" />
            <p>{t("connect-wallet.connecting-trustwallet")}</p>
          </div>
        )}

        {isInjectedLoading && (
          <div className="flex items-center gap-2 3xl:gap-[0.521vw] text-sm -tracking-[0.01em] 3xl:text-[0.911vw]/[1.302vw]">
            <Loader className="animate-spin 3xl:w-[1.563vw] 3xl:h-[1.563vw]" />
            <p>{t("connect-wallet.connecting-injected")}</p>
          </div>
        )}

        <div className="flex flex-col gap-4 3xl:gap-[1.042vw]">
          <ConnectButton onClick={onMetamaskClick}>
            <MetaMask className="w-[24px] h-[24px] 3xl:w-[1.563vw] 3xl:h-[1.563vw]" />{" "}
            MetaMask
          </ConnectButton>
          <ConnectButton onClick={onTrustWalletClick}>
            <TrustWallet className="w-[24px] h-[24px] 3xl:w-[1.563vw] 3xl:h-[1.563vw]" />{" "}
            Trust Wallet
          </ConnectButton>
          <ConnectButton onClick={onInjectedClick}>
            <Injected className="w-[24px] h-[24px] 3xl:w-[1.563vw] 3xl:h-[1.563vw] text-gray-1 dark:text-gray-6 group-hover:text-white dark:group-hover:text-gray-1 transition-colors" />{" "}
            Injected
          </ConnectButton>
          <ConnectButton onClick={onWalletConnectClick}>
            <WalletConnect className="w-[24px] h-[24px] 3xl:w-[1.563vw] 3xl:h-[1.563vw]" />{" "}
            WalletConnect
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
        "group flex items-center gap-4 3xl:gap-[1.042vw] text-base 3xl:text-[1.042vw]/[1.563vw] py-2 3xl:py-[0.521vw] px-4 3xl:px-[1.042vw] rounded-md 3xl:rounded-[0.391vw] text-gray-1 hover:text-white border dark:text-gray-6 dark:hover:text-gray-1 border-gray-1 dark:border-gray-6 bg-white hover:bg-gray-1 dark:bg-gray-1 dark:hover:bg-gray-6 active:bg-opacity-80 dark:active:bg-opacity-80 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
