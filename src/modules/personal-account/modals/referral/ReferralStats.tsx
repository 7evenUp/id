import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"

import RowItem from "@/shared/components/RowItem"

import { useUserProfileQuery } from "@/redux/api/profile"

const ReferralStats = () => {
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
        <DialogTitle>Статистика</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col">
        <RowItem className="typography-accent dark:border-gray-2 gap-6">
          <span>Количество приглашённых пользователей</span>
          <span className="typography-balance">{allTimeReferralCount}</span>
        </RowItem>
        <RowItem className="typography-accent dark:border-gray-2 gap-6">
          <span>Участников, сделавших платёж</span>
          <span className="typography-balance">{allTimePaidReferralCount}</span>
        </RowItem>
        <RowItem className="typography-accent dark:border-gray-2 gap-6">
          <span>Уникальных участников приглашено в этом месяце</span>
          <span className="typography-balance">
            {currentMonthReferralCount}
          </span>
        </RowItem>
        <RowItem className="typography-accent dark:border-gray-2 gap-6">
          <span>
            Уникальных участников в текущем месяце, совершивших платёж
          </span>
          <span className="typography-balance">
            {currentMonthPaidReferralCount}
          </span>
        </RowItem>
        <RowItem className="typography-accent dark:border-gray-2 gap-6">
          <span>Суммарно заработано</span>
          <span className="typography-balance">${totalProfit}</span>
        </RowItem>
        <RowItem className="typography-accent dark:border-gray-2 gap-6">
          <span>Выведено с реферальной системы</span>
          <span className="typography-balance">${totalWithdrawAmount}</span>
        </RowItem>
      </div>
    </DialogContent>
  )
}

export default ReferralStats
