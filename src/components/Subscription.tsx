import { BsSnow } from "react-icons/bs"

import TxHistoryModal from "./modals/TxHistoryModal"
import FreezeSubsModal from "./modals/FreezeSubsModal"
import BalanceModal from "./modals/BalanceModal"
import SubscriptionMainModal from "./modals/subscription"

import ModalTrigger from "./ModalTrigger"
import RowItem from "./RowItem"

import AccentNumber from "./typography/AccentNumber"
import Subheading from "./typography/Subheading"

import IconButton from "./ui/IconButton"
import Button from "./ui/Button"

const Subscription = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Subheading>Подписка</Subheading>
          <span className="absolute right-0 top-0 translate-x-10 -translate-y-1/2 typography-text-1 italic bg-gray-1 px-1.5 py-0.5 text-gray-6 rounded-full select-none hover:bg-gradient-to-r from-gray-2 to-gray-4">
            Free
          </span>
        </div>
        <ModalTrigger content={<FreezeSubsModal />}>
          <IconButton className="text-gray-1 dark:text-gray-5 hover:text-white dark:hover:text-white hover:bg-res-bot-blue">
            <BsSnow className="w-3 h-3" />
          </IconButton>
        </ModalTrigger>
      </div>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <RowItem className="items-start">
          <span className="flex-shrink-0">
            мой баланс: <AccentNumber>$100</AccentNumber>
          </span>
          <div className="flex gap-1.5 xl:gap-3 flex-wrap justify-end">
            <ModalTrigger content={<TxHistoryModal />}>
              <Button>история</Button>
            </ModalTrigger>
            <ModalTrigger content={<BalanceModal />}>
              <Button>пополнить баланс</Button>
            </ModalTrigger>
          </div>
        </RowItem>
        <RowItem className="gap-6">
          <span className="typography-text-0 dark:text-gray-4 w-fit block">
            дней до конца подписки: <AccentNumber>13</AccentNumber>
          </span>
          <SubscriptionMainModal />
        </RowItem>
      </div>
    </div>
  )
}

export default Subscription
