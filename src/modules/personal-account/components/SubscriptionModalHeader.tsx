import { useTranslation } from "react-i18next"

import SubscriptionType from "./SubscriptionType"

import { DialogHeader } from "@/shared/ui/Dialog"

import { useUserProfileQuery } from "@/redux/api/profile"

const SubscriptionModalHeader = ({ step }: { step: string }) => {
  const { t } = useTranslation("modals")

  const { data } = useUserProfileQuery()

  const { balance } = data!

  return (
    <DialogHeader className="typography-text-1">
      <span>{step}</span>
      <div className="flex flex-col items-end gap-1 3xl:gap-[0.26vw]">
        <span className="flex items-center gap-1 3xl:gap-[0.26vw]">
          {t("buy-subs.balance")}:{" "}
          <span className="typography-balance">${balance}</span>
        </span>
        <span className="flex items-center gap-1 3xl:gap-[0.26vw]">
          {t("buy-subs.current-status")}:<SubscriptionType />
        </span>
      </div>
    </DialogHeader>
  )
}

export default SubscriptionModalHeader
