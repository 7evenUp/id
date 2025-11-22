import { useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  animate,
  useMotionValueEvent,
} from "motion/react"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"

import Loader from "@/assets/icons/loader.svg?react"
// import Plus from "@/assets/icons/plus.svg?react"

import { generateAnimation } from "./generateAnimation"
import WinDialog from "./WinDialog"

// import SubscriptionMain from "@/modules/personal-account/modals/subscription/SubscriptionMain"

import Text0 from "@/shared/typography/Text0"

// import Button from "@/shared/ui/Button"
import { Skeleton } from "@/shared/ui/Skeleton"

import { useAppSelector } from "@/redux/hooks"
import {
  useGetContainersQuery,
  useMakeFreeSpinMutation,
  useOpenContainerMutation,
} from "@/redux/api/crypton-events"
import { useUserProfileQuery } from "@/redux/api/profile"

import { Sound } from "@/utils/sound"

import { cn } from "@/lib/classNames"

const PRIZE_WIDTH = 136
const GAP_BETWEEN_PRIZES = 16
const PRIZE_WIDTH_WITH_GAP = PRIZE_WIDTH + GAP_BETWEEN_PRIZES
const ANIMATION_DURATION_IN_SEC = 8
const AMOUNT_OF_GENERATED_PRIZES = 50
const MIDDLE_X_POSITION = 5996

const clickWheelSound = new Sound("./sounds/click_wheel.mp3")

const Scroller = () => {
  const { t } = useTranslation("products")

  const itemPassedRef = useRef(0)

  const [wonPrizes, setWonPrizes] = useState<JSX.Element | null>(null)
  const [soundLoaded, setSoundLoaded] = useState(false)
  const [animationStarted, setAnimationStarted] = useState(false)
  const [winOpened, setWinOpened] = useState(false)
  const [isOpenLocked, setIsOpenLocked] = useState(false)

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profile } = useUserProfileQuery()
  const { data: containerData, isLoading } = useGetContainersQuery()
  const [openContainer, { data: winData, isLoading: isOpenLoading }] =
    useOpenContainerMutation()
  const [makeFreeSpin, { isLoading: isFreeSpinLoading }] =
    useMakeFreeSpinMutation()

  const { promoBoxAvailableOpensNumber, totalOpenedPromoBox, isFreeSpinUsed } =
    profile!

  const x = useMotionValue(0)

  useEffect(() => {
    Promise.all([clickWheelSound.load()]).then(() => {
      setSoundLoaded(true)
    })
  }, [])

  useMotionValueEvent(x, "change", (currentX) => {
    const itemPassed = Math.floor(Math.abs(currentX) / PRIZE_WIDTH_WITH_GAP)

    if (itemPassed === itemPassedRef.current) return

    if (soundLoaded && animationStarted) clickWheelSound.play()

    itemPassedRef.current = itemPassed
  })

  useMotionValueEvent(x, "animationComplete", () => {
    setAnimationStarted(false)
  })

  useEffect(() => {
    if (
      !containerData ||
      containerData.containers.length === 0 ||
      containerData.containers[0].prizes.length === 0
    )
      return

    setWonPrizes(
      generateAnimation(
        AMOUNT_OF_GENERATED_PRIZES,
        containerData.containers[0].prizes[0].prize,
        containerData.containers[0].prizes
      )
    )

    x.set(-MIDDLE_X_POSITION)
  }, [containerData])

  const onOpenClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    if (isOpenLoading || isOpenLocked) return

    if (
      !containerData ||
      containerData.containers.length === 0 ||
      containerData.containers[0].prizes.length === 0
    )
      return

    if (soundLoaded) clickWheelSound.play(0)

    try {
      const winResult = await openContainer({
        containerId: containerData.containers[0].id,
      }).unwrap()

      setIsOpenLocked(true)

      x.jump(0)

      setWonPrizes(
        generateAnimation(
          AMOUNT_OF_GENERATED_PRIZES,
          winResult.prize,
          containerData.containers[0].prizes
        )
      )

      setAnimationStarted(true)

      animate(x, -MIDDLE_X_POSITION, {
        duration: ANIMATION_DURATION_IN_SEC,
        ease: [0, 1.01, 0.73, 1],
      })

      setTimeout(
        () => {
          setWinOpened(true)
          setIsOpenLocked(false)
        },
        ANIMATION_DURATION_IN_SEC * 1000 + 200
      )
    } catch (error) {
      // @ts-expect-error NO_RTKQ_ERROR_TYPES
      if (error.status === 400) {
        // @ts-expect-error NO_RTKQ_ERROR_TYPES
        if (error.data.code === "not_enough_available_open_box_attempts") {
          toast.error(t("Недостаточно ключей для лутбокса"))
        } else {
          toast.error(t("Не удалось открыть бокс"))
        }
      }
      // @ts-expect-error NO_RTKQ_ERROR_TYPES
      else if (error.status === 429) {
        toast.error("Слишком много запросов. Пожалуйста, попробуйте позже")
      } else {
        toast.error(t("Не удалось открыть бокс"))
      }
    }
  }

  const onFreeSpinClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    if (isFreeSpinLoading || isOpenLocked) return

    if (
      !containerData ||
      containerData.containers.length === 0 ||
      containerData.containers[0].prizes.length === 0
    )
      return

    if (soundLoaded) clickWheelSound.play(0)

    try {
      const winResult = await makeFreeSpin().unwrap()

      setIsOpenLocked(true)

      x.jump(0)

      setWonPrizes(
        generateAnimation(
          AMOUNT_OF_GENERATED_PRIZES,
          winResult.prize,
          containerData.containers[0].prizes
        )
      )

      setAnimationStarted(true)

      animate(x, -MIDDLE_X_POSITION, {
        duration: ANIMATION_DURATION_IN_SEC,
        ease: [0, 1.01, 0.73, 1],
      })

      setTimeout(
        () => {
          setWinOpened(true)
          setIsOpenLocked(false)
        },
        ANIMATION_DURATION_IN_SEC * 1000 + 200
      )
    } catch (error) {
      // @ts-expect-error NO_RTKQ_ERROR_TYPES
      if (error.status === 400) {
        // @ts-expect-error NO_RTKQ_ERROR_TYPES
        if (error.data.code === "not_enough_available_open_box_attempts") {
          toast.error(t("Недостаточно ключей для лутбокса"))
        } else {
          toast.error(t("Не удалось открыть бокс"))
        }
      }
      // @ts-expect-error NO_RTKQ_ERROR_TYPES
      else if (error.status === 429) {
        toast.error("Слишком много запросов. Пожалуйста, попробуйте позже")
      } else {
        toast.error(t("Не удалось открыть бокс"))
      }
    }
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between lg:flex-col lg:items-start xl:flex-row xl:items-center">
          <Text0>
            {t("Всего открытий боксов:")} {totalOpenedPromoBox}
          </Text0>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-8">
            <Text0>
              {t("Осталось открытий боксов:")} {promoBoxAvailableOpensNumber}
            </Text0>
            {/* <SubscriptionMain>
              <Button className="w-fit" appearence="inverted">
                {t("получить больше")} <Plus className="w-5 h-5" />
              </Button>
            </SubscriptionMain> */}
          </div>
        </div>

        <div className="flex h-80 flex-col items-center justify-center gap-10 rounded-xl bg-gray-5/25 dark:bg-[#4B4B4B]/[16%]">
          <div className="relative w-full overflow-hidden py-4">
            {isLoading ? (
              <PrizesSkeleton />
            ) : (
              <motion.div style={{ x }} className="ml-[50%] flex w-fit gap-4">
                {wonPrizes}
              </motion.div>
            )}
            <RoundedTriangle className="absolute left-1/2 top-2 -translate-x-1/2" />
            <RoundedTriangle className="absolute bottom-2 left-1/2 -translate-x-1/2 rotate-180" />
          </div>

          <div className="flex flex-col items-center gap-1">
            {isLoading ? (
              <Skeleton className="h-10 w-44 rounded-[10px]" />
            ) : !isFreeSpinUsed ? (
              <button
                className={cn(
                  "flex h-10 items-center justify-center gap-2 rounded-[10px] bg-[#FFE19D] px-6 text-sm font-semibold text-gray-1 transition-all duration-100 hover:bg-[#f5d383] hover:shadow-[0_1px_2px_0_rgba(0,0,0,0.3),_0_1px_3px_1px_rgba(0,0,0,0.15)] active:bg-[#ecc76f] active:shadow-none disabled:pointer-events-none",
                  isOpenLocked && "animate-pulse duration-1000"
                )}
                onClick={onFreeSpinClick}
              >
                {isFreeSpinLoading && (
                  <Loader
                    className={cn(
                      "h-3.5 w-3.5 animate-spin",
                      scale && "3xl:h-[0.911vw] 3xl:w-[0.911vw]"
                    )}
                  />
                )}
                Фри спин
              </button>
            ) : (
              <button
                className={cn(
                  "flex h-10 items-center justify-center gap-2 rounded-[10px] bg-[#FFE19D] px-6 text-sm font-semibold text-gray-1 transition-all duration-100 hover:bg-[#f5d383] hover:shadow-[0_1px_2px_0_rgba(0,0,0,0.3),_0_1px_3px_1px_rgba(0,0,0,0.15)] active:bg-[#ecc76f] active:shadow-none disabled:pointer-events-none",
                  isOpenLocked && "animate-pulse duration-1000",
                  promoBoxAvailableOpensNumber <= 0 && "opacity-50"
                )}
                onClick={onOpenClick}
                disabled={promoBoxAvailableOpensNumber <= 0 || isOpenLocked}
              >
                {isOpenLoading && (
                  <Loader
                    className={cn(
                      "h-3.5 w-3.5 animate-spin",
                      scale && "3xl:h-[0.911vw] 3xl:w-[0.911vw]"
                    )}
                  />
                )}
                {isOpenLocked ? t("Крутим-крутим...") : t("Крутить рулетку")}
              </button>
            )}

            {!isFreeSpinUsed && "Доступен фри спин"}
          </div>
        </div>
      </div>
      <WinDialog open={winOpened} onOpenChange={setWinOpened} data={winData} />
    </>
  )
}

export default Scroller

const RoundedTriangle = ({ className }: { className: string }) => (
  <svg
    width="28"
    height="24"
    viewBox="0 0 28 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("drop-shadow-[0_0_1px_rgba(0,0,0,0.3)]", className)}
  >
    <path
      d="M11.4019 22.5C12.5566 24.5 15.4434 24.5 16.5981 22.5L26.9904 4.5C28.1451 2.5 26.7017 0 24.3923 0H3.60769C1.29829 0 -0.145082 2.5 1.00962 4.5L11.4019 22.5Z"
      fill="#FFE19C"
    />
  </svg>
)

const PrizesSkeleton = () => (
  <div className="ml-[50%] flex w-fit -translate-x-1/2 gap-4">
    <Skeleton className="h-[136px] w-[136px] rounded-xl" />
    <Skeleton className="h-[136px] w-[136px] rounded-xl" />
    <Skeleton className="h-[136px] w-[136px] rounded-xl" />
    <Skeleton className="h-[136px] w-[136px] rounded-xl" />
    <Skeleton className="h-[136px] w-[136px] rounded-xl" />
    <Skeleton className="h-[136px] w-[136px] rounded-xl" />
    <Skeleton className="h-[136px] w-[136px] rounded-xl" />
    <Skeleton className="h-[136px] w-[136px] rounded-xl" />
    <Skeleton className="h-[136px] w-[136px] rounded-xl" />
    <Skeleton className="h-[136px] w-[136px] rounded-xl" />
    <Skeleton className="h-[136px] w-[136px] rounded-xl" />
    <Skeleton className="h-[136px] w-[136px] rounded-xl" />
    <Skeleton className="h-[136px] w-[136px] rounded-xl" />
    <Skeleton className="h-[136px] w-[136px] rounded-xl" />
    <Skeleton className="h-[136px] w-[136px] rounded-xl" />
  </div>
)
