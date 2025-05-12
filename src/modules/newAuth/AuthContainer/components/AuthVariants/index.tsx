import GoogleButton from "./GoogleButton"

import Apple from "../Icons/Apple"
import Web3 from "../Icons/Web3"

import Button from "../../shared/Button"

import "./styles.css"

const AuthVariants = () => {
  return (
    <div className="id_crypton_auth_buttons">
      <Button>
        <Web3 />
        Продолжить с Wallet
      </Button>
      <GoogleButton />
      <Button>
        <Apple />
        Продолжить с Apple
      </Button>
    </div>
  )
}

export default AuthVariants
