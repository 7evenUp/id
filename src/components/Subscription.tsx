import React from "react"

const Subscription = () => {
  return (
    <div>
      <h2 className="mb-4">Подписка</h2>
      <div className="flex flex-col border-t border-gray-4">
        <div className="flex justify-between items-center border-b border-gray-4">
          <span>
            мой баланс: <span className="text-res-bot-blue">$100</span>
          </span>
          <div className="flex gap-3">
            <button>история</button>
            <button>пополнить баланс</button>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-gray-4">
          <span>
            дней до конца подписки:{" "}
            <span className="text-res-bot-blue">13</span>
          </span>
          <button>продлить подписку</button>
        </div>
      </div>
    </div>
  )
}

export default Subscription
