import React from "react"

const Referral = () => {
  return (
    <div>
      <h2 className="mb-4">Реферальная система</h2>
      <div className="flex flex-col border-t border-gray-4">
        <div className="flex justify-between items-center border-b border-gray-4">
          <span>
            реферальная система: <span className="text-res-bot-blue">15%</span>
          </span>
          <div className="flex gap-3">
            <button>промокод</button>
            <button>ссылка</button>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-gray-4">
          <span>
            реферальный баланс: <span className="text-res-bot-blue">$250</span>
          </span>
          <button>вывести</button>
        </div>
        <div className="flex justify-between items-center border-b border-gray-4">
          <span>статистика</span>
          <button>посмотреть</button>
        </div>
      </div>
    </div>
  )
}

export default Referral
