import { useTranslation } from "react-i18next"

import RowItem from "@/shared/components/RowItem"

import ExternalLink from "@/shared/ui/ExternalLink"

import { useLinksQuery } from "@/redux/api/channels"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const ChatAndChannels = () => {
  const { t } = useTranslation("products")

  const scale = useAppSelector((state) => state.scale.value)
  const language = useAppSelector((state) => state.language.value)

  const { data: userLinks } = useLinksQuery({})

  const filteredLinks = userLinks?.filter(
    (link) => link.link.channel.lang === language
  )

  if (filteredLinks && filteredLinks.length > 0) {
    return (
      <RowItem
        className={cn(
          "items-start flex-col sm:flex-row gap-8",
          scale && "3xl:gap-[0.521vw]"
        )}
      >
        <span>{t("prime.channels-and-chats")}</span>
        <div
          className={cn(
            "flex flex-1 flex-wrap items-center sm:justify-end gap-2.5",
            scale && "3xl:gap-[0.8vw]"
          )}
        >
          {filteredLinks.map((link) => (
            <ExternalLink key={link.id} href={link.link.url} withTgIcon>
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
