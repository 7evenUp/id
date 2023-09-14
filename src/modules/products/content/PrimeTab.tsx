import { useTranslation } from "react-i18next"

import { ReactComponent as ArrowDown } from "@/assets/icons/nav-arrow-down.svg"

import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"

import ExternalLink from "@/shared/ui/ExternalLink"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"

import RowItem from "@/shared/components/RowItem"

import { primeServices } from "@/utils/primeServices"

import { useLinksQuery } from "@/redux/api/channels"
import { useAppSelector } from "@/redux/hooks"
import Text1 from "@/shared/typography/Text1"
import Text2 from "@/shared/typography/Text2"

import { cn } from "@/lib/classNames"

const PrimeTab = () => {
  const { t } = useTranslation("products")

  const scale = useAppSelector((state) => state.scale.value)
  const language = useAppSelector((state) => state.language.value)

  const { data: userLinks } = useLinksQuery({})

  const filteredLinks = userLinks?.filter(
    (link) => link.link.channel.lang === language
  )

  return (
    <>
      <TabHeader>
        <TabTitle title="Prime" link="https://in-prime.crypton.xyz/" />
      </TabHeader>

      {filteredLinks && filteredLinks.length > 0 && (
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
      )}

      {language !== "en" && (
        <RowItem
          className={cn(
            "flex-col items-stretch gap-6",
            scale && "3xl:gap-[1.563vw]"
          )}
        >
          <div className="flex justify-between items-center">
            <span>{t("prime.services-and-nav")}</span>
            <ExternalLink href="https://member.crypton.xyz/">
              {t("prime.prime-nav")}
            </ExternalLink>
          </div>
          <div
            className={cn(
              "flex flex-col md:flex-row lg:flex-col xl:flex-row xl:justify-between gap-5",
              scale && "3xl:gap-[1.302vw]"
            )}
          >
            <div
              className={cn(
                "flex flex-wrap w-full mobile:w-auto mobile:min-w-[340px] mobile:max-w-[340px] 2xl:max-w-[420px] py-3 px-4 bg-white dark:bg-gray-1 rounded-xl",
                scale &&
                  "3xl:max-w-[25vw] 3xl:py-[0.781vw] 3xl:px-[1.041vw] 3xl:rounded-[0.781vw]"
              )}
            >
              {primeServices.map((service, i) =>
                service.isExpandable ? (
                  <Popover key={i}>
                    <PopoverTrigger
                      className={cn(
                        "group h-7 flex items-center gap-2 basis-1/2 text-gray-1 dark:text-gray-4 hover:text-prime-pink dark:hover:text-prime-pink text-left",
                        scale && "3xl:h-[1.822vw] 3xl:gap-[0.521vw]"
                      )}
                    >
                      <Text2>{service.name}</Text2>

                      <ArrowDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform will-change-transform group-data-[state=open]:rotate-180",
                          scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
                        )}
                      />
                    </PopoverTrigger>
                    <PopoverContent
                      className={cn(
                        "flex flex-col gap-1.5",
                        scale && "3xl:gap-[0.391vw]"
                      )}
                      sideOffset={-2}
                    >
                      {service.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.href}
                          target="_blank"
                          className={cn(
                            "py-1 typography-text-2 text-gray-1 dark:text-gray-4 hover:text-prime-pink dark:hover:text-prime-pink",
                            scale && "typography-text-2_large 3xl:py-[0.26vw]"
                          )}
                        >
                          {link.name}
                        </a>
                      ))}
                    </PopoverContent>
                  </Popover>
                ) : (
                  <a
                    href={service.href}
                    target="_blank"
                    key={i}
                    className={cn(
                      "h-7 flex items-center typography-text-2 basis-1/2 text-gray-1 dark:text-gray-4 hover:text-prime-pink dark:hover:text-prime-pink",
                      scale && "typography-text-2_large 3xl:h-[1.822vw]"
                    )}
                  >
                    {service.name}
                  </a>
                )
              )}
            </div>
            <div className="flex flex-col gap-3.5 py-3 px-4 3xl:gap-[0.911vw] 3xl:py-[0.781vw] 3xl:px-[1.041vw] bg-white dark:bg-gray-1 rounded-xl 3xl:rounded-[0.781vw] w-fit">
              <Text1 className="lg:max-w-prose">{t("prime.nav-text-1")}</Text1>
              <Text1 className="lg:max-w-prose">{t("prime.nav-text-2")}</Text1>
              <Text1 className="lg:max-w-prose">{t("prime.nav-text-3")}</Text1>
            </div>
          </div>
        </RowItem>
      )}
      <RowItem className="flex-col items-stretch gap-3 3xl:gap-[0.781vw]">
        <div className="flex justify-between items-center">
          <span>{t("prime.help")}</span>
        </div>
        <div className="flex flex-col gap-6 sm:gap-4 3xl:gap-[1.042vw]">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0">
            <Text1 className="max-w-prose w-auto sm:w-[62%] xl:w-auto">
              {t("prime.help-text-1")}
            </Text1>
            <ExternalLink
              withTgIcon
              href="https://t.me/crypton_support"
              className="w-fit"
            >
              {t("prime.mentor")}
            </ExternalLink>
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0">
            <Text1 className="max-w-prose w-auto sm:w-[62%] xl:w-auto">
              {t("prime.help-text-2")}
            </Text1>
            <ExternalLink href="#" className="w-fit">
              возможности Prime
            </ExternalLink>
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0">
            <Text1 className="max-w-prose w-auto sm:w-[62%] xl:w-auto">
              {t("prime.help-text-3")}
            </Text1>
            <ExternalLink href="#" className="w-fit">
              план действий
            </ExternalLink>
          </div>
        </div>
      </RowItem>
      <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row justify-between gap-3 py-2 3xl:gap-[0.781vw] 3xl:py-[0.521vw] dark:text-gray-4">
        <span>{t("prime.feedback")}</span>
        <div className="flex gap-2.5 3xl:gap-[0.651vw] flex-col sm:flex-row">
          <ExternalLink
            href="https://t.me/reviews_prime"
            className="w-fit sm:w-auto"
          >
            {t("prime.leave-review")}
          </ExternalLink>
          <ExternalLink
            href="https://t.me/crypton_support"
            className="w-fit sm:w-auto"
          >
            {t("prime.leave-feedback")}
          </ExternalLink>
        </div>
      </div>
    </>
  )
}

export default PrimeTab
