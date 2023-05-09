import { useState } from "react"

import { DialogContent } from "../ui/Dialog"
import Button from "../ui/Button"
import Chip from "../ui/Chip"

const BalanceModal = () => {
  const [amount, setAmount] = useState("")

  return (
    <DialogContent className="lg:max-w-[710px]">
      <div>
        <div className="flex justify-between items-baseline gap-4 sm:gap-6 bg-gray-6 dark:bg-gray-2 rounded-xl p-3 mb-6">
          <span className="typography-text-0 text-gray-3 dark:text-gray-4">
            текущий баланс счёта
          </span>
          <span className="w-fit shrink-0 text-right font-semibold text-[40px] sm:text-[54px] dark:text-gray-5">
            $ 100
          </span>
        </div>
        <div className="flex items-center gap-2 mb-5 typography-text-1">
          <span>Выберите способ пополнения:</span>
          <span>банковская карта</span>
        </div>
        <input
          className="outline-none bg-transparent border-b border-gray-1 dark:border-gray-4 py-1 dark:placeholder:text-gray-2 mb-4 typography-text-1"
          placeholder="Сумма пополнения"
          value={amount}
          onChange={(evt) => setAmount(evt.currentTarget.value)}
        />
        <div className="flex items-center gap-2.5 mb-6">
          <Chip onClick={() => setAmount("5")}>$5</Chip>
          <Chip onClick={() => setAmount("10")}>$10</Chip>
          <Chip onClick={() => setAmount("20")}>$20</Chip>
          <Chip onClick={() => setAmount("50")}>$50</Chip>
          <Chip onClick={() => setAmount("100")}>$100</Chip>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <input type="checkbox" id="email_bill" />
          <label htmlFor="email_bill" className="typography-btn-additional">
            прислать чек на почту
          </label>
        </div>
        <Button>пополнить</Button>
      </div>
    </DialogContent>
  )
}

export default BalanceModal
