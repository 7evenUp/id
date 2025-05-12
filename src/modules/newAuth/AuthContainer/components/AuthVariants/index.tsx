import Button from "../../shared/Button"

import Apple from "../Icons/Apple"
import Google from "../Icons/Google"
import Web3 from "../Icons/Web3"

import "./styles.css"

const AuthVariants = () => {
  return (
    <div className="id_crypton_auth_buttons">
      <Button>
        <Web3 />
        Продолжить с Wallet
      </Button>
      <Button>
        <Google />
        Продолжить с Google
      </Button>
      <Button>
        <Apple />
        Продолжить с Apple
      </Button>
    </div>
  )
}

export default AuthVariants
