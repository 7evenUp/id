import Button from "../Button"
import Apple from "../Icons/Apple"

import Google from "../Icons/Google"
import Web3 from "../Icons/Web3"

import "./styles.css"

const AuthVariants = () => {
  return (
    <div className="id_crypton_auth_buttons">
      <Button>
        <Web3 />
        Continue with Wallet
      </Button>
      <Button>
        <Google />
        Continue with Google
      </Button>
      <Button>
        <Apple />
        Continue with Apple
      </Button>
    </div>
  )
}

export default AuthVariants
