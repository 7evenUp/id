import { useState } from "react"

import BalanceModal from "../Balance"

import FirstStep from "./FirstStep"
import SecondStep from "./SecondStep"
import ThirdStep from "./ThirdStep"

import { Dialog } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"
import { useSubscriptionsQuery } from "@/redux/api/subscription"

const SubscriptionMain = ({ triggerText }: { triggerText: string }) => {
  const [firstStepOpened, setFirstStepOpened] = useState(false)
  const [secondStepOpened, setSecondStepOpened] = useState(false)
  const [thirdStepOpened, setThirdStepOpened] = useState(false)
  const [balanceOpened, setBalanceOpened] = useState(false)

  const { data: subsData } = useSubscriptionsQuery()

  if (!subsData) return null

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
      <Button onClick={openFirstStep}>{triggerText}</Button>

      <FirstStep
        open={firstStepOpened}
        onOpenChange={setFirstStepOpened}
        openBalanceModal={openBalanceModal}
        openSecondStep={openSecondStep}
        subscriptions={subsData.results}
      />

      <SecondStep
        open={secondStepOpened}
        onOpenChange={setSecondStepOpened}
        openThirdStep={openThirdStep}
      />

      <ThirdStep open={thirdStepOpened} onOpenChange={setThirdStepOpened} />

      <Dialog open={balanceOpened} onOpenChange={setBalanceOpened}>
        <BalanceModal />
      </Dialog>
    </>
  )
}

export default SubscriptionMain
