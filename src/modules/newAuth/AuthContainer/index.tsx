import { useState } from "react"

import AuthVariants from "./components/AuthVariants"
import Divider from "./components/Divider"
import EmailLogin from "./components/EmailLogin"
import IdIcon from "./components/Icons/ID"

import "./styles.css"

const AuthContainer = () => {
  const [emailInput, setEmailInput] = useState("")
  const [isUserNotFoundByMailLogin, setIsUserNotFoundByMailLogin] =
    useState(false)

  return (
    <div className="id_crypton_auth">
      <IdIcon className="id_crypton_logo" />

      {isUserNotFoundByMailLogin ? (
        <>
          <h2 className="id_crypton_title">Register</h2>
        </>
      ) : (
        <>
          <h2 className="id_crypton_title">Sign in to Crypton</h2>

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
