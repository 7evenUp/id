import React from "react"

import { cn } from "@/lib/classNames"

const AuthInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>(({ className, children, ...props }, forwardedRef) => (
  <input
    className={cn(
      "bg-transparent border border-gray-1 rounded-md py-2 px-3 outline-none focus:border-res-bot-blue",
      className
    )}
    ref={forwardedRef}
    {...props}
  />
))
AuthInput.displayName = "AuthInput"

const AuthLabel = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<"label">
>(({ className, children, ...props }, forwardedRef) => (
  <label
    className={cn("group-focus-within:text-res-bot-blue text-sm", className)}
    ref={forwardedRef}
    {...props}
  >
    {children}
  </label>
))
AuthLabel.displayName = "AuthLabel"

export { AuthInput, AuthLabel }
