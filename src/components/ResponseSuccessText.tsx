import React from "react"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const ResponseSuccessText = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const scale = useAppSelector(state=>state.scale.value)
  return (
    <span
      className={cn(
        "text-success text-xs font-medium tracking-wide",
        scale && "3xl:text-[0.781vw]/[1.042vw]",
        className
      )}
    >
      {children}
    </span>
  )
}

export default ResponseSuccessText
