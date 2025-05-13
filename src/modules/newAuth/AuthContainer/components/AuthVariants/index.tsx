import WalletButton from "./WalletButton"
import GoogleButton from "./GoogleButton"
import AppleButton from "./AppleButton"

import "./styles.css"

const AuthVariants = () => {
  return (
    <div className="id_crypton_auth_buttons">
      <WalletButton />
      <GoogleButton />
      <AppleButton />
    </div>
  )
}

export default AuthVariants
