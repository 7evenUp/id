import React from "react"
import { useTranslation } from "react-i18next"

import { cn } from "@/lib/classNames"

import { useGetSharesHistoryQuery } from "@/redux/api/user"
import { useAppSelector } from "@/redux/hooks"

const SharesHistoryTable = () => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  const { data } = useGetSharesHistoryQuery()

  if (!data)
    return (
      <span className="block">Недостаточно данных для отображения истории</span>
    )

  return (
    <div
      className={cn(
        "block max-h-[400px] overflow-auto",
        scale && "3xl:max-h-[26vw]"
      )}
    >
      <table className="table w-full">
        <thead className="text-left text-gray-3">
          <tr>
            <THead>{t("shares.history.amount")}</THead>
            <THead>{t("shares.history.balanceBefore")}</THead>
            <THead>{t("shares.history.balanceAfter")}</THead>
            <THead>{t("shares.history.kind")}</THead>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-4 dark:divide-gray-2">
          {data.results.map((tx, i) => (
            <tr key={i}>
              <TData>{tx.amount}</TData>
              <TData>{tx.balanceBefore}</TData>
              <TData>{tx.balanceAfter}</TData>
              <TData
                className={cn(
                  "typography-text-2",
                  scale && "typography-text-2_large",
                  tx.kind.id === "WITHDRAW"
                    ? "text-process"
                    : tx.kind.id === "DEPOSIT" && "text-success"
                )}
              >
                {tx.kind.id === "DEPOSIT"
                  ? t("shares.history.deposit")
                  : tx.kind.id === "WITHDRAW"
                  ? t("shares.history.withdraw")
                  : tx.kind.label}
              </TData>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SharesHistoryTable

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
