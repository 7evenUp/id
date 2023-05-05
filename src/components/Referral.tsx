import AccentNumber from "./typography/AccentNumber"
import Subheading from "./typography/Subheading"
import Button from "./ui/Button"

const Referral = () => {
  return (
    <div>
      <Subheading className="mb-4">Реферальная система</Subheading>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <div className="flex justify-between items-center py-2 border-b border-gray-4 dark:border-gray-1">
          <span className="typography-text-0 dark:text-gray-4">
            реферальная система: <AccentNumber>15%</AccentNumber>
          </span>
          <div className="flex gap-3">
            <Button>промокод</Button>
            <Button>ссылка</Button>
          </div>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-4 dark:border-gray-1">
          <span className="typography-text-0 dark:text-gray-4">
            реферальный баланс: <AccentNumber>$250</AccentNumber>
          </span>
          <Button>вывести</Button>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-4 dark:border-gray-1">
          <span className="typography-text-0 dark:text-gray-4">статистика</span>
          <Button>посмотреть</Button>
        </div>
      </div>
    </div>
  )
}

export default Referral
