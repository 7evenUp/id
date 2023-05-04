import Subheading from "./typography/Subheading"
import Button from "./ui/Button"

const PrimeTab = () => {
  return (
    <>
      <div className="flex items-center gap-5 border-b border-gray-4 dark:border-gray-1 pb-4">
        <Subheading>Prime</Subheading>
        <a className="typography-btn-big dark:text-gray-5" href="#">
          на сайт
        </a>
        <Button className="ml-auto">сохранить изменения</Button>
      </div>
      <div className="flex justify-between py-2 border-b border-gray-4 dark:border-gray-1 dark:text-gray-4">
        <span>Каналы и чаты Prime</span>
        <div className="flex items-center gap-[10px]">
          <a className="typography-btn-big" href="#">
            канал Prime
          </a>
          <a className="typography-btn-big" href="#">
            основной чат
          </a>
          <a className="typography-btn-big" href="#">
            NFT-чат
          </a>
          <a className="typography-btn-big" href="#">
            чат по нодам
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-6 py-2 border-b border-gray-4 dark:border-gray-1 dark:text-gray-4">
        <div className="flex justify-between items-center">
          <span>Сервисы и навигация</span>
          <div className="flex">
            <a href="#">навигация Prime</a>
          </div>
        </div>
        <div className="flex justify-between gap-5">
          <div className="min-w-[340px] h-[150px] bg-white dark:bg-gray-1 rounded-xl"></div>
          <div className="flex flex-col gap-[14px] py-3 px-6 bg-white dark:bg-gray-1 rounded-xl typography-text-1">
            <p>
              Если у Вас возникают любые вопросы по сервисам Prime или заработку
              в криптовалюте, то Вы всегда можете задать их Наставнику (никнейм
              в Telegram — @crypton_support) Впервые в Prime? Рекомендуем
              подробно ознакомиться с каждым сервисом Prime, чтобы использовать
              подписку на максимум! Не знаете, с чего начать? Мы подготовили для
              Вас конкретный план действий.
            </p>
            <p>
              Если у Вас возникают любые вопросы по сервисам Prime или заработку
              в криптовалюте, то Вы всегда можете задать их Наставнику (никнейм
              в Telegram — @crypton_support) Впервые в Prime? Рекомендуем
              подробно ознакомиться с каждым сервисом Prime, чтобы использовать
              подписку на максимум! Не знаете, с чего начать? Мы подготовили для
              Вас конкретный план действий.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 py-2 border-b border-gray-4 dark:border-gray-1 dark:text-gray-4">
        <div className="flex justify-between items-center">
          <span>Помощь</span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="max-w-prose typography-text-1">
              Нужна помощь? Если у Вас есть вопросы по сервисам Prime или
              касаемо заработка в криптовалюте, то Вы всегда можете задать их
              Наставнику.
            </p>
            <a href="#">наставник</a>
          </div>
          <div className="flex justify-between items-center">
            <p className="max-w-prose typography-text-1">
              Впервые в Prime? Рекомендуем подробно ознакомиться с каждым
              сервисом, чтобы изпользовать возможности подписки на максимум!
            </p>
            <a href="#">возможности Prime</a>
          </div>
          <div className="flex justify-between items-center">
            <p className="max-w-prose typography-text-1">
              Не знаете с чего начать? Мы подготовили для Вас конкретный план
              действий.
            </p>
            <a href="#">план действий</a>
          </div>
        </div>
      </div>
      <div className="flex justify-between py-2 dark:text-gray-4">
        <span>Обратная связь и отзывы</span>
        <div className="flex gap-[10px]">
          <a href="#">оставить отзыв</a>
          <a href="#">оставить обратную связь</a>
        </div>
      </div>
    </>
  )
}

export default PrimeTab
