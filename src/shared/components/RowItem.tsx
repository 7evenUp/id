import React, { HTMLAttributes } from "react"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const RowItem: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <div
      className={cn(
        "flex justify-between items-center py-2 border-b border-gray-4 dark:border-gray-1 typography-text-0 dark:text-gray-4",
        scale && "typography-text-0_large 3xl:py-[0.521vw]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default RowItem
