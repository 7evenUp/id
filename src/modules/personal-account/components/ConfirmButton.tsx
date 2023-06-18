import React from "react"
import { TbCheck } from "react-icons/tb"

import IconButton from "@/shared/ui/IconButton"

import { cn } from "@/lib/classNames"

const ConfirmButton = React.forwardRef<
  React.ElementRef<typeof IconButton>,
  React.ComponentPropsWithoutRef<typeof IconButton>
>(({ className, ...props }, forwardedRef) => {
  return (
    <IconButton
      className={cn(
        "bg-gray-1 hover:bg-gray-2 dark:bg-gray-6 dark:hover:bg-gray-5 active:bg-opacity-80  dark:active:bg-opacity-80 rounded-full",
        className
      )}
      ref={forwardedRef}
      {...props}
    >
      <TbCheck className="w-3.5 h-3.5 stroke-white dark:stroke-gray-1" />
    </IconButton>
  )
})

export default ConfirmButton
