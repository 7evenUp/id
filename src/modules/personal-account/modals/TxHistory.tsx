import { PDFDownloadLink } from "@react-pdf/renderer"
import { useTranslation } from "react-i18next"

import HistoryPDF from "@/components/HistoryPDF"

import TxHistoryTable from "../components/TxHistoryTable"
import TxHistoryMobile from "../components/TxHistoryMobile"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"

import { useTransactionHistoryQuery } from "@/redux/api/profile"

const TxHistory = () => {
  const { t } = useTranslation("modals")

  const { data: transactions } = useTransactionHistoryQuery()

  if (!transactions) return null

  return (
    <DialogContent className="max-w-[800px] 2xl:max-w-[52.083vw] sm:px-6 2xl:px-[1.563vw]">
      <DialogHeader>
        <DialogTitle>{t("history.heading")}</DialogTitle>
        {transactions.length !== 0 && (
          <Button>
            <PDFDownloadLink
              document={<HistoryPDF data={transactions} />}
              fileName="history.pdf"
            >
              {({ loading, error }) =>
                error
                  ? "Error"
                  : loading
                  ? "Loading..."
                  : t("history.export-btn")
              }
            </PDFDownloadLink>
          </Button>
        )}
      </DialogHeader>
      {transactions.length !== 0 ? (
        <>
          <TxHistoryTable />
          <TxHistoryMobile />
        </>
      ) : (
        <p>{t("history.no-data")}</p>
      )}
    </DialogContent>
  )
}

export default TxHistory
