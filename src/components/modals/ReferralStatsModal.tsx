import { DialogHeader, DialogTitle } from "../ui/Dialog"
import RowItem from "../RowItem"

const ReferralStatsModal = () => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Статистика</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col">
        <RowItem className="typography-accent dark:border-gray-2">
          <span>Количество приглашённых пользователей</span>
          <span className="typography-balance">5</span>
        </RowItem>
        <RowItem className="typography-accent dark:border-gray-2">
          <span>Участников, сделавших платёж</span>
          <span className="typography-balance">3</span>
        </RowItem>
        <RowItem className="typography-accent dark:border-gray-2">
          <span>Уникальных участников приглашено в этом месяце</span>
          <span className="typography-balance">5</span>
        </RowItem>
        <RowItem className="typography-accent dark:border-gray-2">
          <span>
            Уникальных участников в текущем месяце, совершивших платёж
          </span>
          <span className="typography-balance">5</span>
        </RowItem>
        <RowItem className="typography-accent dark:border-gray-2">
          <span>Суммарно заработано</span>
          <span className="typography-balance">$3.4</span>
        </RowItem>
        <RowItem className="typography-accent dark:border-gray-2">
          <span>Выведено с реферальной системы</span>
          <span className="typography-balance">$2.00</span>
        </RowItem>
      </div>
    </>
  )
}

export default ReferralStatsModal
