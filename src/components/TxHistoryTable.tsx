import React from "react"

import { cn } from "@/lib/classNames"

import { Transaction } from "@/types/types"

interface Props {
  data: Transaction[]
}

const TxHistoryTable: React.FC<Props> = ({ data }) => {
  return (
    <table className="hidden sm:table">
      <thead className="text-left text-gray-3">
        <tr>
          <THead>описание транзакции</THead>
          <THead>дата</THead>
          <THead>стоимость</THead>
          <THead>статус</THead>
          <THead>tx id</THead>
        </tr>
      </thead>
      <tbody className="typography-text-1 divide-y divide-gray-4 dark:divide-gray-2">
        {data.map((tx, i) => (
          <tr key={i}>
            <TData>{tx.description}</TData>
            <TData>{tx.date}</TData>
            <TData>{tx.price}</TData>
            <TData
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
            </TData>
            <TData>{tx.id}</TData>
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
