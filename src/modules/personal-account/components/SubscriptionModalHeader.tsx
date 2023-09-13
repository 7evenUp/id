import { useTranslation } from "react-i18next"

import SubscriptionType from "./SubscriptionType"

import { DialogHeader } from "@/shared/ui/Dialog"

import Text1 from "@/shared/typography/Text1"
import TextAccent from "@/shared/typography/TextAccent"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const SubscriptionModalHeader = ({ step }: { step: string }) => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  const { data } = useUserProfileQuery()

  const { balance } = data!

  return (
    <DialogHeader>
      <Text1>{step}</Text1>
      <div
        className={cn(
          "flex flex-col items-end gap-1",
          scale && "3xl:gap-[0.26vw]"
        )}
      >
        <Text1
          className={cn("flex items-center gap-1", scale && "3xl:gap-[0.26vw]")}
        >
          {t("buy-subs.balance")}: <TextAccent>${balance}</TextAccent>
        </Text1>
        <Text1
          className={cn("flex items-center gap-1", scale && "3xl:gap-[0.26vw]")}
        >
          {t("buy-subs.current-status")}:<SubscriptionType />
        </Text1>
      </div>
    </DialogHeader>
  )
}

export default SubscriptionModalHeader
