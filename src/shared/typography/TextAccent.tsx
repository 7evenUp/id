import React, { HTMLAttributes } from "react"
import { Slot } from "@radix-ui/react-slot"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const TextAccent: React.FC<
  HTMLAttributes<HTMLParagraphElement> & { asChild?: boolean }
> = ({ children, className, asChild, ...props }) => {
  const scale = useAppSelector((state) => state.scale.value)

  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      className={cn(
        "typography-accent",
        scale && "typography-accent_large",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export default TextAccent
