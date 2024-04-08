import { useEffect, useState } from "react"
import { useAccount, useDisconnect, useSignMessage } from "wagmi"
import { useWeb3Modal } from "@web3modal/wagmi/react"
// import { isMobile } from "react-device-detect"
import { useTranslation } from "react-i18next"
import { isDesktop } from "react-device-detect"
import { toast } from "sonner"

import Loader from "@/assets/icons/loader.svg?react"
import Web3Logo from "@/assets/icons/utility/Web3_logo.svg?react"
import MailLogo from "@/assets/icons/utility/Mail_logo.svg?react"

// import ConnectWalletModal from "@/components/ConnectWalletModal"

import AuthButton from "./components/AuthButton"
import MailMode from "./components/MailMode"
import RegisterWalletForm from "./components/RegisterWalletForm"
import RegisterWalletFormMobile from "./components/RegisterWalletFormMobile"

import { Skeleton } from "@/shared/ui/Skeleton"

import { useAuthByWalletMutation } from "@/redux/api/auth"
import { useRandomBannerQuery } from "@/redux/api/banners"
import { useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

import { cutWalletAddr } from "@/utils/cutWalletAddr"

const AUTH_MESSAGE = "Authorization"
const SIGN_REJECT_ERROR = "UserRejectedRequestError"
const CONNECTOR_NOT_FOUND_ERROR = "ConnectorNotFoundError"

const Auth = () => {
  const { t } = useTranslation("auth")

  const scale = useAppSelector((state) => state.scale.value)

  // const [connectModalOpened, setConnectModalOpened] = useState(false)
  const [isAuthStarted, setIsAuthStarted] = useState(false)
  const [isMailMode, setIsMailMode] = useState(false)
  const [signature, setSignature] = useState("")

  const { address, isConnected, isDisconnected } = useAccount()
  const { isPending: isLoadingSign, signMessageAsync } = useSignMessage()
  const { disconnect } = useDisconnect()
  const { open } = useWeb3Modal()

  const { refetch } = useUserProfileQuery()
  const [
    authenticate,
    { isError: isAuthError, reset, isSuccess: isAuthSuccess },
  ] = useAuthByWalletMutation()
  const { data: banner, isLoading: isBannerLoading } = useRandomBannerQuery()

  useEffect(() => {
    if (isAuthSuccess) setTimeout(() => refetch(), 100)
  }, [isAuthSuccess])

  useEffect(() => {
    const login = async () => {
      let signature

      try {
        signature = await signMessageAsync({ message: AUTH_MESSAGE })
      } catch (error) {
        // @ts-expect-error No-Error-Types
        if (error.name === SIGN_REJECT_ERROR) {
          toast.error(t("wallet-reject-error"))
        }

        // @ts-expect-error No-Error-Types
        if (error.name === CONNECTOR_NOT_FOUND_ERROR) {
          toast.error(t("wallet-connector-error"))
        }

        disconnect()
        setIsAuthStarted(false)
        return
      }

      setSignature(signature)
      const lowerAddress = isConnected && address ? address.toLowerCase() : ""
      await authenticate({
        address: lowerAddress,
        message: AUTH_MESSAGE,
        signature,
      })

      setIsAuthStarted(false)
    }
    if (isAuthStarted && isConnected) login()
  }, [isAuthStarted, isConnected])

  useEffect(() => {
    if (isDisconnected) {
      reset()
      setIsAuthStarted(false)
    }
  }, [isDisconnected])

  // const openConnectModal = () => {
  //   open()
  // }

  // const closeConnectModal = () => {
  //   setConnectModalOpened(false)
  // }

  const handleConnect = async () => {
    setIsAuthStarted(true)
    if (!isConnected) open({ view: "Connect" })
  }

  return (
    <>
      <div
        className={cn(
          "flex border border-gray-1 dark:border-gray-3 rounded-xl w-full mobile:w-auto ms-auto me-auto",
          scale && "3xl:rounded-[0.781vw]"
        )}
      >
        <div
          className={cn(
            "flex flex-col justify-between gap-6 py-4 px-5 sm:py-8 sm:px-9 bg-white dark:bg-gray-1 rounded-xl md:rounded-none md:rounded-l-xl text-gray-1 dark:text-white w-full mobile:w-[370px] min-h-[340px] ",
            scale &&
              "3xl:gap-[1.563vw] 3xl:py-[2.083vw] 3xl:px-[2.34vw] 3xl:rounded-l-[0.781vw] 3xl:w-[24.088vw] 3xl:min-h-[22.135vw]"
          )}
        >
          <div className="flex flex-col">
            <h2
              className={cn(
                "text-lg font-medium text-black dark:text-gray-6 mb-10 max-w-[260px]",
                scale &&
                  "3xl:text-[1.1718vw] 3xl:mb-[2.6vw] 3xl:max-w-[16.92vw]"
              )}
            >
              {t("login.heading")}
            </h2>

            {!isMailMode && !isAuthError && (
              <div
                className={cn(
                  "flex gap-3 flex-wrap items-center my-3.5",
                  scale && "3xl:gap-[0.781vw] 3xl:my-[0.91vw]"
                )}
              >
                {/* {isMobile ? (
                  <AuthButton onClick={handleConnect}>
                    <Web3Logo />
                    <span>{t("web3-btn")}</span>
                  </AuthButton>
                ) : (
                  <AuthButton onClick={handleConnect}>
                    <Web3Logo
                      className={cn(scale && "3xl:w-[2.6vw] 3xl:h-[1.3vw]")}
                    />
                    <span>{t("web3-btn")}</span>
                  </AuthButton>
                )} */}

                <AuthButton onClick={handleConnect}>
                  <Web3Logo
                    className={cn(scale && "3xl:w-[2.6vw] 3xl:h-[1.3vw]")}
                  />
                  <span>{t("web3-btn")}</span>
                </AuthButton>

                <AuthButton onClick={() => setIsMailMode(true)}>
                  <MailLogo
                    className={cn(scale && "3xl:w-[1.822vw] 3xl:h-[1.953vw]")}
                  />
                  <span>{t("email-btn")}</span>
                </AuthButton>
              </div>
            )}

            {isAuthError &&
              (isDesktop ? (
                <RegisterWalletForm
                  signature={signature}
                  back={() => reset()}
                />
              ) : (
                <RegisterWalletFormMobile
                  signature={signature}
                  back={() => reset()}
                />
              ))}

            {isMailMode && <MailMode back={() => setIsMailMode(false)} />}
          </div>
          {isLoadingSign && (
            <div
              className={cn(
                "flex items-center gap-2 text-sm -tracking-[0.01em] mt-auto",
                scale && "3xl:gap-[0.521vw] 3xl:text-[0.911vw]/[1.302vw]"
              )}
            >
              <Loader
                className={cn(
                  "animate-spin",
                  scale && "3xl:w-[1.563vw] 3xl:h-[1.563vw]"
                )}
              />
              <p>
                {t("login.confirm-wallet-sign")}{" "}
                {address && cutWalletAddr(address)}
              </p>
            </div>
          )}
        </div>
        <div
          className={cn(
            "hidden md:block w-[350px] border-l border-gray-1 dark:border-gray-3",
            scale && "3xl:w-[22.78vw]"
          )}
        >
          {isBannerLoading ? (
            <Skeleton
              className={cn(
                "w-[350px] min-h-[400px] h-full rounded-r-xl",
                scale &&
                  "3xl:w-[22.78vw] 3xl:min-h-[26.04vw] 3xl:rounded-r-[0.781vw]"
              )}
            />
          ) : banner ? (
            <a href={banner.url} target="_blank">
              <img
                src={banner.file}
                className={cn(
                  "w-[350px] min-h-[400px] h-full object-cover rounded-r-xl bg-white dark:bg-gray-1",
                  scale &&
                    "3xl:w-[22.78vw] 3xl:min-h-[26.04vw] 3xl:rounded-r-[0.781vw]"
                )}
              />
            </a>
          ) : null}
        </div>
      </div>

      {/* <ConnectWalletModal
        open={connectModalOpened}
        onOpenChange={setConnectModalOpened}
        close={closeConnectModal}
        setIsAuthStarted={setIsAuthStarted}
      /> */}
    </>
  )
}

export default Auth
