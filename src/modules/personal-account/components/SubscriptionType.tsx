import { cva } from "class-variance-authority"

import { cn } from "@/lib/classNames"

import { useUserProfileQuery } from "@/redux/api/profile"

const subsTypeVariants = cva(
  "typography-text-1 italic bg-gray-1 dark:bg-gray-2 px-1.5 py-0.5 2xl:px-[0.391vw] 2xl:py-[0.13vw] text-gray-6 rounded-full select-none",
  {
    variants: {
      appearence: {
        free: "hover:bg-gradient-to-r from-gray-2 to-gray-4",
        prime: "bg-gradient-to-r from-corral to-purple",
      },
    },
  }
)

const SubscriptionType = ({ className }: { className?: string }) => {
  const { data } = useUserProfileQuery()
  const {
    subscriptionInfo: { subscriptionType },
  } = data!

  return (
    <span
      className={cn(
        subsTypeVariants({
          appearence: subscriptionType === null ? "free" : "prime",
        }),
        className
      )}
    >
      {subscriptionType === null ? "Free" : subscriptionType}
    </span>
  )
}

export default SubscriptionType
