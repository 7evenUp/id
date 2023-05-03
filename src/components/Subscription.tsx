import Button from "./ui/Button"

const Subscription = () => {
  return (
    <div>
      <h2 className="mb-4">Подписка</h2>
      <div className="flex flex-col border-t border-gray-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-4">
          <span>
            мой баланс: <span className="text-res-bot-blue">$100</span>
          </span>
          <div className="flex gap-3">
            <Button>история</Button>
            <Button>пополнить баланс</Button>
          </div>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-4">
          <span>
            дней до конца подписки:{" "}
            <span className="text-res-bot-blue">13</span>
          </span>
          <Button>продлить подписку</Button>
        </div>
      </div>
    </div>
  )
}

export default Subscription
