import Button from "./ui/Button"

const Referral = () => {
  return (
    <div>
      <h2 className="mb-4">Реферальная система</h2>
      <div className="flex flex-col border-t border-gray-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-4">
          <span>
            реферальная система: <span className="text-res-bot-blue">15%</span>
          </span>
          <div className="flex gap-3">
            <Button>промокод</Button>
            <Button>ссылка</Button>
          </div>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-4">
          <span>
            реферальный баланс: <span className="text-res-bot-blue">$250</span>
          </span>
          <Button>вывести</Button>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-4">
          <span>статистика</span>
          <Button>посмотреть</Button>
        </div>
      </div>
    </div>
  )
}

export default Referral
