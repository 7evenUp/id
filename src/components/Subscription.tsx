import Subheading from "./typography/Subheading"
import Button from "./ui/Button"

const Subscription = () => {
  return (
    <div>
      <Subheading className="mb-4">Подписка</Subheading>
      <div className="flex flex-col border-t border-gray-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-4">
          <span className="typography-text-0">
            мой баланс:{" "}
            <span className="text-res-bot-blue typography-balance">$100</span>
          </span>
          <div className="flex gap-3">
            <Button>история</Button>
            <Button>пополнить баланс</Button>
          </div>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-4">
          <span className="typography-text-0">
            дней до конца подписки:{" "}
            <span className="text-res-bot-blue typography-balance">13</span>
          </span>
          <Button>продлить подписку</Button>
        </div>
      </div>
    </div>
  )
}

export default Subscription
