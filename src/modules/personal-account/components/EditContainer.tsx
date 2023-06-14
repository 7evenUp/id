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
        "absolute right-0 translate-x-[30px] w-[30px] h-full flex items-center pl-1 xl:pl-2.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity",
        className
      )}
    >
      {children}
    </div>
  )
}

export default EditContainer
