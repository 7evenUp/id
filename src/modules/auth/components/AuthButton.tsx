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
        "rounded-full h-[42px] 2xl:h-[2.734vw] px-4 2xl:px-[1.04vw] flex items-center gap-2.5 2xl:gap-[0.651vw] border border-gray-1 bg-white hover:bg-gray-6 text-gray-1 2xl:text-[1.04vw]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default AuthButton
