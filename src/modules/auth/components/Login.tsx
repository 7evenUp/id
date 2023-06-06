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

  const [authenticate, { error, isSuccess, data }] = useAuthByWalletMutation()

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

  const handleConnect = async () => {
    try {
      if (!isConnected) {
        const res = await connectAsync()
        console.log("Handle auth: ", res)
      }
      console.log("Before sign message")
      const signature = await signMessageAsync({ message: AUTH_MESSAGE })
      console.log("Signature: ", signature)
      if (address) {
        console.log("BEFORE REQUEST")
        const res = await authenticate({
          address: address.toLowerCase(),
          message: AUTH_MESSAGE,
          signature,
        })
        console.log("RESPONSE: ", res)
      }
    } catch (error) {
      console.log("Catch error: ", error)
    }
  }

  if (error) console.log("ERROR:", error)

  if (isSuccess) {
    console.log("success")
  }

  if (data) console.log("DATA: ", data)

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
