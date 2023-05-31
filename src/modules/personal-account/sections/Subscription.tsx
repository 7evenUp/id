import { useTranslation } from "react-i18next"

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

import { useUserProfileQuery } from "@/redux/api/profile"

const Subscription = () => {
  const { t } = useTranslation("profile")

  const { data: profileData } = useUserProfileQuery()

  const {
    subscriptionInfo: { currentBalance, remainingDays },
  } = profileData!

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Subheading>{t("subs.heading")}</Subheading>
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
            {t("subs.balance")}: <AccentNumber>${currentBalance}</AccentNumber>
          </span>
          <div className="flex gap-1.5 xl:gap-3 flex-wrap justify-end">
            <ModalTrigger content={<TxHistory />}>
              <Button>{t("subs.history-btn")}</Button>
            </ModalTrigger>
            <ModalTrigger content={<Balance />}>
              <Button>{t("subs.replenish-btn")}</Button>
            </ModalTrigger>
          </div>
        </RowItem>
        <RowItem className="gap-6">
          {remainingDays ? (
            <>
              <span className="typography-text-0 dark:text-gray-4 w-fit block">
                {t("subs.remaining")}:{" "}
                <AccentNumber>{remainingDays}</AccentNumber>
              </span>
              <SubscriptionMain triggerText="продлить" />
            </>
          ) : (
            <>
              <span className="typography-text-0 dark:text-gray-4 w-fit block">
                {t("subs.inactive-subs")}
              </span>
              <SubscriptionMain triggerText={t("subs.buy-btn")} />
            </>
          )}
        </RowItem>
      </div>
    </div>
  )
}

export default Subscription
