import React, { ButtonHTMLAttributes } from "react"

import { cn } from "@/lib/classNames"
import { buttonVariants } from "./Button"

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
