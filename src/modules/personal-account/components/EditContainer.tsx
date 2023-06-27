import React from "react"

import { cn } from "@/lib/classNames"

const EditContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "absolute right-0 translate-x-[30px] 2xl:translate-x-[1.953vw] w-[30px] 2xl:w-[1.953vw] h-full flex items-center pl-1 xl:pl-2.5 2xl:pl-[0.651vw] opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity group-focus-within:opacity-100",
        className
      )}
    >
      {children}
    </div>
  )
}

export default EditContainer
