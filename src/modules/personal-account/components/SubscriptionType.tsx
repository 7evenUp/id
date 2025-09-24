import { cva } from "class-variance-authority"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const subsTypeVariants = cva(
  "typography-text-1 italic px-1.5 py-0.5 text-gray-6 rounded-full select-none",
  {
    variants: {
      appearance: {
        notActive: "bg-gray-1 dark:bg-gray-2",
        prime: "bg-gradient-to-r from-corral to-purple",
        calendar: "bg-calendar-red dark:bg-calendar-red",
        frozen: "bg-gradient-to-r from-frozen-start to-frozen-end",
      },
    },
  }
)

const SubscriptionType = ({ className }: { className?: string }) => {
  const scale = useAppSelector((state) => state.scale.value)

  const { data } = useUserProfileQuery()
  const {
    subscriptionInfo: { subscriptionType, status },
  } = data!

  return (
    <span
      className={cn(
        subsTypeVariants({
          appearance:
            status === "FROZEN"
              ? "frozen"
              : subscriptionType === "Prime" || subscriptionType === "Pro"
              ? "prime"
              : subscriptionType === "Start"
              ? "calendar"
              : "notActive",
        }),
        scale && "typography-text-1_large 3xl:px-[0.391vw] 3xl:py-[0.13vw]",
        className
      )}
    >
      {subscriptionType === null ? "Free" : subscriptionType}
    </span>
  )
}

export default SubscriptionType
