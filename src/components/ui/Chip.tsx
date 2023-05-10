import React, { ButtonHTMLAttributes } from "react"

import { buttonVariants } from "./Button"

import { cn } from "@/lib/classNames"

const Chip = React.forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <button
      className={cn(
        buttonVariants({ appearence: "outlined" }),
        "rounded-md py-1 px-2.5",
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
