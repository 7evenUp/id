import React, { ButtonHTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { ReactComponent as Loader } from "@/assets/icons/loader.svg"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

export const buttonVariants = cva(
  "transition-colors flex items-center justify-center",
  {
    variants: {
      appearence: {
        outlined:
          "gap-1 text-sm/[14px] 2xl:text-base/[16px] px-2.5 py-[3px] rounded-full text-gray-1 hover:text-white border border-gray-1 hover:bg-gray-1 active:bg-opacity-80 dark:active:bg-opacity-80 dark:text-gray-4 dark:border-gray-4 dark:hover:bg-gray-2 disabled:text-gray-4 disabled:hover:bg-transparent dark:disabled:text-gray-3 dark:disabled:hover:bg-transparent",
        success:
          "gap-1 text-sm/[14px] 2xl:text-base/[16px] px-2.5 py-[3px] rounded-full hover:bg-opacity-70 active:bg-opacity-80 text-white bg-success disabled:hover:bg-opacity-100",
        text: "text-[10px] 2xl:text-xs/[12px] leading-[140%] tracking-[0.05em] font-medium text-gray-3 hover:text-gray-4",
      },
    },
    defaultVariants: {
      appearence: "outlined",
    },
  }
)

interface ButtonProps
  extends VariantProps<typeof buttonVariants>,
    ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, appearence, isLoading, ...props }, forwardedRef) => {
    const scale = useAppSelector((state) => state.scale.value)

    return (
      <button
        className={cn(
          buttonVariants({ appearence }),
          scale &&
            (appearence === "outlined" || appearence === undefined) &&
            "3xl:text-[0.911vw]/[0.911vw] 3xl:px-[0.651vw] 3xl:py-[0.195vw]",
          scale &&
            appearence === "success" &&
            "3xl:text-[0.911vw]/[0.911vw] 3xl:px-[0.651vw] 3xl:py-[0.195vw]",
          scale && appearence === "text" && "3xl:text-[0.651vw]",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        {isLoading && (
          <Loader
            className={cn(
              "animate-spin w-3.5 h-3.5",
              scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
            )}
          />
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export default Button
