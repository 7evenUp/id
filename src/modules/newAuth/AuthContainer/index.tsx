import { useState } from "react"

import AuthVariants from "./components/AuthVariants"
import Divider from "./components/Divider"
import EmailLogin from "./components/EmailLogin"
import EmailRegister from "./components/EmailRegister"
import WalletRegister from "./components/WalletRegister"
import IdIcon from "./components/Icons/ID"

import "./styles.css"

const AuthContainer = ({
  refetchAfterSuccessAuth,
}: {
  refetchAfterSuccessAuth: VoidFunction
}) => {
  const [emailInput, setEmailInput] = useState("")
  const [isUserNotFoundByMailLogin, setIsUserNotFoundByMailLogin] =
    useState(false)

  const [signature, setSignature] = useState("")
  const [isUserNotFoundByWalletAuth, setIsUserNotFoundByWalletAuth] =
    useState(false)

  const resetAuthVariant = () => {
    setIsUserNotFoundByMailLogin(false)
    setIsUserNotFoundByWalletAuth(false)
  }

  return (
    <div className="id_crypton_auth">
      <IdIcon className="id_crypton_logo" />

      {isUserNotFoundByMailLogin ? (
        <>
          <h2 className="id_crypton_title">Регистрация</h2>

          <EmailRegister
            emailInput={emailInput}
            refetchAfterSuccessAuth={refetchAfterSuccessAuth}
          />

          <Divider />

          <button className="id_crypton_reset_auth" onClick={resetAuthVariant}>
            Выбрать другой способ входа
          </button>
        </>
      ) : isUserNotFoundByWalletAuth ? (
        <>
          <h2 className="id_crypton_title">Регистрация</h2>

          <WalletRegister
            signature={signature}
            refetchAfterSuccessAuth={refetchAfterSuccessAuth}
          />

          <Divider />

          <button className="id_crypton_reset_auth" onClick={resetAuthVariant}>
            Выбрать другой способ входа
          </button>
        </>
      ) : (
        <>
          <h2 className="id_crypton_title">Вход в Crypton</h2>

          <AuthVariants
            setSignature={setSignature}
            setIsUserNotFoundByWalletAuth={setIsUserNotFoundByWalletAuth}
            refetchAfterSuccessAuth={refetchAfterSuccessAuth}
          />

          <Divider />

          <EmailLogin
            emailInput={emailInput}
            setEmailInput={setEmailInput}
            setIsUserNotFoundByMailLogin={setIsUserNotFoundByMailLogin}
            refetchAfterSuccessAuth={refetchAfterSuccessAuth}
          />
        </>
      )}
    </div>
  )
}

export default AuthContainer
