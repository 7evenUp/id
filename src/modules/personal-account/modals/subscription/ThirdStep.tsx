import { DialogClose } from "@radix-ui/react-dialog"

import SubscriptionModalHeader from "../../components/SubscriptionModalHeader"
import SubscriptionModalFooter from "../../components/SubscriptionModalFooter"

import { Dialog, DialogContent } from "@/shared/ui/Dialog"
import ExternalLink from "@/shared/ui/ExternalLink"
import Button from "@/shared/ui/Button"

const ThirdStep = ({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pb-14 sm:pb-14 sm:max-w-[560px] md:max-w-[650px] xmd:max-w-[820px] lg:max-w-[940px]">
        <SubscriptionModalHeader label="шаг 3/3: Ресурсы Prime" />
        <div className="flex flex-col h-[400px] lg:h-auto overflow-auto pr-2 divide-y divide-gray-4 dark:divide-gray-2">
          <div className="flex flex-col-reverse md:flex-row justify-between gap-10 py-5">
            <div className="md:w-[350px]">
              <div className="flex flex-wrap gap-3">
                <ExternalLink withTgIcon href="#">
                  канал Prime
                </ExternalLink>
                <ExternalLink withTgIcon href="#">
                  основной чат
                </ExternalLink>
                <ExternalLink withTgIcon href="#">
                  NFT чат
                </ExternalLink>
                <ExternalLink href="#">сервер в Discord</ExternalLink>
                <ExternalLink withTgIcon href="#">
                  чат технической взаимопомощи
                </ExternalLink>
              </div>
              <p className="typography-tip mt-5">
                Найти ссылки на вступление можно также в Личном кабинете, в
                Настройках Prime.
              </p>
            </div>
            <div className="md:w-[450px]">
              <h3 className="typography-head text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text mb-4">
                ОБЩАЙТЕСЬ
              </h3>
              <p className="typography-text-0 mb-2">
                Весь контент Prime сосредоточен в Telegram-канале Prime и чатах,
                поэтому вступайте, развивайтесь вместе с единомышленниками,
                монетизируйте свои знания.
              </p>
              <p className="typography-text-0">
                Вы также можете ознакомиться со всеми сервисами и возможностями
                Prime или перейти к навигации по Prime.
              </p>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between gap-10 py-5">
            <div className="md:w-[350px]">
              <ExternalLink href="#" className="w-fit">
                Crypton Lobby
              </ExternalLink>
            </div>
            <div className="md:w-[450px]">
              <h3 className="typography-head text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text mb-4">
                ПОЛУЧАЙТЕ БОНУСЫ
              </h3>
              <p className="typography-text-0">
                Активируй бота управления подпиской Crypton Lobby в Telegram и
                синхронизируй с веб-кабинетом, чтобы получать специальные
                предложения, ежемесячную долю от инвестфонда SHARES и другие
                уведомления о сервисе Prime.
              </p>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between gap-10 py-5">
            <div className="md:w-[350px]">
              <ExternalLink href="#" className="w-fit">
                Calendar
              </ExternalLink>
            </div>
            <div className="md:w-[450px]">
              <h3 className="typography-head text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text mb-4">
                СЛЕДИТЕ ЗА СОБЫТИЯМИ
              </h3>
              <p className="typography-text-0 md:mb-6">
                Пользуйся календарём, чтобы проявить себя в актуальных и
                прибыльных событиях мира криптовалют. Календарь существенно
                сэкономит время и в разы повысит твою продуктивность.
              </p>
              <DialogClose asChild className="hidden md:flex">
                <Button>готово</Button>
              </DialogClose>
            </div>
          </div>
        </div>

        {/* Vissible on Mobile */}
        <div className="pb-2 text-right block md:hidden">
          <DialogClose asChild className="w-fit">
            <Button>готово</Button>
          </DialogClose>
        </div>
        <SubscriptionModalFooter />
      </DialogContent>
    </Dialog>
  )
}

export default ThirdStep
