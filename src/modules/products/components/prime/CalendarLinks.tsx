import { useTranslation } from "react-i18next"
import { isMobile } from "react-device-detect"

import HelpCircle from "@/assets/icons/help-circle.svg?react"

import UpdateTelegram from "@/modules/personal-account/modals/UpdateTelegram"

import RowItem from "@/shared/components/RowItem"

import ExternalLink from "@/shared/ui/ExternalLink"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/HoverCard"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"
import { Dialog, DialogTrigger } from "@/shared/ui/Dialog"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const LINKS = [
  {
    name: "Crypton Drops Calendar (Web)",
    url: "https://calendar.crypton.xyz/events",
    isTelegramLink: false,
  },
  {
    name: "Crypton Drops Calendar",
    url: "https://t.me/Crypton_Calendar_bot",
    isTelegramLink: true,
  },
  {
    name: "Календарь - Crypton Prime",
    url: "https://t.me/+wsr1Zi2eWh9lODUy",
    isTelegramLink: true,
  },
]

const CalendarLinks = () => {
  const { t } = useTranslation("products")

  const scale = useAppSelector((state) => state.scale.value)

  const { data: userProfile } = useUserProfileQuery()

  if (!userProfile) return null

  const { telegramId } = userProfile

  return (
    <RowItem
      className={cn(
        "items-start flex-col sm:flex-row gap-8",
        scale && "3xl:gap-[0.521vw]"
      )}
    >
      <span className="relative">
        {t("prime.Календарь")}
        {telegramId ? null : isMobile ? (
          <Popover>
            <PopoverTrigger asChild role="button">
              <span>
                <HelpCircle className="absolute -right-2 top-1/2 translate-x-full -translate-y-1/2 w-4 h-4 cursor-pointer" />
              </span>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[300px]">
              <p>
                {t("prime.tg-not-synced-yet-first")}
                <a
                  className="text-res-bot-blue underline underline-offset-4 hover:opacity-70"
                  href={import.meta.env.VITE_TG_BOT_LINK}
                  target="_blank"
                >
                  {t("prime.tg-not-synced-yet-link")}
                </a>
                {t("prime.tg-not-synced-yet-second")}
              </p>
            </PopoverContent>
          </Popover>
        ) : (
          <HoverCard openDelay={200}>
            <HoverCardTrigger>
              <HelpCircle
                className={cn(
                  "absolute -right-2 top-1/2 translate-x-full -translate-y-1/2 w-[18px] h-[18px] 2xl:w-5 2xl:h-5 cursor-pointer",
                  scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw]"
                )}
              />
            </HoverCardTrigger>
            <HoverCardContent className="2xl:w-[400px]">
              <p>
                {t("prime.tg-not-synced-yet-first")}
                <a
                  className="text-res-bot-blue underline underline-offset-4 hover:opacity-70"
                  href={import.meta.env.VITE_TG_BOT_LINK}
                  target="_blank"
                >
                  {t("prime.tg-not-synced-yet-link")}
                </a>
                {t("prime.tg-not-synced-yet-second")}
              </p>
            </HoverCardContent>
          </HoverCard>
        )}
      </span>
      <div
        className={cn(
          "flex flex-1 flex-wrap items-center sm:justify-end gap-2.5",
          scale && "3xl:gap-[0.8vw]"
        )}
      >
        {LINKS.map((link, i) => {
          if (!link.isTelegramLink)
            return (
              <ExternalLink
                key={i}
                href={link.url}
                withTgIcon={link.isTelegramLink}
                className="shrink"
              >
                {link.name}
              </ExternalLink>
            )

          if (telegramId)
            return (
              <ExternalLink
                key={i}
                href={link.url}
                withTgIcon={link.isTelegramLink}
                className="shrink"
              >
                {link.name}
              </ExternalLink>
            )

          return (
            <Dialog key={i}>
              <DialogTrigger asChild>
                <ExternalLink
                  withTgIcon={link.isTelegramLink}
                  className="shrink cursor-pointer"
                >
                  {link.name}
                </ExternalLink>
              </DialogTrigger>
              <UpdateTelegram />
            </Dialog>
          )
        })}
      </div>
    </RowItem>
  )
}

export default CalendarLinks
