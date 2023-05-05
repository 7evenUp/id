import React, { ButtonHTMLAttributes } from "react"

import { cn } from "../../lib/classNames"

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <button
        className={cn(
          "rounded-full w-5 h-5 flex justify-center items-center",
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

export default IconButton
