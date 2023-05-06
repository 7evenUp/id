import { DialogContent, DialogFooter, DialogHeader } from "../ui/Dialog"
import Button from "../ui/Button"

const FreezeSubsModal = () => {
  return (
    <DialogContent className="pb-16 max-w-[700px]">
      <DialogHeader className="items-center mb-6">
        <div className="flex flex-col typography-text-1">
          <span className="flex items-center gap-2">
            Статус подписки:{" "}
            <span className="bg-success text-white rounded-full px-1.5">
              Активна
            </span>
          </span>
          <span className="flex items-center gap-2">
            Возможность подписки:{" "}
            <span className="typography-balance">есть</span>
          </span>
        </div>
        <Button>подтвердить заморозку</Button>
      </DialogHeader>
      <div>
        <h3 className="typography-semi-head mb-2.5">Заморозка подписки</h3>
        <p className="typography-text-0 text-black dark:text-gray-4">
          Если у Вас не будет возможности следить за Prime и пользоваться всеми
          преимуществами подписки продолжительное время, Вы можете
          воспользоваться функцией заморозки.
        </p>
      </div>
      <div>
        <h3 className="typography-semi-head mb-2.5">Как это работает?</h3>
        <p className="typography-text-0 text-black dark:text-gray-4">
          Как только Вы заморозите подписку, Вы сразу же утратите доступ ко всем
          сервисам Prime, но на вашем аккаунте останутся дни подписки, которыми
          Вы ещё не воспользовались. Разморозить подписку и вернуть все доступы
          можно в любое время в этом же разделе.
        </p>
      </div>
      <DialogFooter>
        Обратите внимание, что заморозить подписку можно лишь один раз в году!
      </DialogFooter>
    </DialogContent>
  )
}

export default FreezeSubsModal
