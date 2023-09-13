import React from "react"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const AuthInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>(({ className, ...props }, forwardedRef) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <input
      className={cn(
        "bg-transparent border border-gray-1 dark:border-white dark:text-white dark:placeholder:text-gray-5 rounded-md py-2 px-3 outline-none focus:border-res-bot-blue dark:focus:border-res-bot-blue placeholder:text-xs aria-[invalid=true]:border-error",
        scale &&
          "3xl:rounded-[0.391vw] 3xl:py-[0.521vw] 3xl:px-[0.781vw] 3xl:text-[1.042vw] 3xl:placeholder:text-[0.781vw]",
        className
      )}
      ref={forwardedRef}
      {...props}
    />
  )
})
AuthInput.displayName = "AuthInput"

export { AuthInput }
