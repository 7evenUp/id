import React, { Dispatch, SetStateAction, useEffect } from "react"
import { ConnectorNotFoundError, useAccount, useConnect } from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { InjectedConnector } from "wagmi/connectors/injected"
// import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
import { useTranslation } from "react-i18next"

import { ReactComponent as Loader } from "@/assets/icons/loader.svg"
import { ReactComponent as MetaMask } from "@/assets/icons/wallets/metamask-icon.svg"
import { ReactComponent as TrustWallet } from "@/assets/icons/wallets/trust-wallet-logo.svg"
import { ReactComponent as RabbyWallet } from "@/assets/icons/wallets/rabby-icon.svg"
import { ReactComponent as Injected } from "@/assets/icons/wallets/injected-icon.svg"
// import { ReactComponent as WalletConnect } from "@/assets/icons/wallets/wallet-connect-logo.svg"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog"

import { TrustWalletConnector } from "@/lib/TrustWalletConnector"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

// const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID
// const metadata = {
//   name: "Crypton ID",
//   description: "Personal Cabinet for Crypton",
//   url: "https://id.crypton.xyz",
//   icons: ["https://avatars.githubusercontent.com/u/37784886"],
// }

const METAMASK_INSTALL_LINK =
  "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
const TRUSTWALLET_INSTALL_LINK =
  "https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph"
const RABBY_INSTALL_LINK =
  "https://chrome.google.com/webstore/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch"

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

  console.log('#')
  console.log('rerender')

  const scale = useAppSelector((state) => state.scale.value)

  const { isConnected } = useAccount()

  const { connectAsync: connectMMAsync, isLoading: isMMLoading } = useConnect({
    connector: new MetaMaskConnector({
      options: { UNSTABLE_shimOnConnectSelectAccount: true },
    }),
  })

  const { connectAsync: connectTWAsync, isLoading: isTWLoading } = useConnect({
    connector: new TrustWalletConnector(),
  })

  const { connectAsync: connectRabbyAsync, isLoading: isRabbyLoading } =
    useConnect({
      connector: new InjectedConnector(),
    })

  const { connectAsync: connectInjectedAsync, isLoading: isInjectedLoading } =
    useConnect({
      connector: new InjectedConnector(),
    })

  // const { connectAsync: connectWalletConnectAsync } = useConnect({
  //   connector: new WalletConnectConnector({ options: { projectId, metadata } }),
  // })

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

  const onRabbyWalletClick = async () => {
    if (setIsAuthStarted) setIsAuthStarted(true)
    try {
      if (!isConnected) await connectRabbyAsync()
    } catch (error) {
      if (error instanceof ConnectorNotFoundError) {
        window.open(RABBY_INSTALL_LINK, "_blank")
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

  // const onWalletConnectClick = async () => {
  //   if (setIsAuthStarted) setIsAuthStarted(true)
  //   try {
  //     if (!isConnected) await connectWalletConnectAsync()
  //   } catch (error) {
  //     console.error("WalletConnect error while connecting: ", error)
  //   }

  //   // if (openConnectModal) openConnectModal()
  //   // web3open()
  // }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn("sm:w-[400px]", scale && "3xl:w-[26.041vw]")}
      >
        <DialogHeader className={cn("mb-6", scale && "3xl:mb-[1.563vw]")}>
          <DialogTitle>{t("connect-wallet.title")}</DialogTitle>
        </DialogHeader>

        {isMMLoading && (
          <div
            className={cn(
              "flex items-center gap-2 text-sm -tracking-[0.01em]",
              scale && "3xl:gap-[0.521vw] 3xl:text-[0.911vw]/[1.302vw]"
            )}
          >
            <Loader
              className={cn(
                "animate-spin",
                scale && "3xl:w-[1.563vw] 3xl:h-[1.563vw]"
              )}
            />
            <p>{t("connect-wallet.connecting-metamask")}</p>
          </div>
        )}

        {isTWLoading && (
          <div
            className={cn(
              "flex items-center gap-2 text-sm -tracking-[0.01em]",
              scale && "3xl:gap-[0.521vw] 3xl:text-[0.911vw]/[1.302vw]"
            )}
          >
            <Loader
              className={cn(
                "animate-spin",
                scale && "3xl:w-[1.563vw] 3xl:h-[1.563vw]"
              )}
            />
            <p>{t("connect-wallet.connecting-trustwallet")}</p>
          </div>
        )}

        {isRabbyLoading && (
          <div
            className={cn(
              "flex items-center gap-2 text-sm -tracking-[0.01em]",
              scale && "3xl:gap-[0.521vw] 3xl:text-[0.911vw]/[1.302vw]"
            )}
          >
            <Loader
              className={cn(
                "animate-spin",
                scale && "3xl:w-[1.563vw] 3xl:h-[1.563vw]"
              )}
            />
            <p>{t("connect-wallet.connecting-rabby")}</p>
          </div>
        )}

        {isInjectedLoading && (
          <div
            className={cn(
              "flex items-center gap-2 text-sm -tracking-[0.01em]",
              scale && "3xl:gap-[0.521vw] 3xl:text-[0.911vw]/[1.302vw]"
            )}
          >
            <Loader
              className={cn(
                "animate-spin",
                scale && "3xl:w-[1.563vw] 3xl:h-[1.563vw]"
              )}
            />
            <p>{t("connect-wallet.connecting-injected")}</p>
          </div>
        )}

        <div
          className={cn("flex flex-col gap-4", scale && "3xl:gap-[1.042vw]")}
        >
          <ConnectButton onClick={onMetamaskClick}>
            <MetaMask
              className={cn(
                "w-[24px] h-[24px]",
                scale && "3xl:w-[1.563vw] 3xl:h-[1.563vw]"
              )}
            />{" "}
            MetaMask
          </ConnectButton>
          <ConnectButton onClick={onTrustWalletClick}>
            <TrustWallet
              className={cn(
                "w-[24px] h-[24px]",
                scale && "3xl:w-[1.563vw] 3xl:h-[1.563vw]"
              )}
            />{" "}
            Trust Wallet
          </ConnectButton>
          <ConnectButton onClick={onRabbyWalletClick}>
            <RabbyWallet
              className={cn(
                "w-[24px] h-[24px]",
                scale && "3xl:w-[1.563vw] 3xl:h-[1.563vw]"
              )}
            />{" "}
            Rabby Wallet
          </ConnectButton>
          <ConnectButton onClick={onInjectedClick}>
            <Injected
              className={cn(
                "w-[24px] h-[24px] text-gray-1 dark:text-gray-6 group-hover:text-white dark:group-hover:text-gray-1 transition-colors",
                scale && "3xl:w-[1.563vw] 3xl:h-[1.563vw]"
              )}
            />{" "}
            Injected
          </ConnectButton>
          {/* <ConnectButton onClick={onWalletConnectClick}>
            <WalletConnect
              className={cn(
                "w-[24px] h-[24px]",
                scale && "3xl:w-[1.563vw] 3xl:h-[1.563vw]"
              )}
            />{" "}
            WalletConnect
          </ConnectButton> */}
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
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <button
      className={cn(
        "group flex items-center gap-4 text-base py-2 px-4 rounded-md text-gray-1 hover:text-white border dark:text-gray-6 dark:hover:text-gray-1 border-gray-1 dark:border-gray-6 bg-white hover:bg-gray-1 dark:bg-gray-1 dark:hover:bg-gray-6 active:bg-opacity-80 dark:active:bg-opacity-80 transition-colors",
        scale &&
          "3xl:gap-[1.042vw] 3xl:text-[1.042vw]/[1.563vw] 3xl:py-[0.521vw] 3xl:px-[1.042vw] 3xl:rounded-[0.391vw]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
