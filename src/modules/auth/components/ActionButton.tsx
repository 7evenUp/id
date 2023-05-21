import React from "react"

import { cn } from "@/lib/classNames"

const ActionButton = ({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center text-base py-2 rounded-md text-gray-1 hover:text-white border border-gray-1 bg-white hover:bg-gray-1 active:bg-opacity-80 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default ActionButton
