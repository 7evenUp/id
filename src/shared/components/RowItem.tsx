import React, { HTMLAttributes } from "react"

import { cn } from "@/lib/classNames"

const RowItem: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex justify-between items-center py-2 border-b border-gray-4 dark:border-gray-1  typography-text-0 dark:text-gray-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default RowItem
