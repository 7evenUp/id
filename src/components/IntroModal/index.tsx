import { useEffect, useState } from "react"

import Phase1 from "./Phase1"
import Phase2 from "./Phase2"
import Phase3 from "./Phase3"
import Phase4 from "./Phase4"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useHidePrimeInstructionMutation } from "@/redux/api/user"

const IntroModal = () => {
  const [firstPhaseOpened, setFirstPhaseOpened] = useState(false)
  const [secondPhaseOpened, setSecondPhaseOpened] = useState(false)
  const [thirdPhaseOpened, setThirdPhaseOpened] = useState(false)
  const [forthPhaseOpened, setForthPhaseOpened] = useState(false)

  const { data: profileData } = useUserProfileQuery()
  const [hidePrimeInstruction] = useHidePrimeInstructionMutation()

  const {
    subscriptionInfo: { status, subscriptionType },
    isPrimeInstructionShown,
  } = profileData!

  const openFirstPhase = () => {
    setFirstPhaseOpened(true)
    setSecondPhaseOpened(false)
  }

  const openSecondPhase = () => {
    setFirstPhaseOpened(false)
    setSecondPhaseOpened(true)
    setThirdPhaseOpened(false)
  }

  const openThirdPhase = () => {
    setSecondPhaseOpened(false)
    setThirdPhaseOpened(true)
    setForthPhaseOpened(false)
  }

  const openForthPhase = () => {
    setThirdPhaseOpened(false)
    setForthPhaseOpened(true)
  }

  const closeModals = (forever?: boolean) => {
    setFirstPhaseOpened(false)
    setSecondPhaseOpened(false)
    setThirdPhaseOpened(false)
    setForthPhaseOpened(false)

    if (forever) {
      hidePrimeInstruction()
    }
  }

  useEffect(() => {
    if (!isPrimeInstructionShown) {
      setTimeout(() => {
        if (status === "ACTIVE" && subscriptionType === "Prime") {
          setFirstPhaseOpened(true)
        }
      }, 1000)
    }
  }, [])

  if (isPrimeInstructionShown) return null

  return (
    <>
      <Phase1
        open={firstPhaseOpened}
        onOpenChange={setFirstPhaseOpened}
        openSecondPhase={openSecondPhase}
        close={closeModals}
      />

      <Phase2
        open={secondPhaseOpened}
        onOpenChange={setSecondPhaseOpened}
        openThirdPhase={openThirdPhase}
        openFirstPhase={openFirstPhase}
        close={closeModals}
      />

      <Phase3
        open={thirdPhaseOpened}
        onOpenChange={setThirdPhaseOpened}
        openSecondPhase={openSecondPhase}
        openForthPhase={openForthPhase}
        close={closeModals}
      />

      <Phase4
        open={forthPhaseOpened}
        onOpenChange={setForthPhaseOpened}
        openThirdPhase={openThirdPhase}
        close={closeModals}
      />
    </>
  )
}

export default IntroModal
