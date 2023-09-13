import React, { ButtonHTMLAttributes } from "react"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const IconButton = React.forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, forwardedRef) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <button
      className={cn(
        "rounded-full w-5 h-5 flex justify-center items-center",
        scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]",
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
