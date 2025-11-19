import { Dispatch, SetStateAction } from "react"

import WalletButton from "./WalletButton"
import GoogleButton from "./GoogleButton"
import TelegramButton from "./TelegramButton"
// import AppleButton from "./AppleButton"

import "./styles.css"

const AuthVariants = ({
  setSignature,
  setIsUserNotFoundByWalletAuth,
  setIsTelegramFlow,
}: {
  setSignature: Dispatch<SetStateAction<string>>
  setIsUserNotFoundByWalletAuth: Dispatch<SetStateAction<boolean>>
  setIsTelegramFlow: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div className="id_crypton_auth_buttons">
      <WalletButton
        setSignature={setSignature}
        setIsUserNotFoundByWalletAuth={setIsUserNotFoundByWalletAuth}
      />
      <GoogleButton />
      <TelegramButton setIsTelegramFlow={setIsTelegramFlow} />
      {/* <AppleButton /> */}
    </div>
  )
}

export default AuthVariants
