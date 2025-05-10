import { useState } from "react"

import AuthVariants from "./components/AuthVariants"
import Divider from "./components/Divider"
import EmailLogin from "./components/EmailLogin"
import IdIcon from "./components/Icons/ID"

import "./styles.css"

const AuthContainer = () => {
  const [emailInput, setEmailInput] = useState("")

  return (
    <div className="id_crypton_auth">
      <IdIcon className="id_crypton_logo" />

      <h2 className="id_crypton_title">Sign in to Crypton</h2>

      <AuthVariants />

      <Divider />

      <EmailLogin emailInput={emailInput} setEmailInput={setEmailInput} />
    </div>
  )
}

export default AuthContainer
