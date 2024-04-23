import { useTranslation } from "react-i18next"
import { isMobile } from "react-device-detect"

import HelpCircle from "@/assets/icons/help-circle.svg?react"

import RowItem from "@/shared/components/RowItem"

import ExternalLink from "@/shared/ui/ExternalLink"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/HoverCard"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"

import { useLinksQuery } from "@/redux/api/channels"
import { useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const ChatAndChannels = () => {
  const { t } = useTranslation("products")

  const scale = useAppSelector((state) => state.scale.value)
  // const language = useAppSelector((state) => state.language.value)

  const { data: userLinks } = useLinksQuery({})
  const { data: userProfile } = useUserProfileQuery()

  if (!userProfile) return null

  const { telegramId } = userProfile

  // const filteredLinks = userLinks?.filter(
  //   (link) => link.link.channel.lang === language
  // )

  if (userLinks && userLinks.length > 0) {
    return (
      <RowItem
        className={cn(
          "items-start flex-col sm:flex-row gap-8",
          scale && "3xl:gap-[0.521vw]"
        )}
      >
        <span className="relative">
          {t("prime.channels-and-chats")}
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
          {userLinks.map((link) => (
            <ExternalLink
              key={link.id}
              href={link.link.url}
              withTgIcon
              className="shrink"
            >
              {link.link.channel.name}
            </ExternalLink>
          ))}
        </div>
      </RowItem>
    )
  }

  return null
}

export default ChatAndChannels
