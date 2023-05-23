import React from "react"

import { cn } from "@/lib/classNames"

const AuthButton = ({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "rounded-full h-[42px] px-4 flex items-center gap-2.5 border border-gray-1 bg-white hover:bg-gray-6 text-gray-1",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default AuthButton
