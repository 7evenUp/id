import React, { AnchorHTMLAttributes } from "react"

import { ReactComponent as ArrowTr } from "@/assets/icons/arrow-tr.svg"
import { ReactComponent as Telegram } from "@/assets/icons/telegram.svg"

import { buttonVariants } from "./Button"

import { cn } from "@/lib/classNames"
import { useAppSelector } from "@/redux/hooks"

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  withTgIcon?: boolean
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  className,
  children,
  withTgIcon,
  ...props
}) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <a
      className={cn(
        "flex items-center gap-1.5",
        buttonVariants({ appearence: "outlined" }),
        scale &&
          "3xl:text-[0.911vw]/[0.911vw] 3xl:px-[0.651vw] 3xl:py-[0.195vw] 3xl:gap-[0.391vw]",
        className
      )}
      target="_blank"
      {...props}
    >
      {withTgIcon && (
        <Telegram
          className={cn(
            "w-[18px] h-[18px]",
            scale && "3xl:w-[1.172vw] 3xl:h-[1.172vw]"
          )}
        />
      )}
      {children}
      <ArrowTr
        className={cn(
          "w-3.5 h-3.5",
          scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
        )}
      />
    </a>
  )
}

export default ExternalLink
