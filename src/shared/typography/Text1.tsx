import React, { HTMLAttributes } from "react"
import { Slot } from "@radix-ui/react-slot"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const Text1: React.FC<
  HTMLAttributes<HTMLParagraphElement> & { asChild?: boolean }
> = ({ children, className, asChild, ...props }) => {
  const scale = useAppSelector((state) => state.scale.value)

  const Comp = asChild ? Slot : "p"

  return (
    <Comp
      className={cn(
        "typography-text-1",
        scale && "typography-text-1_large",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export default Text1
