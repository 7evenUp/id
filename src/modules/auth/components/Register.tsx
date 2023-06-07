import { useState } from "react"
import { useAccount, useConnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { useTranslation } from "react-i18next"

import { ReactComponent as Web3Logo } from "@/assets/icons/utility/Web3_logo.svg"
import { ReactComponent as MailLogo } from "@/assets/icons/utility/Mail_logo.svg"

import AuthButton from "./AuthButton"
import RegisterMailForm from "./RegisterMailForm"
import RegisterWebForm from "./RegisterWebForm"

import { useMetamask } from "@/hooks/useMetamask"

const Register = () => {
  const { t } = useTranslation("auth")

  const [isMailMode, setIsMailMode] = useState(false)
  const [isWebMode, setIsWebMode] = useState(false)

  const { isConnected } = useAccount()
  const { connectAsync, isLoading: isLoadingConnect } = useConnect({
    connector: new InjectedConnector(),
  })

  const {
    state: { isMetamaskInstalled },
  } = useMetamask()

  const handleConnect = async () => {
    try {
      if (!isConnected) {
        const connection = await connectAsync()
      }
      setIsWebMode(true)
    } catch (error) {
      console.log("Catch error: ", error)
    }
  }

  if (isMailMode) return <RegisterMailForm back={() => setIsMailMode(false)} />

  if (isWebMode) return <RegisterWebForm back={() => setIsWebMode(false)} />

  return (
    <div className="flex gap-3 flex-wrap items-center my-3.5">
      {isMetamaskInstalled ? (
        <AuthButton onClick={handleConnect}>
          <Web3Logo />
          <span>{isLoadingConnect ? "Connecting" : t("web3-btn")}</span>
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

export default Register
