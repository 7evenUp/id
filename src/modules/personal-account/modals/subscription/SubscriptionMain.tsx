import { ReactNode, useState } from "react"

import BalanceModal from "../Balance"

import FirstStep from "./FirstStep"
import SecondStep from "./SecondStep"
import ThirdStep from "./ThirdStep"

import { Dialog } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"

import { useSubscriptionsQuery } from "@/redux/api/subscription"

const SubscriptionMain = ({
  triggerText,
  customTrigger,
}: {
  triggerText?: string
  customTrigger?: ReactNode
}) => {
  const [firstStepOpened, setFirstStepOpened] = useState(false)
  const [secondStepOpened, setSecondStepOpened] = useState(false)
  const [thirdStepOpened, setThirdStepOpened] = useState(false)
  const [balanceOpened, setBalanceOpened] = useState(false)

  const [boughtSubDuration, setBoughtSubDuration] = useState(0)

  const { data: subscriptions } = useSubscriptionsQuery()

  if (!subscriptions) return null

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
      {customTrigger ? (
        <button className="absolute left-full top-0" onClick={openFirstStep}>
          {customTrigger}
        </button>
      ) : (
        <Button onClick={openFirstStep}>{triggerText}</Button>
      )}

      <FirstStep
        open={firstStepOpened}
        onOpenChange={setFirstStepOpened}
        openBalanceModal={openBalanceModal}
        openSecondStep={openSecondStep}
        subscriptions={subscriptions.filter((sub) => sub.kind === 1)}
        setBoughtSubDuration={setBoughtSubDuration}
      />

      <SecondStep
        open={secondStepOpened}
        onOpenChange={setSecondStepOpened}
        openThirdStep={openThirdStep}
        boughtSubDuration={boughtSubDuration}
      />

      <ThirdStep open={thirdStepOpened} onOpenChange={setThirdStepOpened} />

      <Dialog open={balanceOpened} onOpenChange={setBalanceOpened}>
        <BalanceModal />
      </Dialog>
    </>
  )
}

export default SubscriptionMain
