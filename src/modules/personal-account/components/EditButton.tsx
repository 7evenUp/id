import React from "react"

import { ReactComponent as Edit } from "@/assets/icons/edit.svg"

import IconButton from "@/shared/ui/IconButton"

import { cn } from "@/lib/classNames"

const EditButton = React.forwardRef<
  React.ElementRef<typeof IconButton>,
  React.ComponentPropsWithoutRef<typeof IconButton>
>(({ className, ...props }, forwardedRef) => {
  return (
    <IconButton
      className={cn(
        "group/icon bg-gray-4 hover:bg-gray-3 sm:bg-gray-1 sm:hover:bg-gray-2 dark:bg-gray-4 dark:hover:bg-gray-5 active:bg-opacity-80 dark:active:bg-opacity-80 rounded-full",
        className
      )}
      ref={forwardedRef}
      {...props}
    >
      <Edit className="w-3.5 h-3.5 text-gray-4 group-hover/icon:text-gray-3 sm:text-gray-1 sm:group-hover/icon:text-gray-2 dark:text-gray-4 dark:group-hover/icon:text-gray-5 fill-white dark:fill-gray-1" />
    </IconButton>
  )
})

export default EditButton
