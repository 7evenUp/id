import React from "react"

import Check from "@/assets/icons/check.svg?react"

import IconButton from "@/shared/ui/IconButton"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const ConfirmButton = React.forwardRef<
  React.ElementRef<typeof IconButton>,
  React.ComponentPropsWithoutRef<typeof IconButton>
>(({ className, ...props }, forwardedRef) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <IconButton
      className={cn(
        "bg-gray-1 hover:bg-gray-2 dark:bg-gray-6 dark:hover:bg-gray-5 active:bg-opacity-80  dark:active:bg-opacity-80 rounded-full",
        className
      )}
      ref={forwardedRef}
      {...props}
    >
      <Check
        className={cn(
          "w-3.5 h-3.5 text-white dark:text-gray-1",
          scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
        )}
      />
    </IconButton>
  )
})

export default ConfirmButton
