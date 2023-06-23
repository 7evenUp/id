import React from "react"

import { ReactComponent as Loader } from "@/assets/icons/loader.svg"

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
        "flex items-center justify-center gap-2 2xl:gap-[0.521vw] text-base 2xl:text-[1.042vw]/[1.563vw] py-2 2xl:py-[0.521vw] rounded-md 2xl:rounded-[0.391vw] text-gray-1 hover:text-white border border-gray-1 bg-white hover:bg-gray-1 active:bg-opacity-80 transition-colors",
        className
      )}
      {...props}
    >
      {isLoading && <Loader className="animate-spin w-3.5 h-3.5 2xl:w-[0.911vw] 2xl:h-[0.911vw]" />}
      {children}
    </button>
  )
}

export default ActionButton
