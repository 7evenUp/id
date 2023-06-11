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

  const { data } = useTransactionHistoryQuery()

  return (
    <DialogContent className="max-w-[800px] sm:px-6">
      <DialogHeader>
        <DialogTitle>{t("history.heading")}</DialogTitle>
        <Button disabled={data === undefined}>
          {data !== undefined ? (
            <PDFDownloadLink
              document={<HistoryPDF data={data} />}
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
          ) : (
            t("history.export-btn")
          )}
        </Button>
      </DialogHeader>
      <TxHistoryTable />
      <TxHistoryMobile />
    </DialogContent>
  )
}

export default TxHistory
