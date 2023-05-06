import React from "react"

import { cn } from "@/lib/classNames"

import { useAppSelector } from "@/redux/hooks"

import { productToColor } from "@/utils/productToColor"

const AccentNumber = ({ children }: { children: React.ReactNode }) => {
  const activeProduct = useAppSelector((state) => state.tabs.value)

  const color = productToColor[activeProduct]

  return (
    <span
      className={cn(
        "typography-balance text-res-bot-blue text-prime-pink",
        `text-${color}`
      )}
    >
      {children}
    </span>
  )
}

export default AccentNumber
