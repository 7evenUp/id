import { ReactComponent as PrimeIcon } from "@/assets/Prime.svg"

import SubscriptionModalHeader from "../components/SubscriptionModalHeader"
import SubscriptionModalFooter from "../components/SubscriptionModalFooter"
import SubscriptionCard from "../components/SubscriptionCard"

import { Dialog, DialogContent } from "@/components/ui/Dialog"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

const FirstStepModal = ({
  open,
  onOpenChange,
  openSecondStep,
  openBalanceModal,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  openSecondStep: () => void
  openBalanceModal: () => void
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pb-14 sm:pb-14 sm:max-w-[560px] lg:max-w-[910px]">
        <SubscriptionModalHeader label="шаг 1/3: Выбор тарифа" />

        <div className="h-[400px] lg:h-auto overflow-y-auto pr-2 pb-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
            <div className="flex items-center gap-3">
              <PrimeIcon className="dark:fill-gray-5" />
              <span className="typography-head">Prime</span>
            </div>
            <p className="typography-text-1 max-w-[464px]">
              Эффективные стратегии по увеличению заработка при ощутимой
              экономии личного времени. Команда Prime тщательно отбирает самые
              знаковые события и формирует способы заработка как для новичков,
              так и для продвинутых пользователей.
            </p>
          </div>
          <div className="flex flex-col flex-wrap mobile:flex-row gap-3 sm:gap-5 mb-6">
            <SubscriptionCard duration="1 месяц" price={45} />
            <SubscriptionCard
              duration="3 месяца"
              price={128}
              discount={{ percent: 5, amount: 7 }}
            />
            <SubscriptionCard
              duration="6 месяцев"
              price={243}
              discount={{ percent: 10, amount: 27 }}
            />
            <SubscriptionCard
              duration="12 месяцев"
              price={459}
              discount={{ percent: 15, amount: 99 }}
            />
          </div>
          <div className="flex items-center gap-2 mb-5">
            <Input placeholder="введите промокод" />
            <Button>готово</Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex flex-col gap-0.5">
              <span className="typography-head">Итого: $116</span>
              <span className="typography-tip text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text">
                Убедитесь в наличии средств на балансе
              </span>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-5">
              <Button
                onClick={() => {
                  openBalanceModal()
                }}
              >
                пополнить баланс
              </Button>
              <Button
                onClick={() => {
                  openSecondStep()
                }}
              >
                оплатить
              </Button>
            </div>
          </div>
        </div>

        <SubscriptionModalFooter />
      </DialogContent>
    </Dialog>
  )
}

export default FirstStepModal
