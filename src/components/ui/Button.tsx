import React, { ButtonHTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/classNames"

const buttonVariants = cva("transition-colors", {
  variants: {
    appearence: {
      outlined:
        "typography-btn-big px-[10px] py-[3px] text-gray-1 hover:text-white border border-gray-1 rounded-full hover:bg-gray-1 active:bg-opacity-80",
      text: "typography-btn-additional text-gray-3 hover:text-gray-4",
    },
  },
  defaultVariants: {
    appearence: "outlined",
  },
})

interface ButtonProps
  extends VariantProps<typeof buttonVariants>,
    ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, appearence, ...props }, forwardedRef) => {
    return (
      <button
        className={cn(buttonVariants({ appearence }), className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </button>
    )
  }
)

export default Button
