import { useTranslation } from "react-i18next"

import { ReactComponent as Snow } from "@/assets/icons/snow.svg"

import TxHistory from "../modals/TxHistory"
import FreezeSubs from "../modals/FreezeSubs"
import Balance from "../modals/Balance"
import SubscriptionMain from "../modals/subscription/SubscriptionMain"

import ModalTrigger from "../components/ModalTrigger"
import SubscriptionType from "../components/SubscriptionType"

import RowItem from "@/shared/components/RowItem"

import AccentNumber from "@/shared/typography/AccentNumber"
import Subheading from "@/shared/typography/Subheading"
import Text0 from "@/shared/typography/Text0"

import IconButton from "@/shared/ui/IconButton"
import Button from "@/shared/ui/Button"

import { useUserProfileQuery } from "@/redux/api/profile"

const Subscription = () => {
  const { t } = useTranslation("profile")

  const { data: profileData } = useUserProfileQuery()

  const {
    subscriptionInfo: { remainingDays, status },
    balance,
  } = profileData!

  return (
    <div>
      <div className="flex justify-between items-center mb-4 3xl:mb-[1.042vw]">
        <div className="relative">
          <Subheading>{t("subs.heading")}</Subheading>
          <SubscriptionType className="absolute left-full top-0 -translate-y-1/2" />
        </div>
        {status !== null && (
          <ModalTrigger content={<FreezeSubs />}>
            <IconButton className="text-gray-1 dark:text-gray-5 hover:text-white dark:hover:text-white hover:bg-res-bot-blue active:bg-opacity-80">
              <Snow className="3xl:w-[0.781vw] 3xl:h-[0.846vw]" />
            </IconButton>
          </ModalTrigger>
        )}
      </div>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <RowItem className="items-start">
          <Text0 className="flex-shrink-0">
            {t("subs.balance")}: <AccentNumber>${balance}</AccentNumber>
          </Text0>
          <div className="flex gap-1.5 xl:gap-3 3xl:gap-[0.781vw] flex-wrap justify-end">
            <ModalTrigger content={<TxHistory />}>
              <Button>{t("subs.history-btn")}</Button>
            </ModalTrigger>
            <ModalTrigger content={<Balance />}>
              <Button>{t("subs.replenish-btn")}</Button>
            </ModalTrigger>
          </div>
        </RowItem>
        <RowItem className="gap-6 3xl:gap-[1.563vw]">
          {remainingDays ? (
            <>
              <Text0 className="dark:text-gray-4 w-fit block">
                {t("subs.remaining")}:{" "}
                <AccentNumber>{remainingDays}</AccentNumber>
              </Text0>
              <SubscriptionMain triggerText={t("subs.renew-btn")} />
            </>
          ) : (
            <>
              <Text0 className="dark:text-gray-4 w-fit block">
                {t("subs.inactive-subs")}
              </Text0>
              <SubscriptionMain triggerText={t("subs.buy-btn")} />
            </>
          )}
        </RowItem>
      </div>
    </div>
  )
}

export default Subscription
