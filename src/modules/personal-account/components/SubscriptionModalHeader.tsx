import { useTranslation } from "react-i18next"

import SubscriptionType from "./SubscriptionType"

import { DialogHeader } from "@/shared/ui/Dialog"

import { useUserProfileQuery } from "@/redux/api/profile"
import Text1 from "@/shared/typography/Text1"

const SubscriptionModalHeader = ({ step }: { step: string }) => {
  const { t } = useTranslation("modals")

  const { data } = useUserProfileQuery()

  const { balance } = data!

  return (
    <DialogHeader>
      <Text1>{step}</Text1>
      <div className="flex flex-col items-end gap-1 3xl:gap-[0.26vw]">
        <Text1 className="flex items-center gap-1 3xl:gap-[0.26vw]">
          {t("buy-subs.balance")}:{" "}
          <span className="typography-balance">${balance}</span>
        </Text1>
        <Text1 className="flex items-center gap-1 3xl:gap-[0.26vw]">
          {t("buy-subs.current-status")}:<SubscriptionType />
        </Text1>
      </div>
    </DialogHeader>
  )
}

export default SubscriptionModalHeader
