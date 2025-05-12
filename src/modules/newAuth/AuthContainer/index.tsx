import { useState } from "react"

import AuthVariants from "./components/AuthVariants"
import Divider from "./components/Divider"
import EmailLogin from "./components/EmailLogin"
import EmailRegister from "./components/EmailRegister"
import IdIcon from "./components/Icons/ID"

import "./styles.css"

const AuthContainer = () => {
  const [emailInput, setEmailInput] = useState("")
  const [isUserNotFoundByMailLogin, setIsUserNotFoundByMailLogin] =
    useState(false)

  const resetAuthVariant = () => {
    setIsUserNotFoundByMailLogin(false)
  }

  return (
    <div className="id_crypton_auth">
      <IdIcon className="id_crypton_logo" />

      {isUserNotFoundByMailLogin ? (
        <>
          <h2 className="id_crypton_title">Регистрация</h2>

          <EmailRegister emailInput={emailInput} />

          <Divider />

          <button className="id_crypton_reset_auth" onClick={resetAuthVariant}>
            Выбрать другой способ входа
          </button>
        </>
      ) : (
        <>
          <h2 className="id_crypton_title">Вход в Crypton</h2>

          <AuthVariants />

          <Divider />

          <EmailLogin
            emailInput={emailInput}
            setEmailInput={setEmailInput}
            setIsUserNotFoundByMailLogin={setIsUserNotFoundByMailLogin}
          />
        </>
      )}
    </div>
  )
}

export default AuthContainer
