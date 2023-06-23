import React, { ButtonHTMLAttributes } from "react"

import { cn } from "@/lib/classNames"

const IconButton = React.forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <button
      className={cn(
        "rounded-full w-5 h-5 2xl:w-[1.302vw] 2xl:h-[1.302vw] flex justify-center items-center",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </button>
  )
})
IconButton.displayName = "IconButton"

export default IconButton
