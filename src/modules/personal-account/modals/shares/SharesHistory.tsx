import { useTranslation } from "react-i18next"

import SharesHistoryTable from "../../components/SharesHistoryTable"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"

import Text1 from "@/shared/typography/Text1"

import { useGetSharesHistoryQuery } from "@/redux/api/user"

const SharesHistory = () => {
  const { t } = useTranslation("modals")

  const { data: transactions } = useGetSharesHistoryQuery()

  if (!transactions) return null

  return (
    <DialogContent className="sm:px-6 3xl:px-[1.563vw]">
      <DialogHeader>
        <DialogTitle>{t("shares.history.heading")}</DialogTitle>
      </DialogHeader>
      {transactions.results.length !== 0 ? (
        <SharesHistoryTable />
      ) : (
        <Text1>{t("shares.history.no-data")}</Text1>
      )}
    </DialogContent>
  )
}

export default SharesHistory
