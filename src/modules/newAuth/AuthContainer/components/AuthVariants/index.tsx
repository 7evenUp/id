import { Dispatch, SetStateAction } from "react"

import WalletButton from "./WalletButton"
import GoogleButton from "./GoogleButton"
// import AppleButton from "./AppleButton"

import "./styles.css"

const AuthVariants = ({
  setSignature,
  setIsUserNotFoundByWalletAuth,
  refetchAfterSuccessAuth,
}: {
  setSignature: Dispatch<SetStateAction<string>>
  setIsUserNotFoundByWalletAuth: Dispatch<SetStateAction<boolean>>
  refetchAfterSuccessAuth: VoidFunction
}) => {
  return (
    <div className="id_crypton_auth_buttons">
      <WalletButton
        setSignature={setSignature}
        setIsUserNotFoundByWalletAuth={setIsUserNotFoundByWalletAuth}
        refetchAfterSuccessAuth={refetchAfterSuccessAuth}
      />
      <GoogleButton />
      {/* <AppleButton /> */}
    </div>
  )
}

export default AuthVariants
