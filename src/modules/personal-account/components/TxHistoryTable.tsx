import React from "react"
import { useTranslation } from "react-i18next"

import { cn } from "@/lib/classNames"
import { formatDate } from "@/lib/date-fns"

import { useTransactionHistoryQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cutWalletAddr } from "@/utils/cutWalletAddr"

const TxHistoryTable = () => {
  const { t, i18n } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  const { data } = useTransactionHistoryQuery()

  if (!data) return <span className="hidden sm:block">No history data yet</span>

  return (
    <div
      className={cn(
        "hidden sm:block h-[400px] overflow-auto",
        scale && "3xl:h-[26vw]"
      )}
    >
      <table className="table">
        <thead className="text-left text-gray-3">
          <tr>
            <THead>{t("history.th-desc")}</THead>
            <THead>{t("history.th-date")}</THead>
            <THead>{t("history.th-price")}</THead>
            <THead>{t("history.th-status")}</THead>
            <THead>{t("history.th-txid")}</THead>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-4 dark:divide-gray-2 ">
          {data.map((tx, i) => (
            <tr key={i}>
              <TData>{tx.description || "-"}</TData>
              <TData>
                {formatDate(tx.createdDatetime, i18n.language as "ru" | "en") ||
                  "-"}
              </TData>
              <TData>{tx.totalAmount ? `$${tx.totalAmount}` : "-"}</TData>
              <TData
                className={cn(
                  "typography-text-2",
                  scale && "typography-text-2_large",
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
              </TData>
              <TData>
                {tx.txId ? (
                  <a
                    href={`https://bscscan.com/tx/${tx.txId}`}
                    target="_blank"
                    className="underline underline-offset-2"
                  >
                    {cutWalletAddr(tx.txId)}
                  </a>
                ) : (
                  "-"
                )}
              </TData>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TxHistoryTable

const THead = ({ children }: { children: React.ReactNode }) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <th
      className={cn(
        "typography-tip pb-4 pr-2 md:pr-6",
        scale && "typography-tip_large 3xl:pb-[1.042vw] 3xl:pr-[1.563vw]"
      )}
    >
      {children}
    </th>
  )
}

const TData = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <th
      className={cn(
        "typography-text-1 py-1 pr-2 md:pr-6 text-left",
        scale && "typography-text-1_large 3xl:py-[0.26vw] 3xl:pr-[1.563vw]",
        className
      )}
    >
      {children}
    </th>
  )
}
