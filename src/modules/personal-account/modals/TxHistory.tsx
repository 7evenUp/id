import { useTranslation } from "react-i18next"

import TxHistoryTable from "../components/TxHistoryTable"
import TxHistoryMobile from "../components/TxHistoryMobile"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"

import { txHistory } from "@/utils/txHistory"

const TxHistory = () => {
  const { t } = useTranslation("modals")
  return (
    <DialogContent className="max-w-[800px] sm:px-6">
      <DialogHeader>
        <DialogTitle>{t("history.heading")}</DialogTitle>
        <Button>{t("history.export-btn")}</Button>
      </DialogHeader>
      <TxHistoryTable data={txHistory} />
      <TxHistoryMobile data={txHistory} />
    </DialogContent>
  )
}

export default TxHistory
