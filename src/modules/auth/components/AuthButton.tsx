import React from "react"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const AuthButton = ({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <button
      className={cn(
        "rounded-full h-[42px] px-4 flex items-center gap-2.5 border border-gray-1 bg-white hover:bg-gray-6 text-gray-1 dark:border-gray-5 dark:bg-gray-1 dark:hover:bg-gray-2 dark:text-white",
        scale &&
          "3xl:h-[2.734vw] 3xl:px-[1.04vw] 3xl:gap-[0.651vw] 3xl:text-[1.04vw]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default AuthButton
