import { useTranslation } from "react-i18next"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"

import RowItem from "@/shared/components/RowItem"

import Text0 from "@/shared/typography/Text0"
import TextAccent from "@/shared/typography/TextAccent"

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
    <DialogContent className="max-w-[500px] md:max-w-[630px] 3xl:max-w-[41.015vw]">
      <DialogHeader>
        <DialogTitle>{t("ref-stats.heading")}</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col">
        <RowItem className="dark:border-gray-2 gap-6 3xl:gap-[1.563vw]">
          <Text0>{t("ref-stats.total-refs")}</Text0>
          <TextAccent>{allTimeReferralCount}</TextAccent>
        </RowItem>
        <RowItem className="dark:border-gray-2 gap-6 3xl:gap-[1.563vw]">
          <Text0>{t("ref-stats.total-paid-refs")}</Text0>
          <TextAccent>{allTimePaidReferralCount}</TextAccent>
        </RowItem>
        <RowItem className="dark:border-gray-2 gap-6 3xl:gap-[1.563vw]">
          <Text0>{t("ref-stats.current-month-refs")}</Text0>
          <TextAccent>{currentMonthReferralCount}</TextAccent>
        </RowItem>
        <RowItem className="dark:border-gray-2 gap-6 3xl:gap-[1.563vw]">
          <Text0>{t("ref-stats.current-month-paid-refs")}</Text0>
          <TextAccent>{currentMonthPaidReferralCount}</TextAccent>
        </RowItem>
        <RowItem className="dark:border-gray-2 gap-6 3xl:gap-[1.563vw]">
          <Text0>{t("ref-stats.total-profit")}</Text0>
          <TextAccent>${totalProfit}</TextAccent>
        </RowItem>
        <RowItem className="dark:border-gray-2 gap-6 3xl:gap-[1.563vw]">
          <Text0>{t("ref-stats.total-withdraw")}</Text0>
          <TextAccent>${totalWithdrawAmount}</TextAccent>
        </RowItem>
      </div>
    </DialogContent>
  )
}

export default ReferralStats
