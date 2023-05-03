import React, { HTMLAttributes } from "react"

import { cn } from "../../lib/classNames"

const Subheading: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h2 className={cn("typography-head", className)} {...props}>
      {children}
    </h2>
  )
}

export default Subheading
