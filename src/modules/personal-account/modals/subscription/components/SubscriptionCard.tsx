import { useTranslation } from "react-i18next"
import { isDesktop } from "react-device-detect"

import GiftIcon from "@/assets/icons/gift.svg?react"

import Button from "@/shared/ui/Button"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/HoverCard"

import Text0 from "@/shared/typography/Text0"
import Text1 from "@/shared/typography/Text1"
import Text2 from "@/shared/typography/Text2"

import { useAppSelector } from "@/redux/hooks"

import { SubscriptionBenefit } from "@/types/subscriptions"

import { cn } from "@/lib/classNames"

const SubscriptionCard = ({
  duration,
  discount,
  selected,
  onSelect,
  price,
  prizes,
}: {
  duration: string
  price: number
  selected: boolean
  onSelect: () => void
  discount: { percent: number; amount: number } | null
  prizes?: SubscriptionBenefit[]
}) => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  return (
    <div
      className={cn(
        "min-h-[247px] min-w-[188px] flex flex-col items-center rounded-xl border border-gray-1 dark:border-gray-3 pb-5",
        scale &&
          "3xl:min-h-[16.08vw] 3xl:min-w-[12.239vw] 3xl:rounded-[0.781vw] 3xl:pb-[1.302vw]",
        selected && "min-h-[267px]",
        selected && scale && "3xl:min-h-[17.382vw]"
      )}
    >
      <Text2
        className={cn(
          "text-white bg-gray-1 dark:bg-gray-2 w-full py-1.5 text-center rounded-t-xl",
          scale && "3xl:py-[0.391vw] 3xl:rounded-t-[0.781vw]"
        )}
      >
        {duration}
      </Text2>
      <span
        className={cn(
          "font-semibold text-[40px] sm:text-[48px] dark:text-gray-5 mt-5",
          scale && "3xl:text-[3.125vw] 3xl:mt-[1.302vw]",
          selected && "mt-7",
          selected && scale && "3xl:mt-[1.823vw]"
        )}
      >
        ${price}
      </span>
      {discount && (
        <div
          className={cn(
            "flex items-center gap-1.5",
            scale && "3xl:gap-[0.391vw]"
          )}
        >
          <Text2
            className={cn(
              "rounded-sm px-1 py-0.5 text-gray-1 bg-gradient-to-r from-corral to-purple",
              scale && "3xl:rounded-[0.13vw] 3xl:px-[0.26vw] 3xl:py-[0.13vw]"
            )}
          >
            -{discount.percent}%
          </Text2>
          <div
            className={cn(
              "bg-gray-1 rounded-sm px-1 py-0.5 w-fit",
              scale && "3xl:rounded-[0.13vw] 3xl:px-[0.26vw] 3xl:py-[0.13vw]"
            )}
          >
            <Text2 className="text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text">
              {t("buy-subs.first-step.savings")} {discount.amount}$
            </Text2>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center mt-auto">
        {prizes &&
          prizes.length > 0 &&
          (isDesktop ? (
            <HoverCard openDelay={150}>
              <HoverCardTrigger
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded px-2 py-1 mb-3 text-black dark:text-gray-5 bg-gray-5/25 dark:bg-gray-2/50 hover:bg-gray-5/[0.15] dark:hover:bg-gray-2/30 transition-colors cursor-pointer",
                  scale &&
                    "3xl:rounded-[0.26vw] 3xl:px-[0.52vw] 3xl:py-[0.26vw] 3xl:mb-[0.78125vw] 3xl:gap-[0.36vw]"
                )}
              >
                <GiftIcon
                  className={cn(
                    "w-4 h-4",
                    scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw]"
                  )}
                />
                <Text0>{t("buy-subs.first-step.bonuses")}</Text0>
              </HoverCardTrigger>
              <HoverCardContent
                className={cn(
                  "flex flex-col gap-1 w-[280px]",
                  scale && "3xl:gap-[0.26vw] 3xl:w-[19vw]"
                )}
              >
                {prizes.map((prize) => (
                  <Text1 key={prize.id}>
                    - {prize.translations.ru.name}{" "}
                    {prize.remainingCount && (
                      <span>(осталось {prize.remainingCount})</span>
                    )}
                  </Text1>
                ))}
              </HoverCardContent>
            </HoverCard>
          ) : (
            <Popover>
              <PopoverTrigger
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded px-2 py-1 mb-3 text-black dark:text-gray-5 bg-gray-5/25 dark:bg-gray-2/50 hover:bg-gray-5/[0.15] dark:hover:bg-gray-2/30 transition-colors cursor-pointer",
                  scale &&
                    "3xl:rounded-[0.26vw] 3xl:px-[0.52vw] 3xl:py-[0.26vw] 3xl:gap-[0.36vw]"
                )}
              >
                <GiftIcon
                  className={cn(
                    "w-4 h-4",
                    scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw]"
                  )}
                />
                <Text0>Бонусы</Text0>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-1 w-[280px]">
                {prizes.map((prize) => (
                  <Text1>
                    - {prize.translations.ru.name}{" "}
                    {prize.remainingCount && (
                      <span>(осталось {prize.remainingCount})</span>
                    )}
                  </Text1>
                ))}
              </PopoverContent>
            </Popover>
          ))}
        <Button
          className={cn(
            "w-[158px] disabled:bg-gray-1 disabled:hover:bg-gray-1 disabled:text-white dark:disabled:bg-white dark:disabled:hover:bg-white dark:disabled:text-black",
            scale && "3xl:w-[10.286vw]",
            selected && "bg-gray-1 text-white dark:bg-white dark:text-black"
          )}
          disabled={selected}
          onClick={onSelect}
        >
          {selected
            ? t("buy-subs.first-step.chosen-btn")
            : t("buy-subs.first-step.choose-btn")}
        </Button>
      </div>
    </div>
  )
}

export default SubscriptionCard
