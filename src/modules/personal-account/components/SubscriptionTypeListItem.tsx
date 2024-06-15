import React from "react"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

import { ActiveUserSubscription } from "@/types/user"

const SubscriptionTypeListItem = ({
  subscription: { status, kindName },
  children,
  className,
}: {
  subscription: ActiveUserSubscription
  children: React.ReactNode
  className?: string
}) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <span
      className={cn(
        "typography-text-1 italic bg-gray-1 dark:bg-gray-2 px-1.5 py-0.5 text-gray-6 rounded-full select-none",
        status === "ACTIVE" &&
          kindName === "Prime" &&
          "bg-gradient-to-r from-corral to-purple",
        status === "ACTIVE" &&
          kindName === "Calendar" &&
          "bg-calendar-red dark:bg-calendar-red",
        scale && "typography-text-1_large 3xl:px-[0.391vw] 3xl:py-[0.13vw]",
        className
      )}
    >
      {children}
    </span>
  )
}

export default SubscriptionTypeListItem
