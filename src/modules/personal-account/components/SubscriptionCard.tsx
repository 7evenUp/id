import { useTranslation } from "react-i18next"

import Button from "@/shared/ui/Button"
import Text1 from "@/shared/typography/Text1"

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

  return (
    <div
      className={cn(
        "min-h-[247px] 3xl:min-h-[16.08vw] min-w-[188px] 3xl:min-w-[12.239vw] flex flex-col items-center rounded-xl 3xl:rounded-[0.781vw] border border-gray-1 dark:border-gray-3 pb-5 3xl:pb-[1.302vw]",
        selected && "min-h-[267px] 3xl:min-h-[17.382vw]"
      )}
    >
      <span className="typography-text-2 text-white bg-gray-1 dark:bg-gray-2 w-full py-1.5 3xl:py-[0.391vw] text-center rounded-t-xl 3xl:rounded-t-[0.781vw]">
        {duration}
      </span>
      <span
        className={cn(
          "font-semibold text-[40px] sm:text-[48px] 3xl:text-[3.125vw] dark:text-gray-5 mt-5 mb-8 3xl:mt-[1.302vw] 3xl:mb-[2.083vw]",
          selected && "mt-7 mb-10 3xl:mt-[1.823vw] 3xl:mb-[2.604vw]"
        )}
      >
        ${price}
      </span>
      <div className="flex flex-col items-center gap-1 px-6 mb-2 3xl:gap-[0.26vw] 3xl:px-[1.563vw] 3xl:mb-[0.521vw] mt-auto">
        {discount && (
          <div className="typography-text-2 flex items-center gap-1.5 3xl:gap-[0.391vw]">
            <span className="rounded-sm 3xl:rounded-[0.13vw] p-0.5 3xl:p-[0.13vw] text-gray-1 bg-gradient-to-r from-corral to-purple">
              -{discount.percent}%
            </span>
            <div className="bg-gray-1 rounded-sm 3xl:rounded-[0.13vw] px-1 3xl:px-[0.26vw] py-0.5 3xl:py-[0.13vw] w-fit">
              <span className="text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text">
                {t("buy-subs.first-step.savings")} {discount.amount}$
              </span>
            </div>
          </div>
        )}
        <Text1>
          {t("buy-subs.first-step.automatic-debiting")}
        </Text1>
      </div>
      <Button
        className={cn(
          "w-[158px] 3xl:w-[10.286vw] disabled:bg-gray-1 disabled:hover:bg-gray-1 disabled:text-white dark:disabled:bg-white dark:disabled:hover:bg-white dark:disabled:text-black",
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
