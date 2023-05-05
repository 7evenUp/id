import AccentNumber from "./typography/AccentNumber"
import Subheading from "./typography/Subheading"
import Button from "./ui/Button"

const Subscription = () => {
  return (
    <div>
      <Subheading className="mb-4">Подписка</Subheading>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <div className="flex justify-between items-center py-2 border-b border-gray-4 dark:border-gray-1">
          <span className="typography-text-0 dark:text-gray-4">
            мой баланс: <AccentNumber>$100</AccentNumber>
          </span>
          <div className="flex gap-3">
            <Button>история</Button>
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
