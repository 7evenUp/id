import { useState } from "react"

import Button from "@/shared/ui/Button"

import WithdrawMain from "./WithdrawMain"
import WithdrawWallet from "./WithdrawWallet"

const ReferralWithdraw = ({ triggerText }: { triggerText: string }) => {
  const [isMainOpened, setIsMainOpened] = useState(false)
  const [isWalletOpened, setIsWalletOpened] = useState(false)

  const openMain = () => {
    setIsMainOpened(true)
    setIsWalletOpened(false)
  }

  const openWallet = () => {
    setIsMainOpened(false)
    setIsWalletOpened(true)
  }

  const closeWalletModal = () => {
    setIsWalletOpened(false)
  }

  return (
    <>
      <Button onClick={() => setIsMainOpened(true)}>{triggerText}</Button>

      <WithdrawMain
        open={isMainOpened}
        onOpenChange={setIsMainOpened}
        openWallet={openWallet}
      />

      <WithdrawWallet
        open={isWalletOpened}
        onOpenChange={setIsWalletOpened}
        openMain={openMain}
        close={closeWalletModal}
      />
    </>
  )
}

export default ReferralWithdraw
