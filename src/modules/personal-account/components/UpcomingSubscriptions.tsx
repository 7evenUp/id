import differenceInDays from "date-fns/differenceInDays"
import { isDesktop } from "react-device-detect"
import { useTranslation } from "react-i18next"

import PrimeActivePng from "@/assets/icons/products/Prime-active-png.png"
import CalendarActiveIcon from "@/assets/icons/products/Calendar_Active.svg?react"

import SubscriptionTypeListItem from "./SubscriptionTypeListItem"

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/HoverCard"

import TextXs from "@/shared/typography/TextXs"
import Text1 from "@/shared/typography/Text1"
import Text0 from "@/shared/typography/Text0"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { formatDate } from "@/lib/date-fns"
import { cn } from "@/lib/classNames"

const UpcomingSubscriptions = () => {
  const { t, i18n } = useTranslation("profile")

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()

  const { subscriptions } = profileData!

  if (isDesktop)
    return (
      <HoverCard openDelay={150}>
        <HoverCardTrigger
          className={cn(
            "flex items-start -translate-y-2 gap-2 cursor-pointer",
            scale && "3xl:gap-[0.52vw] 3xl:-translate-y-[0.52vw]"
          )}
        >
          {subscriptions.map((subscription, i) => (
            <SubscriptionTypeListItem key={i} subscription={subscription}>
              {subscription.kindName}
            </SubscriptionTypeListItem>
          ))}
        </HoverCardTrigger>
        <HoverCardContent
          className={cn(
            "w-72 2xl:w-80 flex flex-col gap-4",
            scale && "3xl:w-[20.8333vw] 3xl:gap-[1.0417vw]"
          )}
        >
          <Text0 className="text-center">{t("subs.popover-heading")}</Text0>
          {subscriptions[0].status === "ACTIVE" && (
            <div
              className={cn("flex flex-col gap-2", scale && "3xl:gap-[0.52vw]")}
            >
              <TextXs className="font-semibold">
                {t("subs.popover-active")}
              </TextXs>
              <div
                className={cn(
                  "flex items-center gap-2 rounded-md py-1 px-1.5 border border-gray-3 dark:border-gray-3",
                  scale &&
                    "3xl:gap-[0.52vw] 3xl:rounded-[0.39vw] 3xl:py-[0.2604vw] 3xl:px-[0.39vw]"
                )}
              >
                {subscriptions[0].kindName === "Prime" ? (
                  <img
                    src={PrimeActivePng}
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
          )}
          <div
            className={cn("flex flex-col gap-2", scale && "3xl:gap-[0.52vw]")}
          >
            {subscriptions[0].status === "FROZEN" ? (
              <div>
                <TextXs className="font-semibold">
                  {t("subs.popover-frozen")}
                </TextXs>
                <Text1>{t("subs.popover-frozen-description")}</Text1>
              </div>
            ) : (
              <div>
                <TextXs className="font-semibold">
                  {t("subs.popover-upcoming")}
                </TextXs>
                <Text1>{t("subs.popover-upcoming-description")}</Text1>
              </div>
            )}
            {subscriptions[0].status === "ACTIVE"
              ? subscriptions.slice(1).map((subscription, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center gap-2 rounded-md py-1 px-1.5 border border-gray-3 dark:border-gray-3",
                      scale &&
                        "3xl:gap-[0.52vw] 3xl:rounded-[0.39vw] 3xl:py-[0.2604vw] 3xl:px-[0.39vw]"
                    )}
                  >
                    {subscription.kindName === "Prime" ? (
                      <img
                        src={PrimeActivePng}
                        className={cn(
                          "w-[26px] h-[26px]",
                          scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                        )}
                      />
                    ) : (
                      subscription.kindName === "Calendar" && (
                        <CalendarActiveIcon
                          className={cn(
                            "w-[26px] h-[26px]",
                            scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                          )}
                        />
                      )
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
                ))
              : subscriptions.map((subscription, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center gap-2 rounded-md py-1 px-1.5 border border-gray-3 dark:border-gray-3",
                      scale &&
                        "3xl:gap-[0.52vw] 3xl:rounded-[0.39vw] 3xl:py-[0.2604vw] 3xl:px-[0.39vw]"
                    )}
                  >
                    {subscription.kindName === "Prime" ? (
                      <img
                        src={PrimeActivePng}
                        className={cn(
                          "w-[26px] h-[26px]",
                          scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                        )}
                      />
                    ) : (
                      subscription.kindName === "Calendar" && (
                        <CalendarActiveIcon
                          className={cn(
                            "w-[26px] h-[26px]",
                            scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                          )}
                        />
                      )
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
                ))}
          </div>
        </HoverCardContent>
      </HoverCard>
    )

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "flex items-start -translate-y-2 gap-2 cursor-pointer",
          scale && "3xl:gap-[0.52vw] 3xl:-translate-y-[0.52vw]"
        )}
      >
        {subscriptions.map((subscription, i) => (
          <SubscriptionTypeListItem key={i} subscription={subscription}>
            {subscription.kindName}
          </SubscriptionTypeListItem>
        ))}
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-72 2xl:w-80 flex flex-col gap-4",
          scale && "3xl:w-[20.8333vw] 3xl:gap-[1.0417vw]"
        )}
      >
        <Text0 className="text-center">{t("subs.popover-heading")}</Text0>
        {subscriptions[0].status === "ACTIVE" && (
          <div
            className={cn("flex flex-col gap-2", scale && "3xl:gap-[0.52vw]")}
          >
            <TextXs className="font-semibold">
              {t("subs.popover-active")}
            </TextXs>
            <div
              className={cn(
                "flex items-center gap-2 rounded-md py-1 px-1.5 border border-gray-3 dark:border-gray-3",
                scale &&
                  "3xl:gap-[0.52vw] 3xl:rounded-[0.39vw] 3xl:py-[0.2604vw] 3xl:px-[0.39vw]"
              )}
            >
              {subscriptions[0].kindName === "Prime" ? (
                <img
                  src={PrimeActivePng}
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
        )}
        <div className={cn("flex flex-col gap-2", scale && "3xl:gap-[0.52vw]")}>
          {subscriptions[0].status === "FROZEN" ? (
            <div>
              <TextXs className="font-semibold">
                {t("subs.popover-frozen")}
              </TextXs>
              <Text1>{t("subs.popover-frozen-description")}</Text1>
            </div>
          ) : (
            <div>
              <TextXs className="font-semibold">
                {t("subs.popover-upcoming")}
              </TextXs>
              <Text1>{t("subs.popover-upcoming-description")}</Text1>
            </div>
          )}
          {subscriptions[0].status === "ACTIVE"
            ? subscriptions.slice(1).map((subscription, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-2 rounded-md py-1 px-1.5 border border-gray-3 dark:border-gray-3",
                    scale &&
                      "3xl:gap-[0.52vw] 3xl:rounded-[0.39vw] 3xl:py-[0.2604vw] 3xl:px-[0.39vw]"
                  )}
                >
                  {subscription.kindName === "Prime" ? (
                    <img
                      src={PrimeActivePng}
                      className={cn(
                        "w-[26px] h-[26px]",
                        scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                      )}
                    />
                  ) : (
                    subscription.kindName === "Calendar" && (
                      <CalendarActiveIcon
                        className={cn(
                          "w-[26px] h-[26px]",
                          scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                        )}
                      />
                    )
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
              ))
            : subscriptions.map((subscription, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-2 rounded-md py-1 px-1.5 border border-gray-3 dark:border-gray-3",
                    scale &&
                      "3xl:gap-[0.52vw] 3xl:rounded-[0.39vw] 3xl:py-[0.2604vw] 3xl:px-[0.39vw]"
                  )}
                >
                  {subscription.kindName === "Prime" ? (
                    <img
                      src={PrimeActivePng}
                      className={cn(
                        "w-[26px] h-[26px]",
                        scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                      )}
                    />
                  ) : (
                    subscription.kindName === "Calendar" && (
                      <CalendarActiveIcon
                        className={cn(
                          "w-[26px] h-[26px]",
                          scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                        )}
                      />
                    )
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
              ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default UpcomingSubscriptions
