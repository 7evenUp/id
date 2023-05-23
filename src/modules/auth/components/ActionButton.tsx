import React from "react"
import { BiLoaderAlt } from "react-icons/bi"

import { cn } from "@/lib/classNames"

const ActionButton = ({
  className,
  children,
  isLoading,
  ...props
}: React.ComponentProps<"button"> & { isLoading?: boolean }) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 text-base py-2 rounded-md text-gray-1 hover:text-white border border-gray-1 bg-white hover:bg-gray-1 active:bg-opacity-80 transition-colors",
        className
      )}
      {...props}
    >
      {isLoading && <BiLoaderAlt className="animate-spin" />}
      {children}
    </button>
  )
}

export default ActionButton
