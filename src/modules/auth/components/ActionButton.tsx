import React from "react"

import { ReactComponent as Loader } from "@/assets/icons/loader.svg"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const ActionButton = ({
  className,
  children,
  isLoading,
  ...props
}: React.ComponentProps<"button"> & { isLoading?: boolean }) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 text-base py-2 rounded-md text-gray-1 hover:text-white border border-gray-1 bg-white hover:bg-gray-1 dark:text-white dark:hover:text-gray-1 dark:border-white dark:bg-gray-1 dark:hover:bg-white active:bg-opacity-80 transition-colors",
        scale &&
          "3xl:gap-[0.521vw] 3xl:text-[1.042vw]/[1.563vw] 3xl:py-[0.521vw] 3xl:rounded-[0.391vw]",
        className
      )}
      {...props}
    >
      {isLoading && (
        <Loader
          className={cn(
            "animate-spin w-3.5 h-3.5",
            scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
          )}
        />
      )}
      {children}
    </button>
  )
}

export default ActionButton
