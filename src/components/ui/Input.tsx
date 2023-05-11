import React, { InputHTMLAttributes } from "react"

import { cn } from "@/lib/classNames"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <input
        className={cn(
          "typography-text-1 text-gray-1 dark:text-gray-5 outline-none bg-transparent border-b border-gray-1 dark:border-gray-3 focus:border-gray-4 dark:focus:border-gray-4 dark:placeholder:text-gray-3 py-1",
          className
        )}
        {...props}
        ref={forwardedRef}
      />
    )
  }
)

export default Input
