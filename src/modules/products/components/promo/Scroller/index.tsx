import { useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  animate,
  useMotionValueEvent,
} from "motion/react"

import { generateAnimation } from "./generateAnimation"

import Text0 from "@/shared/typography/Text0"

import Button from "@/shared/ui/Button"
import { Skeleton } from "@/shared/ui/Skeleton"

import {
  useGetContainersQuery,
  useOpenContainerMutation,
} from "@/redux/api/crypton-events"
import { useUserProfileQuery } from "@/redux/api/profile"

import { getRandomInteger } from "@/utils/getRandomInteger"
import { Sound } from "@/utils/sound"

import { cn } from "@/lib/classNames"
import { toast } from "sonner"

const PRIZE_WIDTH = 136
const GAP_BETWEEN_PRIZES = 16
const PRIZE_WIDTH_WITH_GAP = PRIZE_WIDTH + GAP_BETWEEN_PRIZES
const ANIMATION_DURATION_IN_SEC = 8
const AMOUNT_OF_GENERATED_PRIZES = 50

const clickWheelSound = new Sound("./sounds/click_wheel.mp3")

const Scroller = () => {
  const itemPassedRef = useRef(0)

  const [wonPrizes, setWonPrizes] = useState<JSX.Element | null>(null)

  const { data: profile } = useUserProfileQuery()
  const { data: containerData, isLoading } = useGetContainersQuery()
  const [openContainer] = useOpenContainerMutation()

  const { promoBoxAvailableOpensNumber } = profile!

  const x = useMotionValue(0)

  useMotionValueEvent(x, "change", (currentX) => {
    const itemPassed = Math.floor(Math.abs(currentX) / PRIZE_WIDTH_WITH_GAP)

    if (itemPassed === itemPassedRef.current) return

    clickWheelSound.play()

    itemPassedRef.current = itemPassed
  })

  useEffect(() => {
    if (
      !containerData ||
      containerData.containers.length === 0 ||
      containerData.containers[0].prizes.length === 0
    )
      return

    const randInt = getRandomInteger(5940, 6050)

    x.set(-randInt)

    setWonPrizes(
      generateAnimation(
        AMOUNT_OF_GENERATED_PRIZES,
        { color: "blue", numberInContainer: 5 },
        containerData.containers[0].prizes
      )
    )
  }, [containerData])

  const onOpenClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    if (
      !containerData ||
      containerData.containers.length === 0 ||
      containerData.containers[0].prizes.length === 0
    )
      return

    try {
      await Promise.all([clickWheelSound.load()])
      
      toast.success("Звук загружен")

      x.jump(0)

      // Рандомная позиция по координате x, чтобы перекрестие упало на 40-ой элемент
      const randInt = getRandomInteger(5940, 6050)

      setWonPrizes(
        generateAnimation(
          AMOUNT_OF_GENERATED_PRIZES,
          { color: "red", numberInContainer: 5 },
          containerData.containers[0].prizes
        )
      )

      animate(x, -randInt, {
        duration: ANIMATION_DURATION_IN_SEC,
        ease: [0, 1.01, 0.73, 1],
      })
    } catch {
      toast.error("Не получилось загрузить звук")
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Text0>Всего открытий боксов: 4</Text0>
        <div className="flex items-center gap-8">
          <Text0>
            Осталось открытий боксов: {promoBoxAvailableOpensNumber}
          </Text0>
          <Button>получить больше</Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-10 h-80 bg-gray-5/25 dark:bg-[#4B4B4B]/[16%] rounded-xl">
        <div className="relative w-full py-4 overflow-hidden">
          {isLoading ? (
            <PrizesSkeleton />
          ) : (
            <motion.div style={{ x }} className="flex gap-4 w-fit ml-[50%]">
              {wonPrizes}
            </motion.div>
          )}
          <RoundedTriangle className="absolute left-1/2 -translate-x-1/2 top-2" />
          <RoundedTriangle className="absolute left-1/2 -translate-x-1/2 rotate-180 bottom-2" />
        </div>

        {isLoading ? (
          <Skeleton className="rounded-[10px] h-10 w-44" />
        ) : (
          <button
            className="text-sm flex items-center justify-center font-semibold h-10 px-6 rounded-[10px] bg-[#FFE19D] text-gray-1 hover:shadow-[0_1px_2px_0_rgba(0,0,0,0.3),_0_1px_3px_1px_rgba(0,0,0,0.15)] active:shadow-none transition-all duration-100 hover:bg-[#f5d383] active:bg-[#ecc76f]"
            onClick={onOpenClick}
          >
            Крутить рулетку
          </button>
        )}
      </div>
    </div>
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
  <div className="flex gap-4 w-fit ml-[50%]">
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
    <Skeleton className="w-[136px] h-[136px] rounded-xl" />
  </div>
)
