import React, { HTMLAttributes } from "react"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const Subheading: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => {
  const scale = useAppSelector((state) => state.scale.value)
  
  return (
    <h2
      className={cn(
        "typography-head dark:text-gray-5",
        scale && "typography-head_large",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export default Subheading
