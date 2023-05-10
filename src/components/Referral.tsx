import { FaInfo } from "react-icons/fa"

import ReferralStatsModal from "./modals/ReferralStatsModal"
import ReferralInfoModal from "./modals/ReferralInfoModal"

import ModalTrigger from "./ModalTrigger"
import RowItem from "./RowItem"

import AccentNumber from "./typography/AccentNumber"
import Subheading from "./typography/Subheading"

import Button from "./ui/Button"
import IconButton from "./ui/IconButton"

const Referral = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Subheading>Реферальная система</Subheading>
        <ModalTrigger content={<ReferralInfoModal />}>
          <IconButton className="bg-gray-1 hover:bg-gray-2 active:bg-opacity-80 rounded-full">
            <FaInfo className="w-3 h-3 fill-gray-5" />
          </IconButton>
        </ModalTrigger>
      </div>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <RowItem className="items-start">
          <span className="w-full xl:w-auto">
            реферальная система: <AccentNumber>15%</AccentNumber>
          </span>
          <div className="flex gap-1.5 xl:gap-3 flex-wrap justify-end flex-shrink">
            <Button>промокод</Button>
            <Button>ссылка</Button>
          </div>
        </RowItem>
        <RowItem>
          <span className="typography-text-0 dark:text-gray-4">
            реферальный баланс: <AccentNumber>$250</AccentNumber>
          </span>
          <Button>вывести</Button>
        </RowItem>
        <RowItem>
          <span className="typography-text-0 dark:text-gray-4">статистика</span>
          <ModalTrigger content={<ReferralStatsModal />}>
            <Button>посмотреть</Button>
          </ModalTrigger>
        </RowItem>
      </div>
    </div>
  )
}

export default Referral
