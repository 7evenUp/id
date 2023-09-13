import React from "react"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const EditContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <div
      className={cn(
        "absolute right-0 translate-x-[30px] w-[30px] h-full flex items-center pl-1 xl:pl-2.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity group-focus-within:opacity-100",
        scale && "3xl:translate-x-[1.953vw] 3xl:w-[1.953vw] 3xl:pl-[0.651vw]",
        className
      )}
    >
      {children}
    </div>
  )
}

export default EditContainer
