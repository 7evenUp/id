import { useTranslation } from "react-i18next"

import { DialogHeader } from "@/shared/ui/Dialog"

import { useUserProfileQuery } from "@/redux/api/profile"

const SubscriptionModalHeader = ({ step }: { step: string }) => {
  const { t } = useTranslation("modals")

  const { data } = useUserProfileQuery()

  const { balance } = data!

  return (
    <DialogHeader className="typography-text-1">
      <span>{step}</span>
      <div className="flex flex-col items-end gap-1">
        <span className="flex items-center gap-1">
          {t("buy-subs.balance")}:{" "}
          <span className="typography-balance">${balance}</span>
        </span>
        <span className="flex items-center gap-1">
          {t("buy-subs.current-status")}:{" "}
          <span className="typography-text-1 italic px-1.5 py-0.5 text-gray-6 rounded-full select-none bg-gradient-to-r from-corral to-purple">
            Prime
          </span>
        </span>
      </div>
    </DialogHeader>
  )
}

export default SubscriptionModalHeader
