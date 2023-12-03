import { useTranslation } from "react-i18next"

import Snow from "@/assets/icons/snow.svg?react"

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
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const Subscription = () => {
  const { t } = useTranslation("profile")

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()

  const {
    subscriptionInfo: { remainingDays, status, subscriptionType },
    balance,
  } = profileData!

  return (
    <div>
      <div
        className={cn(
          "flex justify-between items-center mb-4",
          scale && "3xl:mb-[1.042vw]"
        )}
      >
        <div className="relative">
          <Subheading>{t("subs.heading")}</Subheading>
          {subscriptionType === null ? (
            <SubscriptionMain
              customTrigger={
                <SubscriptionType className="cursor-pointer absolute left-full top-0 -translate-y-1/2" />
              }
            />
          ) : (
            <SubscriptionType className="absolute left-full top-0 -translate-y-1/2" />
          )}
        </div>
        {status !== null && (
          <ModalTrigger content={<FreezeSubs />}>
            <IconButton className="text-gray-1 dark:text-gray-5 hover:text-white dark:hover:text-white hover:bg-res-bot-blue active:bg-opacity-80">
              <Snow
                className={cn(scale && "3xl:w-[0.781vw] 3xl:h-[0.846vw]")}
              />
            </IconButton>
          </ModalTrigger>
        )}
      </div>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <RowItem className="items-start">
          <Text0 className="flex-shrink-0">
            {t("subs.balance")}: <AccentNumber>${balance}</AccentNumber>
          </Text0>
          <div
            className={cn(
              "flex gap-1.5 xl:gap-3 flex-wrap justify-end",
              scale && "3xl:gap-[0.781vw]"
            )}
          >
            <ModalTrigger content={<TxHistory />}>
              <Button>{t("subs.history-btn")}</Button>
            </ModalTrigger>
            <ModalTrigger content={<Balance />}>
              <Button>{t("subs.replenish-btn")}</Button>
            </ModalTrigger>
          </div>
        </RowItem>
        <RowItem className="gap-6">
          {status === null || status === "EXPIRED" ? (
            <>
              <Text0 className="dark:text-gray-4 w-fit block">
                {t("subs.inactive-subs")}
              </Text0>
              <SubscriptionMain triggerText={t("subs.buy-btn")} />
            </>
          ) : (
            <>
              <Text0 className="dark:text-gray-4 w-fit block">
                {t("subs.remaining")}:{" "}
                <AccentNumber>{remainingDays}</AccentNumber>
              </Text0>
              <SubscriptionMain triggerText={t("subs.renew-btn")} />
            </>
          )}
        </RowItem>
      </div>
    </div>
  )
}

export default Subscription
