import differenceInDays from "date-fns/differenceInDays"
import { isDesktop } from "react-device-detect"
import { useTranslation } from "react-i18next"

import PrimeActiveIcon from "@/assets/icons/products/Prime_Active.svg?react"
import CalendarActiveIcon from "@/assets/icons/products/Calendar_Active.svg?react"

import Snow from "@/assets/icons/snow.svg?react"

import TxHistory from "../modals/TxHistory"
import FreezeSubs from "../modals/FreezeSubs"
import Balance from "../modals/Balance"
import SubscriptionMain from "../modals/subscription/SubscriptionMain"

import ModalTrigger from "../components/ModalTrigger"
import SubscriptionType from "../components/SubscriptionType"
import SubscriptionTypeDisabled from "../components/SubscriptionTypeDisabled"

import RowItem from "@/shared/components/RowItem"

import AccentNumber from "@/shared/typography/AccentNumber"
import Subheading from "@/shared/typography/Subheading"
import Text0 from "@/shared/typography/Text0"
import TextXs from "@/shared/typography/TextXs"
import Text1 from "@/shared/typography/Text1"

import IconButton from "@/shared/ui/IconButton"
import Button from "@/shared/ui/Button"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/HoverCard"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"
import { formatDate } from "@/lib/date-fns"

const Subscription = () => {
  const { t } = useTranslation("profile")

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()

  const {
    subscriptions,
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
          ) : subscriptions.length > 1 ? (
            <UpcomingSubscriptions />
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

const UpcomingSubscriptions = () => {
  const { t, i18n } = useTranslation("profile")

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()

  const { subscriptions } = profileData!

  return (
    <div
      className={cn(
        "absolute left-full top-0 -translate-y-1/2 flex items-center gap-2",
        scale && "3xl:gap-[0.52vw]"
      )}
    >
      <SubscriptionType />
      {subscriptions.map((subscription, i) => {
        if (i === 0) return

        if (isDesktop)
          return (
            <HoverCard key={i} openDelay={150}>
              <HoverCardTrigger asChild>
                <SubscriptionTypeDisabled>
                  {subscription.kindName}
                </SubscriptionTypeDisabled>
              </HoverCardTrigger>
              <HoverCardContent
                className={cn(
                  "w-72 2xl:w-80 flex flex-col gap-4",
                  scale && "3xl:w-[20.8333vw] 3xl:gap-[1.0417vw]"
                )}
              >
                <Text0 className="text-center">
                  {t("subs.popover-heading")}
                </Text0>
                <div
                  className={cn(
                    "flex flex-col gap-2",
                    scale && "3xl:gap-[0.52vw]"
                  )}
                >
                  <TextXs className="font-semibold">
                    {t("subs.popover-active")}
                  </TextXs>
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-xl py-1 px-3 border border-gray-3 dark:border-gray-3",
                      scale &&
                        "3xl:gap-[0.7813vw] 3xl:rounded-[0.7813vw] 3xl:py-[0.2604vw] 3xl:px-[0.7813vw]"
                    )}
                  >
                    {subscriptions[0].kindName === "Prime" ? (
                      <PrimeActiveIcon
                        className={cn(
                          "w-[26px] h-[26px]",
                          scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                        )}
                      />
                    ) : (
                      subscriptions[0].kindName === "Calendar" && (
                        <CalendarActiveIcon
                          className={cn(
                            "w-[26px] h-[26px]",
                            scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                          )}
                        />
                      )
                    )}

                    <div className="flex flex-col">
                      <Text0>{subscriptions[0].kindName}</Text0>
                      <Text1>
                        {t("subs.popover-ending")}{" "}
                        {formatDate(
                          subscriptions[0].tillDatetime,
                          i18n.language as "ru" | "en"
                        )}
                      </Text1>
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "flex flex-col gap-2",
                    scale && "3xl:gap-[0.52vw]"
                  )}
                >
                  <div>
                    <TextXs className="font-semibold">
                      {t("subs.popover-upcoming")}
                    </TextXs>
                    <Text1>{t("subs.popover-upcoming-description")}</Text1>
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-xl py-1 px-3 border border-gray-3 dark:border-gray-3",
                      scale &&
                        "3xl:gap-[0.7813vw] 3xl:rounded-[0.7813vw] 3xl:py-[0.2604vw] 3xl:px-[0.7813vw]"
                    )}
                  >
                    {subscription.kindName === "Calendar" && (
                      <CalendarActiveIcon
                        className={cn(
                          "w-[26px] h-[26px]",
                          scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                        )}
                      />
                    )}
                    <div className="flex flex-col">
                      <Text0>{subscription.kindName}</Text0>
                      <Text1>
                        {t("subs.popover-will-be-active", {
                          count: differenceInDays(
                            new Date(subscription.tillDatetime),
                            new Date(subscription.fromDatetime)
                          ),
                        })}
                      </Text1>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          )

        return (
          <Popover key={i}>
            <PopoverTrigger asChild>
              <SubscriptionTypeDisabled>
                {subscription.kindName}
              </SubscriptionTypeDisabled>
            </PopoverTrigger>
            <PopoverContent
              className={cn(
                "w-72 2xl:w-80 flex flex-col gap-4",
                scale && "3xl:w-[20.8333vw] 3xl:gap-[1.0417vw]"
              )}
            >
              <Text0 className="text-center">{t("subs.popover-heading")}</Text0>
              <div
                className={cn(
                  "flex flex-col gap-2",
                  scale && "3xl:gap-[0.52vw]"
                )}
              >
                <TextXs className="font-semibold">
                  {t("subs.popover-active")}
                </TextXs>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-xl py-1 px-3 border border-gray-3 dark:border-gray-3",
                    scale &&
                      "3xl:gap-[0.7813vw] 3xl:rounded-[0.7813vw] 3xl:py-[0.2604vw] 3xl:px-[0.7813vw]"
                  )}
                >
                  {subscriptions[0].kindName === "Prime" ? (
                    <PrimeActiveIcon
                      className={cn(
                        "w-[26px] h-[26px]",
                        scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                      )}
                    />
                  ) : (
                    subscriptions[0].kindName === "Calendar" && (
                      <CalendarActiveIcon
                        className={cn(
                          "w-[26px] h-[26px]",
                          scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                        )}
                      />
                    )
                  )}

                  <div className="flex flex-col">
                    <Text0>{subscriptions[0].kindName}</Text0>
                    <Text1>
                      {t("subs.popover-ending")}{" "}
                      {formatDate(
                        subscriptions[0].tillDatetime,
                        i18n.language as "ru" | "en"
                      )}
                    </Text1>
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  "flex flex-col gap-2",
                  scale && "3xl:gap-[0.52vw]"
                )}
              >
                <div>
                  <TextXs className="font-semibold">
                    {t("subs.popover-upcoming")}
                  </TextXs>
                  <Text1>{t("subs.popover-upcoming-description")}</Text1>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-xl py-1 px-3 border border-gray-3 dark:border-gray-3",
                    scale &&
                      "3xl:gap-[0.7813vw] 3xl:rounded-[0.7813vw] 3xl:py-[0.2604vw] 3xl:px-[0.7813vw]"
                  )}
                >
                  {subscription.kindName === "Calendar" && (
                    <CalendarActiveIcon
                      className={cn(
                        "w-[26px] h-[26px]",
                        scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                      )}
                    />
                  )}
                  <div className="flex flex-col">
                    <Text0>{subscription.kindName}</Text0>
                    <Text1>
                      {t("subs.popover-will-be-active", {
                        count: differenceInDays(
                          new Date(subscription.tillDatetime),
                          new Date(subscription.fromDatetime)
                        ),
                      })}
                    </Text1>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )
      })}
    </div>
  )
}
