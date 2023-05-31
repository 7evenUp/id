import React from "react"
import { useTranslation } from "react-i18next"

import { cn } from "@/lib/classNames"

import { Transaction } from "@/types/types"

interface Props {
  data: Transaction[]
}

const TxHistoryMobile: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation("modals")
  return (
    <div className="flex sm:hidden flex-col divide-y divide-gray-4 dark:divide-gray-2 max-h-[400px] overflow-y-auto pr-0.5">
      {data.map((tx, i) => (
        <div key={i} className="flex flex-col gap-0.5 typography-text-1 py-2.5">
          <div className="flex justify-between">
            <span className="text-gray-3">{t("history.th-desc")}</span>
            <span>{tx.description}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-3">{t("history.th-date")}</span>
            <span>{tx.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-3">{t("history.th-price")}</span>
            <span>{tx.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-3">{t("history.th-status")}</span>
            <span
              className={cn(
                "typography-text-2",
                tx.status === "в процессе"
                  ? "text-process"
                  : tx.status === "отклонено"
                  ? "text-error"
                  : "text-success"
              )}
            >
              {tx.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-3">{t("history.th-txid")}</span>
            <span>{tx.id}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TxHistoryMobile
