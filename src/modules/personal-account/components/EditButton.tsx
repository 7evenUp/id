import React from "react"
import { MdEdit } from "react-icons/md"

import IconButton from "@/shared/ui/IconButton"

import { cn } from "@/lib/classNames"

const EditButton = React.forwardRef<
  React.ElementRef<typeof IconButton>,
  React.ComponentPropsWithoutRef<typeof IconButton>
>(({ className, ...props }, forwardedRef) => {
  return (
    <IconButton
      className={cn(
        "bg-gray-4 hover:bg-gray-3 sm:bg-gray-1 sm:hover:bg-gray-2 dark:bg-gray-4 dark:hover:bg-gray-5 active:bg-opacity-80 dark:active:bg-opacity-80 rounded-full",
        className
      )}
      ref={forwardedRef}
      {...props}
    >
      <MdEdit className="w-3 h-3 fill-white dark:fill-gray-1" />
    </IconButton>
  )
})

export default EditButton
