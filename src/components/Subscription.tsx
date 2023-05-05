import { BsSnow } from "react-icons/bs"
import TxHistoryModal from "./modals/TxHistoryModal"
import AccentNumber from "./typography/AccentNumber"
import Subheading from "./typography/Subheading"
import Button from "./ui/Button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog"
import IconButton from "./ui/IconButton"

const Subscription = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Subheading>Подписка</Subheading>
        <IconButton className="text-gray-1 dark:text-gray-5 hover:text-white dark:hover:text-white hover:bg-res-bot-blue">
          <BsSnow className="w-3 h-3" />
        </IconButton>
      </div>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <div className="flex justify-between items-center py-2 border-b border-gray-4 dark:border-gray-1">
          <span className="typography-text-0 dark:text-gray-4">
            мой баланс: <AccentNumber>$100</AccentNumber>
          </span>
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button>история</Button>
              </DialogTrigger>
              <DialogContent>
                <TxHistoryModal />
              </DialogContent>
            </Dialog>
            <Button>пополнить баланс</Button>
          </div>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-4 dark:border-gray-1">
          <span className="typography-text-0 dark:text-gray-4">
            дней до конца подписки: <AccentNumber>13</AccentNumber>
          </span>
          <Button>продлить подписку</Button>
        </div>
      </div>
    </div>
  )
}

export default Subscription
