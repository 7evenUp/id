import { useRef, useState } from "react"
import { motion, useMotionValue, animate } from "framer-motion"

import Text0 from "@/shared/typography/Text0"

import Button from "@/shared/ui/Button"

import { cn } from "@/lib/classNames"

import styles from "./styles.module.css"
import { generateAnimation } from "./generateAnimation"
import { prizes } from "./prizes"

const Scroller = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const [wonPrizes, setWonPrizes] = useState<JSX.Element | null>(null)

  const x = useMotionValue(0)

  const onOpenClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    animate(x, 0)

    setTimeout(() => {
      const randInt = 2957
      setWonPrizes(
        generateAnimation(30, { color: "blue", numberInContainer: 5 }, prizes)
      )
      animate(x, -randInt, {
        duration: 7,
        ease: "circOut",
      })
    }, 700)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Text0>Всего открытий боксов: 4</Text0>
        <div className="flex items-center gap-8">
          <Text0>Осталось открытий боксов: 2</Text0>
          <Button>получить больше</Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-10 h-80 bg-[#4B4B4B]/[16%] rounded-xl">
        <div
          className={cn(styles.mask, "relative w-full py-4 overflow-hidden")}
        >
          <motion.div
            style={{ x }}
            ref={scrollRef}
            className="flex gap-4 w-fit -translate-x-1/2 ml-[50%]"
          >
            {wonPrizes}
          </motion.div>
          <RoundedTriangle className="absolute left-1/2 -translate-x-1/2 top-2" />
          <RoundedTriangle className="absolute left-1/2 -translate-x-1/2 rotate-180 bottom-2" />
        </div>
        <button
          className="text-sm flex items-center justify-center font-semibold h-10 px-6 rounded-[10px] bg-[#FFE19D] text-gray-1"
          onClick={onOpenClick}
        >
          Крутить рулетку
        </button>
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
    className={className}
  >
    <path
      d="M11.4019 22.5C12.5566 24.5 15.4434 24.5 16.5981 22.5L26.9904 4.5C28.1451 2.5 26.7017 0 24.3923 0H3.60769C1.29829 0 -0.145082 2.5 1.00962 4.5L11.4019 22.5Z"
      fill="url(#paint0_radial_471_993)"
    />
    <defs>
      <radialGradient
        id="paint0_radial_471_993"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(14 25.8545) rotate(-90) scale(26.6727 25.2121)"
      >
        <stop stopColor="#FFEFCB" />
        <stop offset="1" stopColor="#FFE19D" />
      </radialGradient>
    </defs>
  </svg>
)
