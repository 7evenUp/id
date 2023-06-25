import React from "react"

import { cn } from "@/lib/classNames"

const ResponseSuccessText = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <span
      className={cn(
        "text-success text-xs 2xl:text-[0.781vw]/[1.042vw] font-medium tracking-wide",
        className
      )}
    >
      {children}
    </span>
  )
}

export default ResponseSuccessText
