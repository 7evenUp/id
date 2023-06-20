import Button from "@/shared/ui/Button"

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
  return (
    <div
      className={cn(
        "min-h-[247px] flex flex-col items-center rounded-xl border border-gray-1 dark:border-gray-3 pb-5",
        selected && "min-h-[267px]"
      )}
    >
      <span className="typography-text-2 text-white bg-gray-1 dark:bg-gray-2 w-full py-1.5 text-center rounded-t-xl">
        {duration}
      </span>
      <span
        className={cn(
          "font-semibold text-[40px] sm:text-[48px] dark:text-gray-5 mt-5 mb-8",
          selected && "mt-7 mb-10"
        )}
      >
        ${price}
      </span>
      <div className="flex flex-col items-center gap-1 px-6 mt-auto mb-2">
        {discount && (
          <div className="typography-text-2 flex items-center gap-1.5">
            <span className="rounded-sm p-0.5 text-gray-1 bg-gradient-to-r from-corral to-purple">
              -{discount.percent}%
            </span>
            <div className="bg-gray-1 rounded-sm px-1 py-0.5 w-fit">
              <span className="text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text">
                экономия {discount.amount}$
              </span>
            </div>
          </div>
        )}
        <span className="typography-text-1">автоматическое списание</span>
      </div>
      <Button
        className={cn(
          "w-[158px] disabled:bg-gray-1 disabled:hover:bg-gray-1 disabled:text-white dark:disabled:bg-white dark:disabled:hover:bg-white dark:disabled:text-black",
          selected && "bg-gray-1 text-white dark:bg-white dark:text-black"
        )}
        disabled={selected}
        onClick={onSelect}
      >
        {selected ? "выбрано" : "выбрать"}
      </Button>
    </div>
  )
}

export default SubscriptionCard
