import { useEffect, useState } from "react"
import { useAccount, useDisconnect, useSignMessage } from "wagmi"
import { useWeb3Modal } from "@web3modal/react"
import { isMobile } from "react-device-detect"
import { useTranslation } from "react-i18next"

import { ReactComponent as Loader } from "@/assets/icons/loader.svg"
import { ReactComponent as Web3Logo } from "@/assets/icons/utility/Web3_logo.svg"
import { ReactComponent as MailLogo } from "@/assets/icons/utility/Mail_logo.svg"

import ConnectWalletModal from "@/components/ConnectWalletModal"

import AuthButton from "./components/AuthButton"
import MailMode from "./components/MailMode"
import RegisterWalletForm from "./components/RegisterWalletForm"

import { Skeleton } from "@/shared/ui/Skeleton"

import { useAuthByWalletMutation } from "@/redux/api/auth"
import { useBannerByIdQuery } from "@/redux/api/banners"
import { useUserProfileQuery } from "@/redux/api/profile"

const AUTH_MESSAGE = "Authorization"
const RES_BANNER_ID = 3

const Auth = () => {
  const { t } = useTranslation("auth")

  const [connectModalOpened, setConnectModalOpened] = useState(false)
  const [isAuthStarted, setIsAuthStarted] = useState(false)
  const [isMailMode, setIsMailMode] = useState(false)
  const [signature, setSignature] = useState("")

  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { isLoading: isLoadingSign, signMessageAsync } = useSignMessage()
  const { open } = useWeb3Modal()

  const { refetch } = useUserProfileQuery()
  const [
    authenticate,
    { isError: isAuthError, reset, isSuccess: isAuthSuccess },
  ] = useAuthByWalletMutation()
  const { data: banner, isLoading: isBannerLoading } = useBannerByIdQuery({
    id: RES_BANNER_ID,
  })

  useEffect(() => {
    if (isAuthSuccess) setTimeout(() => refetch(), 100)
  }, [isAuthSuccess])

  useEffect(() => {
    const login = async () => {
      let signature

      try {
        signature = await signMessageAsync({ message: AUTH_MESSAGE })
      } catch {
        disconnect()
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

  const openConnectModal = () => {
    setConnectModalOpened(true)
  }

  const closeConnectModal = () => {
    setConnectModalOpened(false)
  }

  const handleConnect = async () => {
    setIsAuthStarted(true)
    if (!isConnected) open()
  }

  return (
    <>
      <div className="flex border border-gray-1 rounded-xl 2xl:rounded-[0.781vw] w-full mobile:w-auto ms-auto me-auto">
        <div className="flex flex-col justify-between gap-6 2xl:gap-[1.563vw] py-8 2xl:py-[2.083vw] px-9 2xl:px-[2.34vw] bg-white rounded-xl md:rounded-none md:rounded-l-xl 2xl:rounded-l-[0.781vw] text-gray-1 w-full mobile:w-[370px] 2xl:w-[24.088vw] min-h-[340px] 2xl:min-h-[22.135vw]">
          <div className="flex flex-col">
            <h2 className="text-lg 2xl:text-[1.1718vw] font-medium text-black mb-10 2xl:mb-[2.6vw] max-w-[260px] 2xl:max-w-[16.92vw]">
              {t("login.heading")}
            </h2>

            {!isMailMode && !isAuthError && (
              <div className="flex gap-3 2xl:gap-[0.781vw] flex-wrap items-center my-3.5 2xl:my-[0.91vw]">
                {isMobile ? (
                  <AuthButton onClick={handleConnect}>
                    <Web3Logo className="2xl:w-[2.6vw] 2xl:h-[1.3vw]" />
                    <span>{t("web3-btn")}</span>
                  </AuthButton>
                ) : (
                  <AuthButton onClick={openConnectModal}>
                    <Web3Logo className="2xl:w-[2.6vw] 2xl:h-[1.3vw]" />
                    <span>{t("web3-btn")}</span>
                  </AuthButton>
                )}

                <AuthButton onClick={() => setIsMailMode(true)}>
                  <MailLogo className="2xl:w-[1.822vw] 2xl:h-[1.953vw]" />
                  <span>{t("email-btn")}</span>
                </AuthButton>
              </div>
            )}

            {isAuthError && (
              <RegisterWalletForm signature={signature} back={() => reset()} />
            )}

            {isMailMode && <MailMode back={() => setIsMailMode(false)} />}
          </div>
          {isLoadingSign && (
            <div className="flex items-center gap-2 2xl:gap-[0.521vw] text-sm -tracking-[0.01em] 2xl:text-[0.911vw]/[1.302vw] mt-auto">
              <Loader className="animate-spin 2xl:w-[1.563vw] 2xl:h-[1.563vw]" />
              <p>{t("login.confirm-wallet-sign")}</p>
            </div>
          )}
        </div>
        <div className="hidden md:block w-[350px] 2xl:w-[22.78vw] border-l border-gray-1">
          {isBannerLoading ? (
            <Skeleton className="w-[350px] 2xl:w-[22.78vw] min-h-[400px] 2xl:min-h-[26.04vw] h-full rounded-r-xl 2xl:rounded-r-[0.781vw]" />
          ) : banner ? (
            <a href={banner.url} target="_blank">
              <img
                src={banner.file}
                alt="research auth intro"
                className="w-[350px] 2xl:w-[22.78vw] min-h-[400px] 2xl:min-h-[26.04vw] h-full object-cover rounded-r-xl 2xl:rounded-r-[0.781vw]"
              />
            </a>
          ) : null}
        </div>
      </div>

      <ConnectWalletModal
        open={connectModalOpened}
        onOpenChange={setConnectModalOpened}
        close={closeConnectModal}
        setIsAuthStarted={setIsAuthStarted}
      />
    </>
  )
}

export default Auth
