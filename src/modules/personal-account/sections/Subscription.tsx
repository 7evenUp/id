import { useTranslation } from "react-i18next"

import Snow from "@/assets/icons/snow.svg?react"

import TxHistory from "../modals/TxHistory"
import FreezeSubs from "../modals/FreezeSubs"
import Balance from "../modals/Balance"
import SubscriptionMain from "../modals/subscription/SubscriptionMain"

import ModalTrigger from "../components/ModalTrigger"
import SubscriptionType from "../components/SubscriptionType"
import UpcomingSubscriptions from "../components/UpcomingSubscriptions"

import RowItem from "@/shared/components/RowItem"

import AccentNumber from "@/shared/typography/AccentNumber"
import Subheading from "@/shared/typography/Subheading"
import Text0 from "@/shared/typography/Text0"

import IconButton from "@/shared/ui/IconButton"
import Button from "@/shared/ui/Button"
import useSendEvent from "@/shared/hooks/useSendEvent"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const Subscription = () => {
  const { t } = useTranslation("profile")

  const { sendEvent } = useSendEvent()

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()

  const {
    subscriptions,
    subscriptionInfo: { remainingDays, status },
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
        <div className="flex gap-1">
          <Subheading>{t("subs.heading")}</Subheading>
          {subscriptions.length > 1 ? (
            <UpcomingSubscriptions />
          ) : (
            <SubscriptionType
              className={cn(
                "h-fit -translate-y-2",
                scale && "3xl:gap3xl:-translate-y-[0.52vw]"
              )}
            />
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
              <Button
                onClick={() => {
                  sendEvent({ name: "topup_modal_open" })
                }}
              >
                {t("subs.replenish-btn")}
              </Button>
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
          ) : status === "FROZEN" ? (
            <>
              <Text0 className="dark:text-gray-4 w-fit block">
                {t("subs.frozen-status-title")}:{" "}
                <AccentNumber>{t("subs.frozen-status-text")}</AccentNumber>
              </Text0>
              <SubscriptionMain triggerText={t("subs.renew-btn")} />
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
