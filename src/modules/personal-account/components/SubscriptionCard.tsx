import Button from "@/shared/ui/Button"

const SubscriptionCard = ({
  duration,
  discount,
  price,
}: {
  duration: string
  price: number
  discount?: { percent: number; amount: number }
}) => {
  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-1 dark:border-gray-3 pb-5">
      <span className="typography-text-2 text-white bg-gray-1 dark:bg-gray-2 w-full py-1.5 text-center rounded-t-xl mb-5">
        {duration}
      </span>
      <span className="font-semibold text-[40px] sm:text-[54px] dark:text-gray-5 mb-8">
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
      <Button className="w-[158px]">выбрать</Button>
    </div>
  )
}

export default SubscriptionCard
