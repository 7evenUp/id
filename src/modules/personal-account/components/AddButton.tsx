import React from "react"
import { AiOutlinePlus } from "react-icons/ai"

import IconButton from "@/shared/ui/IconButton"

import { cn } from "@/lib/classNames"

const AddButton = React.forwardRef<
  React.ElementRef<typeof IconButton>,
  React.ComponentPropsWithoutRef<typeof IconButton>
>(({ className, ...props }, forwardedRef) => {
  return (
    <IconButton
      className={cn(
        "border border-transparent hover:border-gray-1 dark:hover:border-gray-5 transition-all",
        className
      )}
      ref={forwardedRef}
      {...props}
    >
      <AiOutlinePlus className="fill-gray-1 dark:fill-gray-5 transition-all" />
    </IconButton>
  )
})

export default AddButton
