import React from "react"

import { cn } from "@/lib/classNames"

const AuthInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>(({ className, ...props }, forwardedRef) => (
  <input
    className={cn(
      "bg-transparent border border-gray-1 dark:border-white dark:text-white dark:placeholder:text-gray-5 rounded-md 2xl:rounded-[0.391vw] py-2 px-3 2xl:py-[0.521vw] 2xl:px-[0.781vw] outline-none focus:border-res-bot-blue dark:focus:border-res-bot-blue placeholder:text-xs 2xl:text-[1.042vw] 2xl:placeholder:text-[0.781vw] aria-[invalid=true]:border-error",
      className
    )}
    ref={forwardedRef}
    {...props}
  />
))
AuthInput.displayName = "AuthInput"

export { AuthInput }
