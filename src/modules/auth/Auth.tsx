import { useEffect, useState } from "react"
import { useAccount, useSignMessage } from "wagmi"
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

const AUTH_MESSAGE = "Authorization"
const RES_BANNER_ID = 3

const Auth = () => {
  const { t } = useTranslation("auth")

  const [connectModalOpened, setConnectModalOpened] = useState(false)
  const [isAuthStarted, setIsAuthStarted] = useState(false)
  const [isMailMode, setIsMailMode] = useState(false)
  const [signature, setSignature] = useState("")

  const { address, isConnected } = useAccount()
  const { isLoading: isLoadingSign, signMessageAsync } = useSignMessage()
  const { open } = useWeb3Modal()

  const [authenticate, { isError: isAuthError, reset }] =
    useAuthByWalletMutation()
  const { data: banner, isLoading: isBannerLoading } = useBannerByIdQuery({
    id: RES_BANNER_ID,
  })

  useEffect(() => {
    const login = async () => {
      const signature = await signMessageAsync({ message: AUTH_MESSAGE })
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
      <div className="flex border border-gray-1 rounded-xl w-full mobile:w-auto ms-auto me-auto">
        <div className="flex flex-col justify-between gap-6 py-8 px-9 bg-white rounded-xl md:rounded-none md:rounded-l-xl text-gray-1 w-full mobile:w-[370px] min-h-[340px]">
          <div className="flex flex-col">
            <h2 className="text-lg font-medium text-black mb-10 max-w-[260px]">
              {t("login.heading")}
            </h2>

            {!isMailMode && !isAuthError && (
              <div className="flex gap-3 flex-wrap items-center my-3.5">
                {isMobile ? (
                  <AuthButton onClick={handleConnect}>
                    <Web3Logo />
                    <span>{t("web3-btn")}</span>
                  </AuthButton>
                ) : (
                  <AuthButton onClick={openConnectModal}>
                    <Web3Logo />
                    <span>{t("web3-btn")}</span>
                  </AuthButton>
                )}

                <AuthButton onClick={() => setIsMailMode(true)}>
                  <MailLogo />
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
            <div className="flex items-center gap-2 typography-text-0 mt-auto">
              <Loader className="animate-spin" />
              <p>Подтвердите подпись транзакции в кошельке</p>
            </div>
          )}
        </div>
        <div className="hidden md:block w-[350px] border-l border-gray-1">
          {isBannerLoading ? (
            <Skeleton className="w-[350px] min-h-[400px] h-full rounded-r-xl" />
          ) : banner ? (
            <a href={banner.url} target="_blank">
              <img
                src={banner.file}
                alt="research auth intro"
                className="w-[350px] min-h-[400px] h-full object-cover rounded-r-xl"
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
