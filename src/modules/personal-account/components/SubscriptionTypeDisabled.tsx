import React from "react"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const SubscriptionTypeDisabled = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ children, className, ...props }, forwardedRef) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <button
      className={cn(
        "typography-text-1 italic bg-gray-1 dark:bg-gray-2 px-1.5 py-0.5 text-gray-6 rounded-full select-none hover:bg-gradient-to-r from-gray-2 to-gray-4",
        scale && "typography-text-1_large 3xl:px-[0.391vw] 3xl:py-[0.13vw]",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </button>
  )
})
SubscriptionTypeDisabled.displayName = "SubscriptionTypeDisabled"

export default SubscriptionTypeDisabled
