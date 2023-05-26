import React from "react"

import { cn } from "@/lib/classNames"

const AuthInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>(({ className, ...props }, forwardedRef) => (
  <input
    className={cn(
      "bg-transparent border border-gray-1 rounded-md py-2 px-3 outline-none focus:border-res-bot-blue placeholder:text-xs aria-[invalid=true]:border-error",
      className
    )}
    ref={forwardedRef}
    {...props}
  />
))
AuthInput.displayName = "AuthInput"

export { AuthInput }
