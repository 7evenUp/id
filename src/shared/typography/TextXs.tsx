import React, { HTMLAttributes } from "react"
import { Slot } from "@radix-ui/react-slot"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const TextXs: React.FC<
  HTMLAttributes<HTMLParagraphElement> & { asChild?: boolean }
> = ({ children, className, asChild, ...props }) => {
  const scale = useAppSelector((state) => state.scale.value)

  const Comp = asChild ? Slot : "p"

  return (
    <Comp
      className={cn(
        "text-xs 2xl:text-sm -tracking-[0.01em]",
        scale && "3xl:text-[0.729vw]/[1.041vw]",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export default TextXs
