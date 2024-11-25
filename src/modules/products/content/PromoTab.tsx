import { useTranslation } from "react-i18next"
import { formatDistanceToNow } from "date-fns"
import { ru, enUS } from "date-fns/locale"

import Scroller from "../components/promo/Scroller"
import InfoDialog from "../components/promo/Scroller/InfoDialog"

import Subheading from "@/shared/typography/Subheading"
import Text0 from "@/shared/typography/Text0"
import Text1 from "@/shared/typography/Text1"

import { useAppSelector } from "@/redux/hooks"
import { useLastContainerOpenResultsQuery } from "@/redux/api/crypton-events"

import { cn } from "@/lib/classNames"

const PromoTab = () => {
  const { t } = useTranslation("products")

  const scale = useAppSelector((state) => state.scale.value)
  const lang = useAppSelector((state) => state.language.value)

  const { data: lastOpenedContainers } = useLastContainerOpenResultsQuery()

  return (
    <div
      className={cn("typography-text-0", scale && "typography-text-0_large")}
    >
      <div className="border-b border-gray-4 dark:border-gray-1" />
      <Subheading
        className={cn(
          "mt-5 pb-6",
          scale && "3xl:mt-[1.302vw] 3xl:pb-[1.5625vw]"
        )}
      >
        {t("Акция “День Рождения Crypton”")}
      </Subheading>

      <Text0>
        {t(
          "Покупайте подписку Prime и получайте возможность выиграть топовый подарок!"
        )}
      </Text0>

      <Text0 className="mb-12 mt-5">
        {t(
          "За каждый месяц подписки вы получаете 1 открытие бокса с подарками, за подписку на 3 мес. - 3 открытия боксов, на 6 мес. - 6 открытий и на 12 мес. - 12 подарков."
        )}
      </Text0>

      <Scroller />

      <Text0 className="mb-3.5 mt-9 text-center mobile-sm:text-left">
        {t("Последние подарки")}
      </Text0>

      <div className="flex flex-col items-center mobile-sm:flex-row mobile-sm:items-stretch mobile-sm:flex-wrap gap-x-5 gap-y-6">
        {lastOpenedContainers &&
          lastOpenedContainers.length !== 0 &&
          lastOpenedContainers.map((lastOpen, i) => (
            <InfoDialog
              image={lastOpen.prizeImageUrl}
              title={lastOpen.prizeTitle}
              description={lastOpen.prizeDescription}
              getgemsLink={lastOpen.prizeNftImageUrl}
              key={i}
            >
              <div className="flex flex-col gap-3 w-[250px] mobile-sm:w-[160px]">
                <img
                  src={lastOpen.prizeImageUrl}
                  className="bg-gray-2 rounded-[10px] w-full aspect-square object-cover"
                />
                <div className="flex items-center gap-1 mt-auto">
                  <img
                    className="shrink-0 w-6 h-6 bg-gray-3 rounded-full object-cover"
                    src={lastOpen.userProfileAvatar}
                  />
                  <Text0 className="truncate">{lastOpen.userProfileName}</Text0>
                </div>
                {lastOpen.openedDatetime && (
                  <Text1 className="text-gray-2 dark:text-white/50 text-left">
                    {formatDistanceToNow(new Date(lastOpen.openedDatetime), {
                      addSuffix: true,
                      locale: lang === "ru" ? ru : enUS,
                    })}
                  </Text1>
                )}
              </div>
            </InfoDialog>
          ))}
      </div>
    </div>
  )
}

export default PromoTab
