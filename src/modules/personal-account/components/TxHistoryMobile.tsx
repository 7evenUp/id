import { useTranslation } from "react-i18next"

import { cn } from "@/lib/classNames"

import { useTransactionHistoryQuery } from "@/redux/api/profile"

import { formatDate } from "@/lib/date-fns"

const TxHistoryMobile = () => {
  const { t, i18n } = useTranslation("modals")

  const { data } = useTransactionHistoryQuery()

  if (!data) return <span className="sm:hidden">No history data yet</span>

  return (
    <div className="flex sm:hidden flex-col divide-y divide-gray-4 dark:divide-gray-2 max-h-[400px] overflow-y-auto pr-0.5">
      {data.map((tx, i) => (
        <div key={i} className="flex flex-col gap-0.5 typography-text-1 py-2.5">
          <div className="flex justify-between">
            <span className="text-gray-3">{t("history.th-desc")}</span>
            <span className="text-right">{tx.description}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-3">{t("history.th-date")}</span>
            <span>
              {formatDate(tx.createdDatetime, i18n.language as "ru" | "en") ||
                "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-3">{t("history.th-price")}</span>
            <span>{tx.totalAmount || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-3">{t("history.th-status")}</span>
            <span
              className={cn(
                "typography-text-2",
                tx.status !== null && tx.status === "PENDING"
                  ? "text-process"
                  : tx.status === "COMPLETED"
                  ? "text-success"
                  : "text-error"
              )}
            >
              {tx.status === null
                ? "-"
                : tx.status === "COMPLETED"
                ? t("history.tx-status-success")
                : tx.status === "PENDING"
                ? t("history.tx-status-pending")
                : t("history.tx-status-reject")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-3">{t("history.th-txid")}</span>
            <span>{tx.txId || "no tx id"}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TxHistoryMobile
