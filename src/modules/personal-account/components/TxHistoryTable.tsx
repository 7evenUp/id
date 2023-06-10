import React from "react"
import { useTranslation } from "react-i18next"

import { cn } from "@/lib/classNames"

import { useTransactionHistoryQuery } from "@/redux/api/profile"

import { formatDate } from "@/lib/date-fns"

const TxHistoryTable = () => {
  const { t, i18n } = useTranslation("modals")

  const { data } = useTransactionHistoryQuery()

  if (!data) return <span className="hidden sm:block">No history data yet</span>

  return (
    <table className="hidden sm:table">
      <thead className="text-left text-gray-3">
        <tr>
          <THead>{t("history.th-desc")}</THead>
          <THead>{t("history.th-date")}</THead>
          <THead>{t("history.th-price")}</THead>
          <THead>{t("history.th-status")}</THead>
          <THead>{t("history.th-txid")}</THead>
        </tr>
      </thead>
      <tbody className="typography-text-1 divide-y divide-gray-4 dark:divide-gray-2">
        {data.map((tx, i) => (
          <tr key={i}>
            <TData>{tx.description || "no description"}</TData>
            <TData>
              {formatDate(tx.createdDatetime, i18n.language as "ru" | "en") ||
                "no date"}
            </TData>
            <TData>{tx.totalAmount || "no amount"}</TData>
            <TData
              className={cn(
                "typography-text-2",
                tx.status !== null && tx.status === "PENDING"
                  ? "text-process"
                  : tx.status === "COMPLETED"
                  ? "text-success"
                  : "text-error"
              )}
            >
              {tx.status || "no status"}
            </TData>
            <TData>{tx.txId || "no tx id"}</TData>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TxHistoryTable

const THead = ({ children }: { children: React.ReactNode }) => (
  <th className="typography-tip pb-4 pr-2 md:pr-6">{children}</th>
)

const TData = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <th className={cn("py-1 pr-2 md:pr-6 text-left", className)}>{children}</th>
)
