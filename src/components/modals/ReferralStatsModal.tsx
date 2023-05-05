import { DialogHeader, DialogTitle } from "../ui/Dialog"

const ReferralStatsModal = () => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Статистика</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col divide-y divide-gray-4 dark:divide-gray-2">
        <div className="flex justify-between items-center py-2 typography-accent">
          <span>Количество приглашённых пользователей</span>
          <span className="typography-balance">5</span>
        </div>
        <div className="flex justify-between items-center py-2 typography-accent">
          <span>Участников, сделавших платёж</span>
          <span className="typography-balance">3</span>
        </div>
        <div className="flex justify-between items-center py-2 typography-accent">
          <span>Уникальных участников приглашено в этом месяце</span>
          <span className="typography-balance">5</span>
        </div>
        <div className="flex justify-between items-center py-2 typography-accent">
          <span>
            Уникальных участников в текущем месяце, совершивших платёж
          </span>
          <span className="typography-balance">5</span>
        </div>
        <div className="flex justify-between items-center py-2 typography-accent">
          <span>Суммарно заработано</span>
          <span className="typography-balance">$3.4</span>
        </div>
        <div className="flex justify-between items-center py-2 typography-accent">
          <span>Выведено с реферальной системы</span>
          <span className="typography-balance">$2.00</span>
        </div>
      </div>
    </>
  )
}

export default ReferralStatsModal
