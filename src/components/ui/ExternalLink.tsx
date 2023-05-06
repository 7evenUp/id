import React, { AnchorHTMLAttributes } from "react"

import { TbArrowUpRight, SiTelegram } from "react-icons/all"

import { cn } from "@/lib/classNames"

import { buttonVariants } from "./Button"

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
        "flex items-center gap-1.5 ",
        buttonVariants({ appearence: "outlined" }),
        className
      )}
      target="_blank"
      {...props}
    >
      {withTgIcon && <SiTelegram className="w-[18px] h-[18px]" />}
      {children}
      <TbArrowUpRight />
    </a>
  )
}

export default ExternalLink
