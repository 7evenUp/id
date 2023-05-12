import { useState } from "react"

import { FirstStepModal, SecondStepModal, ThirdStepModal } from "./modals"
import BalanceModal from "../BalanceModal"

import { Dialog } from "@/components/ui/Dialog"
import Button from "@/components/ui/Button"

const SubscriptionMainModal = () => {
  const [firstStepOpened, setFirstStepOpened] = useState(false)
  const [secondStepOpened, setSecondStepOpened] = useState(false)
  const [thirdStepOpened, setThirdStepOpened] = useState(false)
  const [balanceOpened, setBalanceOpened] = useState(false)

  const openFirstStep = () => {
    setFirstStepOpened(true)
  }

  const openBalanceModal = () => {
    setFirstStepOpened(false)
    setBalanceOpened(true)
  }

  const openSecondStep = () => {
    setFirstStepOpened(false)
    setSecondStepOpened(true)
  }

  const openThirdStep = () => {
    setSecondStepOpened(false)
    setThirdStepOpened(true)
  }

  return (
    <>
      <Button onClick={openFirstStep}>продлить</Button>

      <FirstStepModal
        open={firstStepOpened}
        onOpenChange={setFirstStepOpened}
        openBalanceModal={openBalanceModal}
        openSecondStep={openSecondStep}
      />

      <SecondStepModal
        open={secondStepOpened}
        onOpenChange={setSecondStepOpened}
        openThirdStep={openThirdStep}
      />

      <ThirdStepModal
        open={thirdStepOpened}
        onOpenChange={setThirdStepOpened}
      />

      <Dialog open={balanceOpened} onOpenChange={setBalanceOpened}>
        <BalanceModal />
      </Dialog>
    </>
  )
}

export default SubscriptionMainModal
