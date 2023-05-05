import Subheading from "./typography/Subheading"
import Button from "./ui/Button"
import ExternalLink from "./ui/ExternalLink"

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
        <div className="flex items-center justify-end gap-[10px] flex-wrap max-w-[360px]">
          <ExternalLink withTgIcon href="#">
            канал Prime
          </ExternalLink>
          <ExternalLink withTgIcon href="#">
            основной чат
          </ExternalLink>
          <ExternalLink withTgIcon href="#">
            NFT-чат
          </ExternalLink>
          <ExternalLink withTgIcon href="#">
            чат по нодам
          </ExternalLink>
        </div>
      </div>
      <div className="flex flex-col gap-6 py-2 border-b border-gray-4 dark:border-gray-1 dark:text-gray-4">
        <div className="flex justify-between items-center">
          <span>Сервисы и навигация</span>
          <ExternalLink href="#">навигация Prime</ExternalLink>
        </div>
        <div className="flex justify-between gap-5">
          <div className="flex flex-wrap min-w-[340px] h-[150px] py-3 px-6 bg-white dark:bg-gray-1 rounded-xl ">
            {[
              "Телеграм-канал",
              "Чаты",
              "Наставник",
              "Публикации",
              "Календарь",
              "Сайт Prime",
              "Prime в Notion",
              "Голосовые сессии",
              "Система лояльности",
              "Инвестфонд",
              "Гарантия окупаемости",
              "Бесплатные сделки на OTC",
            ].map((item, i) => (
              <a
                href="#"
                key={i}
                className="typography-text-2 basis-1/2 text-gray-1 dark:text-gray-4 hover:text-prime-pink dark:hover:text-prime-pink"
              >
                {item}
              </a>
            ))}
          </div>
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
            <ExternalLink withTgIcon href="#">
              наставник
            </ExternalLink>
          </div>
          <div className="flex justify-between items-center">
            <p className="max-w-prose typography-text-1">
              Впервые в Prime? Рекомендуем подробно ознакомиться с каждым
              сервисом, чтобы изпользовать возможности подписки на максимум!
            </p>
            <ExternalLink href="#">возможности Prime</ExternalLink>
          </div>
          <div className="flex justify-between items-center">
            <p className="max-w-prose typography-text-1">
              Не знаете с чего начать? Мы подготовили для Вас конкретный план
              действий.
            </p>
            <ExternalLink href="#">план действий</ExternalLink>
          </div>
        </div>
      </div>
      <div className="flex justify-between py-2 dark:text-gray-4">
        <span>Обратная связь и отзывы</span>
        <div className="flex gap-[10px]">
          <ExternalLink href="#">оставить отзыв</ExternalLink>
          <ExternalLink href="#">оставить обратную связь</ExternalLink>
        </div>
      </div>
    </>
  )
}

export default PrimeTab
