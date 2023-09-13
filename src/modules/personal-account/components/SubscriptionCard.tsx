import { useTranslation } from "react-i18next"

import Button from "@/shared/ui/Button"

import Text1 from "@/shared/typography/Text1"
import Text2 from "@/shared/typography/Text2"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const SubscriptionCard = ({
  duration,
  discount,
  selected,
  onSelect,
  price,
}: {
  duration: string
  price: number
  selected: boolean
  onSelect: () => void
  discount: { percent: number; amount: number } | null
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
          "font-semibold text-[40px] sm:text-[48px] dark:text-gray-5 mt-5 mb-8",
          scale && "3xl:text-[3.125vw] 3xl:mt-[1.302vw] 3xl:mb-[2.083vw]",
          selected && "mt-7 mb-10",
          selected && scale && "3xl:mt-[1.823vw] 3xl:mb-[2.604vw]"
        )}
      >
        ${price}
      </span>
      <div
        className={cn(
          "flex flex-col items-center gap-1 px-6 mb-2 mt-auto",
          scale && "3xl:gap-[0.26vw] 3xl:px-[1.563vw] 3xl:mb-[0.521vw]"
        )}
      >
        {discount && (
          <div
            className={cn(
              "flex items-center gap-1.5",
              scale && "3xl:gap-[0.391vw]"
            )}
          >
            <Text2
              className={cn(
                "rounded-sm p-0. text-gray-1 bg-gradient-to-r from-corral to-purple",
                scale && "3xl:rounded-[0.13vw]  3xl:p-[0.13vw]"
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
        <Text1>{t("buy-subs.first-step.automatic-debiting")}</Text1>
      </div>
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
  )
}

export default SubscriptionCard
