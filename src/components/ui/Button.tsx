import React, { ButtonHTMLAttributes } from "react"
import { cn } from "../../lib/classNames"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <button
        className={cn(
          "px-[10px] py-[3px] border border-gray-1 rounded-full text-sm leading-[14px] text-gray-1 hover:bg-gray-1 hover:text-white transition-colors",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </button>
    )
  }
)

export default Button
