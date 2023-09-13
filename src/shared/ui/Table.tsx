import * as React from "react"

import { cn } from "@/lib/classNames"
import { useAppSelector } from "@/redux/hooks"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={cn(
          "w-full text-sm",
          scale && "3xl:text-[0.911vw]/[1.302vw]",
          className
        )}
        {...props}
      />
    </div>
  )
})
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("border-0 [&_tr]:border-0", className)}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "[&_tr:last-child]:border-0 border-gray-4 dark:border-gray-2",
      className
    )}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("border-b border-gray-4 dark:border-gray-2", className)}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <th
      ref={ref}
      className={cn(
        "typography-text-1 h-12 pl-2 sm:pl-4 pr-2 text-left align-middle text-gray-3",
        scale &&
          "typography-text-1_large 3xl:h-[3.125vw] 3xl:pl-[1.042vw] 3xl:pr-[0.521vw]",
        className
      )}
      {...props}
    />
  )
})
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const scale = useAppSelector((state) => state.scale.value)
  return (
    <td
      ref={ref}
      className={cn(
        "pl-2 sm:pl-4 pr-2 py-4 align-middle",
        scale && "3xl:pl-[1.042vw] 3xl:pr-[0.521vw] 3xl:py-[1.042vw]",
        className
      )}
      {...props}
    />
  )
})
TableCell.displayName = "TableCell"

export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell }
