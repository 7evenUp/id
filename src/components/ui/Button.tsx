import React, { ButtonHTMLAttributes } from "react"
import { cn } from "../../lib/classNames"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <button
        className={cn(
          "typography-btn-big px-[10px] py-[3px] border border-gray-1 rounded-full text-gray-1 hover:bg-gray-1 hover:text-white active:bg-opacity-80 transition-colors",
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
