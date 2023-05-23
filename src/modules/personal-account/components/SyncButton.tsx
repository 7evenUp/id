import React from "react"
import { MdSync } from "react-icons/md"

import IconButton from "@/shared/ui/IconButton"

import { cn } from "@/lib/classNames"

const SyncButton = React.forwardRef<
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
      <MdSync className="w-3.5 h-3.5 fill-gray-5" />
    </IconButton>
  )
})

export default SyncButton
