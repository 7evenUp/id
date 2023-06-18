import React, { AnchorHTMLAttributes } from "react"

import { ReactComponent as ArrowTr } from "@/assets/icons/arrow-tr.svg"
import { ReactComponent as Telegram } from "@/assets/icons/telegram.svg"

import { buttonVariants } from "./Button"

import { cn } from "@/lib/classNames"

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  withTgIcon?: boolean
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  className,
  children,
  withTgIcon,
  ...props
}) => {
  return (
    <a
      className={cn(
        "flex items-center gap-1.5",
        buttonVariants({ appearence: "outlined" }),
        className
      )}
      target="_blank"
      {...props}
    >
      {withTgIcon && <Telegram className="w-[18px] h-[18px]" />}
      {children}
      <ArrowTr className="w-3.5 h-3.5" />
    </a>
  )
}

export default ExternalLink
