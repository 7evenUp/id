import React, { AnchorHTMLAttributes } from "react"

import { ReactComponent as ArrowTr } from "@/assets/icons/arrow-tr.svg"
import { ReactComponent as Telegram } from "@/assets/icons/telegram.svg"

import { buttonVariants } from "./Button"

import { cn } from "@/lib/classNames"
import { useAppSelector } from "@/redux/hooks"

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  withTgIcon?: boolean
}

const ExternalLink: React.FC<ExternalLinkProps> = React.forwardRef<
  HTMLAnchorElement,
  ExternalLinkProps
>(({ className, children, withTgIcon, ...props }, forwardedRef) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <a
      className={cn(
        "flex items-center gap-1.5 shrink-0",
        buttonVariants({ appearence: "outlined" }),
        scale &&
          "3xl:text-[0.911vw]/[0.911vw] 3xl:px-[0.651vw] 3xl:py-[0.195vw] 3xl:gap-[0.391vw]",
        className
      )}
      target="_blank"
      {...props}
      ref={forwardedRef}
    >
      {withTgIcon && (
        <Telegram
          className={cn(
            "w-[18px] h-[18px] shrink-0",
            scale && "3xl:w-[1.172vw] 3xl:h-[1.172vw]"
          )}
        />
      )}
      <span className="text-center">
      {children}

      </span>
      <ArrowTr
        className={cn(
          "w-3.5 h-3.5 shrink-0",
          scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
        )}
      />
    </a>
  )
})
ExternalLink.displayName = "ExternalLink"

export default ExternalLink
