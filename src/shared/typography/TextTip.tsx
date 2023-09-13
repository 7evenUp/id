import React, { HTMLAttributes } from "react"
import { Slot } from "@radix-ui/react-slot"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const TextTip: React.FC<
  HTMLAttributes<HTMLParagraphElement> & { asChild?: boolean }
> = ({ children, className, asChild, ...props }) => {
  const scale = useAppSelector((state) => state.scale.value)

  const Comp = asChild ? Slot : "p"

  return (
    <Comp
      className={cn(
        "typography-tip",
        scale && "typography-tip_large",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export default TextTip
