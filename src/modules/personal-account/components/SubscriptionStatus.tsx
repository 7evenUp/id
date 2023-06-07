import { cn } from "@/lib/classNames"
import { useUserProfileQuery } from "@/redux/api/profile"

const SubscriptionStatus = () => {
  const { data } = useUserProfileQuery()
  const {
    subscriptionInfo: { status },
  } = data!

  const isFrozen = status === "FROZEN"
  
  return (
    <span className={cn("typography-text-1 italic px-1.5 py-0.5 text-gray-6 select-none bg-gradient-to-r rounded-full", isFrozen ? "from-frozen-start to-frozen-end" : "from-green to-mint")}>
      {isFrozen ? "Замороженна" : "Активна"}
    </span>
  )
}

export default SubscriptionStatus
