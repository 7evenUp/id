import ModalHeader from "../components/SubscriptionModalHeader"
import SubscriptionModalFooter from "../components/SubscriptionModalFooter"

import { Dialog, DialogContent } from "@/components/ui/Dialog"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

const SecondStepModal = ({
  open,
  onOpenChange,
  openThirdStep,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  openThirdStep: () => void
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pb-14 sm:pb-14 sm:max-w-[560px] md:max-w-[650px] xmd:max-w-[800px]">
        <ModalHeader label="шаг 2/3: Ввод данных" />

        <div className="flex flex-col-reverse md:flex-row justify-between gap-6 md:gap-10 lg:gap-[140px]">
          <div className="flex flex-col">
            <div className="flex flex-col gap-4 w-[270px]">
              <div className="flex items-center justify-between gap-10">
                <span className="typography-text-0">Почта</span>
                <Input type="email" placeholder="Введите вашу почту" />
              </div>
              <div className="flex items-center justify-between gap-10">
                <span className="typography-text-0">Телеграм</span>
                <Input type="email" placeholder="Введите ваш @telegram" />
              </div>
              <div className="flex items-center justify-between gap-10">
                <span className="typography-text-0">Discord</span>
                <Input type="email" placeholder="Введите ваш @discord" />
              </div>
              <div className="flex items-center justify-between gap-10">
                <span className="typography-text-0">EVM-кошелёк</span>
                <Button>подключить</Button>
              </div>
            </div>
            <p className="typography-tip mt-4">
              Изменить данные можно будет позже в Личном кабинете, в разделе
              «Профиль»
            </p>
            <Button
              className="md:hidden mt-6 w-fit self-end"
              onClick={() => openThirdStep()}
            >
              продолжить
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="typography-head text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text">
              ПОЗДРАВЛЯЕМ
            </h3>
            <p className="typography-text-0">
              Подписка Prime на 1 месяц приобретена! Пожалуйста, укажите
              следующие данные, чтобы получить доступ ко всем сервисам Prime.
            </p>
            <Button
              className="mt-auto w-fit hidden md:flex"
              onClick={() => openThirdStep()}
            >
              продолжить
            </Button>
          </div>
        </div>
        <SubscriptionModalFooter />
      </DialogContent>
    </Dialog>
  )
}

export default SecondStepModal
