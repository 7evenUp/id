import { useTranslation } from "react-i18next"

import Scroller from "../components/promo/Scroller"

import Subheading from "@/shared/typography/Subheading"
import Text0 from "@/shared/typography/Text0"
import Text2 from "@/shared/typography/Text2"

import { useAppSelector } from "@/redux/hooks"
import { useLastContainerOpenResultsQuery } from "@/redux/api/crypton-events"

import { cn } from "@/lib/classNames"

const PromoTab = () => {
  const { t } = useTranslation("products")

  const scale = useAppSelector((state) => state.scale.value)

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

      <Text0 className="mb-3.5 mt-9">{t("Последние подарки")}</Text0>

      <div className="flex items-center flex-wrap gap-x-5 gap-y-6">
        {lastOpenedContainers &&
          lastOpenedContainers.length !== 0 &&
          lastOpenedContainers.map((lastOpen, i) => (
            <div className="flex flex-col gap-3 w-[120px]" key={i}>
              <img
                src={lastOpen.prizeImageUrl}
                className="bg-gray-2 rounded-[10px] w-full aspect-square"
              />
              <Text2>{lastOpen.prizeTitle}</Text2>
              <div className="flex items-center gap-1">
                <div className="w-[18px] h-[18px] rounded-full bg-gray-3" />
                <Text2>{lastOpen.userProfileName}</Text2>
              </div>
              <Text0 className="text-white/50">12 мин назад</Text0>
            </div>
          ))}
      </div>
    </div>
  )
}

export default PromoTab
