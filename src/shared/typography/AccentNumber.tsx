import React from "react"

import { cn } from "@/lib/classNames"

import { useAppSelector } from "@/redux/hooks"

import { productToColor } from "@/utils/productToColor"

import TextAccent from "./TextAccent"

const AccentNumber = ({ children }: { children: React.ReactNode }) => {
  const activeProduct = useAppSelector((state) => state.tabs.value)

  const color = productToColor[activeProduct]

  return (
    <TextAccent
      className={cn(
        "text-res-bot-blue text-prime-pink text-tools-green text-calendar-red text-university-velvet text-academy-gold",
        `text-${color}`
      )}
    >
      {children}
    </TextAccent>
  )
}

export default AccentNumber
