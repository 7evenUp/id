import { Dispatch, SetStateAction } from "react"

import WalletButton from "./WalletButton"
import GoogleButton from "./GoogleButton"
// import AppleButton from "./AppleButton"

import "./styles.css"

const AuthVariants = ({
  setSignature,
  setIsUserNotFoundByWalletAuth,
}: {
  setSignature: Dispatch<SetStateAction<string>>
  setIsUserNotFoundByWalletAuth: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div className="id_crypton_auth_buttons">
      <WalletButton
        setSignature={setSignature}
        setIsUserNotFoundByWalletAuth={setIsUserNotFoundByWalletAuth}
      />
      <GoogleButton />
      {/* <AppleButton /> */}
    </div>
  )
}

export default AuthVariants
