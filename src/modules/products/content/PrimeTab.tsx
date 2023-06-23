import { useTranslation } from "react-i18next"

import { ReactComponent as ArrowDown } from "@/assets/icons/nav-arrow-down.svg"

import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"

import ExternalLink from "@/shared/ui/ExternalLink"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"

import RowItem from "@/shared/components/RowItem"

import { primeServices } from "@/utils/primeServices"

import { useChannelsQuery } from "@/redux/api/channels"

const PrimeTab = () => {
  const { t } = useTranslation("products")

  const { data: channels } = useChannelsQuery()

  return (
    <>
      <TabHeader>
        <TabTitle title="Prime" link="https://in-prime.crypton.xyz/" />
      </TabHeader>
      {channels && (
        <RowItem className="items-baseline flex-col sm:flex-row gap-2">
          <span>{t("prime.channels-and-chats")}</span>
          <div className="flex items-center sm:justify-end gap-[10px] flex-wrap max-w-[360px]">
            {channels.map((channel) => (
              <ExternalLink
                key={channel.id}
                href={channel.mainLink || ""}
                withTgIcon
              >
                {channel.name}
              </ExternalLink>
            ))}
          </div>
        </RowItem>
      )}

      <RowItem className="flex-col items-stretch gap-6">
        <div className="flex justify-between items-center">
          <span>{t("prime.services-and-nav")}</span>
          <ExternalLink href="https://member.crypton.xyz/">
            {t("prime.prime-nav")}
          </ExternalLink>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row xl:justify-between gap-5">
          <div className="flex flex-wrap w-full mobile:w-auto mobile:min-w-[340px] mobile:max-w-[340px] mobile:h-[150px] py-3 px-6 bg-white dark:bg-gray-1 rounded-xl">
            {primeServices.map((service, i) =>
              service.isExpandable ? (
                <Popover key={i}>
                  <PopoverTrigger className="group flex items-center gap-2 typography-text-2 basis-1/2 text-gray-1 dark:text-gray-4 hover:text-prime-pink dark:hover:text-prime-pink p-1 mobile:p-0 text-left">
                    {service.name}
                    <ArrowDown className="w-3.5 h-3.5 transition-transform will-change-transform group-data-[state=open]:rotate-180" />
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-1.5">
                    {service.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.href}
                        target="_blank"
                        className="typography-text-2 text-gray-1 dark:text-gray-4 hover:text-prime-pink dark:hover:text-prime-pink"
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
                  className="flex items-center typography-text-2 basis-1/2 text-gray-1 dark:text-gray-4 hover:text-prime-pink dark:hover:text-prime-pink p-1 mobile:p-0"
                >
                  {service.name}
                </a>
              )
            )}
          </div>
          <div className="flex flex-col gap-[14px] py-3 px-6 bg-white dark:bg-gray-1 rounded-xl typography-text-1 w-fit">
            <p className="lg:max-w-prose">{t("prime.nav-text-1")}</p>
            <p className="lg:max-w-prose">{t("prime.nav-text-2")}</p>
            <p className="lg:max-w-prose">{t("prime.nav-text-3")}</p>
          </div>
        </div>
      </RowItem>
      <RowItem className="flex-col items-stretch gap-3">
        <div className="flex justify-between items-center">
          <span>{t("prime.help")}</span>
        </div>
        <div className="flex flex-col gap-6 sm:gap-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0">
            <p className="max-w-prose typography-text-1 w-auto sm:w-[62%] xl:w-auto">
              {t("prime.help-text-1")}
            </p>
            <ExternalLink
              withTgIcon
              href="https://t.me/crypton_support"
              className="w-fit"
            >
              {t("prime.mentor")}
            </ExternalLink>
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0">
            <p className="max-w-prose typography-text-1 w-auto sm:w-[62%] xl:w-auto">
              {t("prime.help-text-2")}
            </p>
            <ExternalLink href="#" className="w-fit">
              возможности Prime
            </ExternalLink>
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0">
            <p className="max-w-prose typography-text-1 w-auto sm:w-[62%] xl:w-auto">
              {t("prime.help-text-3")}
            </p>
            <ExternalLink href="#" className="w-fit">
              план действий
            </ExternalLink>
          </div>
        </div>
      </RowItem>
      <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row justify-between gap-3 py-2 dark:text-gray-4">
        <span>{t("prime.feedback")}</span>
        <div className="flex gap-2.5 flex-col sm:flex-row">
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
