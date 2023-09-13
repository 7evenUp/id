import React, { ButtonHTMLAttributes } from "react"

import { buttonVariants } from "./Button"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const Chip = React.forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, forwardedRef) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <button
      className={cn(
        buttonVariants({ appearence: "outlined" }),
        "rounded-md py-1 px-2.5",
        scale &&
          "3xl:text-[0.911vw]/[0.911vw] 3xl:rounded-[0.391vw] 3xl:py-[0.26vw] 3xl:px-[0.651vw]",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </button>
  )
})
Chip.displayName = "Chip"

export default Chip
