import { HiOutlineArrowNarrowRight } from "react-icons/hi"

import RowItem from "./RowItem"
import TabHeader from "./TabHeader"

import Subheading from "./typography/Subheading"

import Button from "./ui/Button"
import ExternalLink from "./ui/ExternalLink"

import { primeServices } from "@/utils/primeServices"

const PrimeTab = () => {
  return (
    <>
      <TabHeader>
        <div className="flex gap-5">
          <Subheading>Prime</Subheading>
          <a
            className="typography-btn-big dark:text-gray-5 flex items-center gap-2 hover:text-gray-3 dark:hover:text-gray-3"
            href="#"
          >
            <HiOutlineArrowNarrowRight />
            на сайт
          </a>
        </div>
        <Button className="sm:ml-auto w-fit">сохранить изменения</Button>
      </TabHeader>
      <RowItem className="items-baseline flex-col sm:flex-row sm:items-center gap-2">
        <span>Каналы и чаты Prime</span>
        <div className="flex items-center sm:justify-end gap-[10px] flex-wrap max-w-[360px]">
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
      </RowItem>
      <RowItem className="flex-col items-stretch gap-6">
        <div className="flex justify-between items-center">
          <span>Сервисы и навигация</span>
          <ExternalLink href="#">навигация Prime</ExternalLink>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row xl:justify-between gap-5">
          <div className="flex flex-wrap w-full mobile:w-auto mobile:min-w-[340px] mobile:max-w-[340px] mobile:h-[150px] py-3 px-6 bg-white dark:bg-gray-1 rounded-xl">
            {primeServices.map((service, i) => (
              <a
                href="#"
                key={i}
                className="typography-text-2 basis-1/2 text-gray-1 dark:text-gray-4 hover:text-prime-pink dark:hover:text-prime-pink p-1 mobile:p-0"
              >
                {service}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-[14px] py-3 px-6 bg-white dark:bg-gray-1 rounded-xl typography-text-1 w-fit">
            <p className="lg:max-w-prose">
              Если у Вас возникают любые вопросы по сервисам Prime или заработку
              в криптовалюте, то Вы всегда можете задать их Наставнику (никнейм
              в Telegram — @crypton_support) Впервые в Prime? Рекомендуем
              подробно ознакомиться с каждым сервисом Prime, чтобы использовать
              подписку на максимум! Не знаете, с чего начать? Мы подготовили для
              Вас конкретный план действий.
            </p>
            <p className="lg:max-w-prose">
              Если у Вас возникают любые вопросы по сервисам Prime или заработку
              в криптовалюте, то Вы всегда можете задать их Наставнику (никнейм
              в Telegram — @crypton_support) Впервые в Prime? Рекомендуем
              подробно ознакомиться с каждым сервисом Prime, чтобы использовать
              подписку на максимум! Не знаете, с чего начать? Мы подготовили для
              Вас конкретный план действий.
            </p>
          </div>
        </div>
      </RowItem>
      <RowItem className="flex-col items-stretch gap-3">
        <div className="flex justify-between items-center">
          <span>Помощь</span>
        </div>
        <div className="flex flex-col gap-6 sm:gap-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0">
            <p className="max-w-prose typography-text-1 w-auto sm:w-[62%] xl:w-auto">
              Нужна помощь? Если у Вас есть вопросы по сервисам Prime или
              касаемо заработка в криптовалюте, то Вы всегда можете задать их
              Наставнику.
            </p>
            <ExternalLink withTgIcon href="#" className="w-fit">
              наставник
            </ExternalLink>
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0">
            <p className="max-w-prose typography-text-1 w-auto sm:w-[62%] xl:w-auto">
              Впервые в Prime? Рекомендуем подробно ознакомиться с каждым
              сервисом, чтобы изпользовать возможности подписки на максимум!
            </p>
            <ExternalLink href="#" className="w-fit">
              возможности Prime
            </ExternalLink>
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0">
            <p className="max-w-prose typography-text-1 w-auto sm:w-[62%] xl:w-auto">
              Не знаете с чего начать? Мы подготовили для Вас конкретный план
              действий.
            </p>
            <ExternalLink href="#" className="w-fit">
              план действий
            </ExternalLink>
          </div>
        </div>
      </RowItem>
      <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row justify-between gap-3 py-2 dark:text-gray-4">
        <span>Обратная связь и отзывы</span>
        <div className="flex gap-2.5 flex-col sm:flex-row">
          <ExternalLink href="#" className="w-fit sm:w-auto">
            оставить отзыв
          </ExternalLink>
          <ExternalLink href="#" className="w-fit sm:w-auto">
            оставить обратную связь
          </ExternalLink>
        </div>
      </div>
    </>
  )
}

export default PrimeTab
