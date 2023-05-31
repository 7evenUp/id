import { useTranslation } from "react-i18next"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"

import RowItem from "@/shared/components/RowItem"

import { useUserProfileQuery } from "@/redux/api/profile"

const ReferralStats = () => {
  const { t } = useTranslation("modals")

  const { data: profileData } = useUserProfileQuery()

  if (!profileData) return null

  const {
    referralInfo: {
      allTimePaidReferralCount,
      allTimeReferralCount,
      currentMonthReferralCount,
      currentMonthPaidReferralCount,
      totalProfit,
      totalWithdrawAmount,
    },
  } = profileData

  return (
    <DialogContent className="max-w-[500px] md:max-w-[630px]">
      <DialogHeader>
        <DialogTitle>{t("ref-stats.heading")}</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col">
        <RowItem className="typography-accent dark:border-gray-2 gap-6">
          <span>{t("ref-stats.total-refs")}</span>
          <span className="typography-balance">{allTimeReferralCount}</span>
        </RowItem>
        <RowItem className="typography-accent dark:border-gray-2 gap-6">
          <span>{t("ref-stats.total-paid-refs")}</span>
          <span className="typography-balance">{allTimePaidReferralCount}</span>
        </RowItem>
        <RowItem className="typography-accent dark:border-gray-2 gap-6">
          <span>{t("ref-stats.current-month-refs")}</span>
          <span className="typography-balance">
            {currentMonthReferralCount}
          </span>
        </RowItem>
        <RowItem className="typography-accent dark:border-gray-2 gap-6">
          <span>{t("ref-stats.current-month-paid-refs")}</span>
          <span className="typography-balance">
            {currentMonthPaidReferralCount}
          </span>
        </RowItem>
        <RowItem className="typography-accent dark:border-gray-2 gap-6">
          <span>{t("ref-stats.total-profit")}</span>
          <span className="typography-balance">${totalProfit}</span>
        </RowItem>
        <RowItem className="typography-accent dark:border-gray-2 gap-6">
          <span>{t("ref-stats.total-withdraw")}</span>
          <span className="typography-balance">${totalWithdrawAmount}</span>
        </RowItem>
      </div>
    </DialogContent>
  )
}

export default ReferralStats
