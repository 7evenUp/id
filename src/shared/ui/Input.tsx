import React, { InputHTMLAttributes } from "react"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, forwardedRef) => {
    const scale = useAppSelector((state) => state.scale.value)

    return (
      <input
        className={cn(
          "text-[10px] leading-[140%] font-medium text-gray-1 dark:text-gray-5 outline-none bg-transparent border-b border-gray-4 dark:border-gray-3 focus:border-gray-1 dark:focus:border-gray-4 dark:placeholder:text-gray-3 py-1 rounded-none",
          scale && "3xl:text-[0.651vw] 3xl:py-[0.26vw]",
          className
        )}
        {...props}
        ref={forwardedRef}
      />
    )
  }
)

export default Input
