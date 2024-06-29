import { useEffect, useState } from "react"

import BalanceModal from "../Balance"

import SelectSubscription from "./SelectSubscription"

import FirstStepCalendar from "./Calendar/FirstStep"
import SecondStepCalendar from "./Calendar/SecondStep"

import FirstStepPrime from "./Prime/FirstStep"
import SecondStep from "./Prime/SecondStep"
import ThirdStep from "./Prime/ThirdStep"

import { Dialog } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"
import { Skeleton } from "@/shared/ui/Skeleton"

import { useSubscriptionsQuery } from "@/redux/api/subscription"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const SubscriptionMain = ({ triggerText }: { triggerText?: string }) => {
  const [selectionOpened, setSelectionOpened] = useState(false)
  const [primeOpened, setPrimeOpened] = useState(false)
  const [calendarOpened, setCalendarOpened] = useState(false)
  const [secondStepCalendarOpened, setSecondStepCalendarOpened] =
    useState(false)
  const [secondStepOpened, setSecondStepOpened] = useState(false)
  const [thirdStepOpened, setThirdStepOpened] = useState(false)
  const [balanceOpened, setBalanceOpened] = useState(false)

  const [boughtSubDuration, setBoughtSubDuration] = useState(0)

  const scale = useAppSelector((state) => state.scale.value)

  const { data: subscriptions, isLoading } = useSubscriptionsQuery()

  useEffect(() => {
    const url = new URL(location.href)
    const openModalParam = url.searchParams.get("open_modal")

    if (!openModalParam) return

    if (openModalParam === "buy_prime") {
      setPrimeOpened(true)
    }

    if (openModalParam === "buy_calendar") {
      setCalendarOpened(true)
    }
  }, [])

  if (isLoading)
    return (
      <Skeleton
        className={cn(
          "w-[90px] h-[21px] rounded-full",
          scale && "3xl:w-[5.85vw] 3xl:h-[1.367vw]"
        )}
      />
    )

  if (!subscriptions) return null

  const openSelection = () => {
    setSelectionOpened(true)
    setPrimeOpened(false)
    setCalendarOpened(false)
  }

  const openPrime = () => {
    setSelectionOpened(false)
    setPrimeOpened(true)
  }

  const openCalendar = () => {
    setSelectionOpened(false)
    setCalendarOpened(true)
  }

  const openSecondStepCalendar = () => {
    setCalendarOpened(false)
    setSecondStepCalendarOpened(true)
  }

  const openBalanceModal = () => {
    setPrimeOpened(false)
    setCalendarOpened(false)
    setBalanceOpened(true)
  }

  const openSecondStep = () => {
    setPrimeOpened(false)
    setSecondStepOpened(true)
  }

  const openThirdStep = () => {
    setSecondStepOpened(false)
    setThirdStepOpened(true)
  }

  return (
    <>
      <Button onClick={openSelection}>{triggerText}</Button>

      <SelectSubscription
        open={selectionOpened}
        onOpenChange={setSelectionOpened}
        openPrime={openPrime}
        openCalendar={openCalendar}
      />

      <FirstStepCalendar
        open={calendarOpened}
        onOpenChange={setCalendarOpened}
        openSelection={openSelection}
        openBalanceModal={openBalanceModal}
        openSecondStep={openSecondStepCalendar}
        subscriptions={subscriptions.filter((sub) => sub.kindId === 2)}
        setBoughtSubDuration={setBoughtSubDuration}
      />

      <SecondStepCalendar
        open={secondStepCalendarOpened}
        onOpenChange={setSecondStepCalendarOpened}
        boughtSubDuration={boughtSubDuration}
      />

      <FirstStepPrime
        open={primeOpened}
        onOpenChange={setPrimeOpened}
        openSelection={openSelection}
        openBalanceModal={openBalanceModal}
        openSecondStep={openSecondStep}
        subscriptions={subscriptions.filter((sub) => sub.kindId === 1)}
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
