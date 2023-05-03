const PrimeTab = () => {
  return (
    <>
      <div className="flex gap-5 border-b border-gray-4 pb-4">
        <h2>Prime</h2>
        <a href="#">на сайт</a>
        <button className="ml-auto">сохранить изменения</button>
      </div>
      <div className="flex justify-between py-2 border-b border-gray-4">
        <span>Каналы и чаты Prime</span>
        <div className="flex gap-[10px]">
          <a href="#">канал Prime</a>
          <a href="#">основной чат</a>
          <a href="#">NFT-чат</a>
          <a href="#">чат по нодам</a>
        </div>
      </div>
      <div className="flex flex-col gap-6 py-2 border-b border-gray-4">
        <div className="flex justify-between items-center">
          <span>Сервисы и навигация</span>
          <div className="flex">
            <a href="#">навигация Prime</a>
          </div>
        </div>
        <div className="flex justify-between gap-5">
          <div className="min-w-[340px] h-[150px] bg-white rounded-xl"></div>
          <div className="flex flex-col gap-[14px] py-3 px-6 bg-white rounded-xl">
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
      <div className="flex flex-col gap-6 py-2 border-b border-gray-4">
        <div className="flex justify-between items-center">
          <span>Помощь</span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="max-w-prose">Нужна помощь? Если у Вас есть вопросы по сервисам Prime или касаемо заработка в криптовалюте, то Вы всегда можете задать их Наставнику.</p>
            <a href="#">наставник</a>
          </div>
          <div className="flex justify-between items-center">
            <p className="max-w-prose">Впервые в Prime? Рекомендуем подробно ознакомиться с каждым сервисом, чтобы изпользовать возможности подписки на максимум!</p>
            <a href="#">возможности Prime</a>
          </div>
          <div className="flex justify-between items-center">
            <p className="max-w-prose">Не знаете с чего начать? Мы подготовили для Вас конкретный план действий.</p>
            <a href="#">план действий</a>
          </div>
        </div>
      </div>
      <div className="flex justify-between py-2">
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
