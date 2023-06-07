import { useEffect, useState } from "react"
import { useAccount, useConnect, useSignMessage } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { useTranslation } from "react-i18next"

import { ReactComponent as Web3Logo } from "@/assets/icons/utility/Web3_logo.svg"
import { ReactComponent as MailLogo } from "@/assets/icons/utility/Mail_logo.svg"

import { toast } from "@/shared/ui/Toast"

import AuthButton from "./AuthButton"
import MailForm from "./MailForm"

import { useMetamask } from "@/hooks/useMetamask"

import { useAuthByWalletMutation } from "@/redux/api/auth"

const AUTH_MESSAGE = "Authorization"

const Login = () => {
  const { t } = useTranslation("auth")

  const [isMailMode, setIsMailMode] = useState(false)

  const { address, isConnected } = useAccount()
  const { connectAsync, isLoading: isLoadingConnect } = useConnect({
    connector: new InjectedConnector(),
  })
  const {
    isError: isSignError,
    isLoading: isLoadingSign,
    signMessageAsync,
  } = useSignMessage()

  const [
    authenticate,
    { error, isError: isAuthError, isSuccess: isAuthSuccess },
  ] = useAuthByWalletMutation()

  const {
    state: { isMetamaskInstalled },
  } = useMetamask()

  useEffect(() => {
    if (isSignError)
      toast({
        title: "Signature rejected",
        message: "You denied message signature",
        providedId: "SignError",
        type: "error",
        duration: 1500,
      })
  }, [isSignError])

  useEffect(() => {
    if (isAuthSuccess) location.reload()
  }, [isAuthSuccess])

  useEffect(() => {
    if (isAuthError)
      toast({
        title: "Auth error",
        message: "User doesn't exist",
        providedId: "AuthError",
        type: "error",
        duration: 1500,
      })
  }, [isAuthError])

  const handleConnect = async () => {
    try {
      let connectedAddress = ""
      if (!isConnected && address === undefined) {
        const connection = await connectAsync()
        connectedAddress = connection.account
      }
      const signature = await signMessageAsync({ message: AUTH_MESSAGE })
      const lowerAddress =
        isConnected && address
          ? address.toLowerCase()
          : connectedAddress.toLowerCase()
      await authenticate({
        address: lowerAddress,
        message: AUTH_MESSAGE,
        signature,
      })
    } catch (error) {
      console.log("Catch error: ", error)
    }
  }

  if (error) console.log("ERROR:", error)

  if (isMailMode) return <MailForm back={() => setIsMailMode(false)} />

  return (
    <div className="flex gap-3 flex-wrap items-center my-3.5">
      {isMetamaskInstalled ? (
        <AuthButton onClick={handleConnect}>
          <Web3Logo />
          <span>
            {isLoadingConnect
              ? "Connecting"
              : isLoadingSign
              ? "Signing"
              : t("web3-btn")}
          </span>
        </AuthButton>
      ) : (
        <a href="https://metamask.io/" target="_blank">
          <AuthButton>
            <Web3Logo />
            <span>{t("web3-btn")}</span>
          </AuthButton>
        </a>
      )}
      <AuthButton onClick={() => setIsMailMode(true)}>
        <MailLogo />
        <span>{t("email-btn")}</span>
      </AuthButton>
    </div>
  )
}

export default Login
