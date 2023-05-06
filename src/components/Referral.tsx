import ModalTrigger from "./ModalTrigger"
import RowItem from "./RowItem"

import ReferralStatsModal from "./modals/ReferralStatsModal"

import AccentNumber from "./typography/AccentNumber"
import Subheading from "./typography/Subheading"

import Button from "./ui/Button"

const Referral = () => {
  return (
    <div>
      <Subheading className="mb-4">Реферальная система</Subheading>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <RowItem>
          <span>
            реферальная система: <AccentNumber>15%</AccentNumber>
          </span>
          <div className="flex gap-3">
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
