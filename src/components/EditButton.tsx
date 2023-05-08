import React from "react"
import { MdEdit } from "react-icons/md"

import IconButton from "./ui/IconButton"

import { cn } from "@/lib/classNames"

const EditButton = React.forwardRef<
  React.ElementRef<typeof IconButton>,
  React.ComponentPropsWithoutRef<typeof IconButton>
>(({ className, ...props }, forwardedRef) => {
  return (
    <IconButton
      className={cn(
        "bg-gray-1 hover:bg-gray-2 active:bg-opacity-80 rounded-full",
        className
      )}
      ref={forwardedRef}
      {...props}
    >
      <MdEdit className="w-3 h-3 fill-gray-5" />
    </IconButton>
  )
})

export default EditButton
