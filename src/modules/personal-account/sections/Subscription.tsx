import { BsSnow } from "react-icons/bs"

import TxHistory from "../modals/TxHistory"
import FreezeSubs from "../modals/FreezeSubs"
import Balance from "../modals/Balance"
import SubscriptionMain from "../modals/subscription/SubscriptionMain"

import ModalTrigger from "../components/ModalTrigger"

import RowItem from "@/shared/components/RowItem"

import AccentNumber from "@/shared/typography/AccentNumber"
import Subheading from "@/shared/typography/Subheading"

import IconButton from "@/shared/ui/IconButton"
import Button from "@/shared/ui/Button"

import { useUserProfileQuery } from "@/redux/api/core"

const Subscription = () => {
  const { data: profileData } = useUserProfileQuery()

  if (!profileData) return null

  const {
    subscriptionInfo: { currentBalance, remainingDays },
  } = profileData

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Subheading>Подписка</Subheading>
          <span className="absolute right-0 top-0 translate-x-10 -translate-y-1/2 typography-text-1 italic bg-gray-1 px-1.5 py-0.5 text-gray-6 rounded-full select-none hover:bg-gradient-to-r from-gray-2 to-gray-4">
            Free
          </span>
        </div>
        <ModalTrigger content={<FreezeSubs />}>
          <IconButton className="text-gray-1 dark:text-gray-5 hover:text-white dark:hover:text-white hover:bg-res-bot-blue">
            <BsSnow className="w-3 h-3" />
          </IconButton>
        </ModalTrigger>
      </div>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <RowItem className="items-start">
          <span className="flex-shrink-0">
            мой баланс: <AccentNumber>${currentBalance}</AccentNumber>
          </span>
          <div className="flex gap-1.5 xl:gap-3 flex-wrap justify-end">
            <ModalTrigger content={<TxHistory />}>
              <Button>история</Button>
            </ModalTrigger>
            <ModalTrigger content={<Balance />}>
              <Button>пополнить баланс</Button>
            </ModalTrigger>
          </div>
        </RowItem>
        <RowItem className="gap-6">
          {remainingDays ? (
            <>
              <span className="typography-text-0 dark:text-gray-4 w-fit block">
                дней до конца подписки:{" "}
                <AccentNumber>{remainingDays}</AccentNumber>
              </span>
              <SubscriptionMain buttonText="продлить" />
            </>
          ) : (
            <>
              <span className="typography-text-0 dark:text-gray-4 w-fit block">
                подписка не активна
              </span>
              <SubscriptionMain buttonText="купить подписку" />
            </>
          )}
        </RowItem>
      </div>
    </div>
  )
}

export default Subscription
