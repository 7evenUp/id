import { useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { isDesktop } from "react-device-detect"

import GiftIcon from "@/assets/icons/gift.svg?react"

import Button from "@/shared/ui/Button"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/HoverCard"

import Text0 from "@/shared/typography/Text0"
import Text1 from "@/shared/typography/Text1"
import Text2 from "@/shared/typography/Text2"

import { useAppSelector } from "@/redux/hooks"

import { Subscription } from "@/types/subscriptions"

import { cn } from "@/lib/classNames"

const HARDCODED_BENEFIT_NAME = "Ключик для Lootbox"

const SubscriptionCard = ({
  subscription,
  selected,
  onSelect,
  order,
  discounts,
  discountKind,
  discountAmount,
  isValidForPromo,
}: {
  subscription: Subscription
  selected: boolean
  onSelect: () => void
  order: number
  discounts: {
    subscriptionId: number
    discountAmount: number
  }[]
  discountAmount: number | undefined
  discountKind:
    | {
        id: "MONEY" | "PERCENT"
        label: "Money" | "%"
      }
    | undefined
  isValidForPromo: boolean
}) => {
  const { t } = useTranslation("modals")

  const {
    baseDiscount,
    baseDiscountAmount,
    price,
    id,
    duration,
    benefits,
    individualPrice,
    isPromotionalModeActive,
    referralDiscountAmount,
    referralDiscountKind,
  } = subscription

  const [cardPrice, setCardPrice] = useState(0)

  const scale = useAppSelector((state) => state.scale.value)

  const getSubscriptionPrice = useCallback(() => {
    return individualPrice ? individualPrice : price
  }, [price, individualPrice])

  const preferedDiscount = useMemo(() => {
    const matchedDiscount = discounts.find((el) => el.subscriptionId === id)

    return matchedDiscount
      ? matchedDiscount.discountAmount
      : discountAmount
      ? discountAmount
      : 0
  }, [discountAmount, discounts, id])

  const promocodeDiscount = useMemo(() => {
    if (isValidForPromo && discountKind)
      return discountKind.id === "MONEY"
        ? preferedDiscount
        : Math.ceil(price * preferedDiscount)

    return 0
  }, [discountKind, isValidForPromo, preferedDiscount, price])

  const referralDiscount = useMemo(() => {
    if (referralDiscountAmount && referralDiscountKind)
      return referralDiscountKind === "MONEY"
        ? referralDiscountAmount
        : Math.ceil(price * referralDiscountAmount)

    return 0
  }, [price, referralDiscountAmount, referralDiscountKind])

  const baseDiscountAmountNotNullable = baseDiscountAmount
    ? baseDiscountAmount
    : 0

  const totalDiscount = useMemo(() => {
    let discount = 0

    if (baseDiscount) discount = baseDiscount

    if (referralDiscount > promocodeDiscount) {
      if (referralDiscountAmount) {
        if (baseDiscount) {
          if (referralDiscountKind === "MONEY") {
            discount = Math.floor(
              (referralDiscountAmount * 100) / getSubscriptionPrice() +
                baseDiscount
            )
          } else {
            discount = referralDiscountAmount * 100 + baseDiscount
          }
        } else {
          if (referralDiscountKind === "MONEY") {
            discount = Math.floor(
              (referralDiscountAmount * 100) / getSubscriptionPrice()
            )
          } else {
            discount = referralDiscountAmount * 100
          }
        }
      }
    }

    if (preferedDiscount && discountKind) {
      if (promocodeDiscount > referralDiscount) {
        if (baseDiscount) {
          if (discountKind.id === "MONEY") {
            discount = Math.floor(
              (preferedDiscount * 100) / getSubscriptionPrice() + baseDiscount
            )
          } else {
            discount = preferedDiscount * 100 + baseDiscount
          }
        } else {
          if (discountKind.id === "MONEY") {
            discount = Math.floor(
              (preferedDiscount * 100) / getSubscriptionPrice()
            )
          } else {
            discount = preferedDiscount * 100
          }
        }
      }
    }

    return discount
  }, [
    baseDiscount,
    discountKind,
    getSubscriptionPrice,
    preferedDiscount,
    promocodeDiscount,
    referralDiscount,
    referralDiscountKind,
    referralDiscountAmount,
  ])

  useEffect(() => {
    const price = getSubscriptionPrice()

    let fullPrice

    const priceAfterDiscounts =
      price -
      baseDiscountAmountNotNullable -
      Math.max(referralDiscount, promocodeDiscount)

    if (!isPromotionalModeActive && priceAfterDiscounts > 1000) {
      fullPrice = 999 - Math.max(referralDiscount, promocodeDiscount)
    } else {
      fullPrice = priceAfterDiscounts
    }

    setCardPrice(fullPrice)
  }, [
    baseDiscountAmountNotNullable,
    getSubscriptionPrice,
    isPromotionalModeActive,
    promocodeDiscount,
    referralDiscount,
  ])

  return (
    <div
      className={cn(
        "min-h-[247px] min-w-[188px] flex flex-col items-center rounded-xl border border-gray-1 dark:border-gray-3 pb-5",
        scale &&
          "3xl:min-h-[16.08vw] 3xl:min-w-[12.239vw] 3xl:rounded-[0.781vw] 3xl:pb-[1.302vw]",
        selected && "min-h-[267px]",
        selected && scale && "3xl:min-h-[17.382vw]"
      )}
    >
      <Text2
        className={cn(
          "text-white bg-gray-1 dark:bg-gray-2 w-full py-1.5 text-center rounded-t-xl",
          scale && "3xl:py-[0.391vw] 3xl:rounded-t-[0.781vw]"
        )}
      >
        {t("buy-subs.first-step.duration", {
          count: duration.id,
        })}
      </Text2>
      <span
        className={cn(
          "font-semibold text-[40px] dark:text-gray-5 mt-5",
          scale && "3xl:text-[2.604vw] 3xl:mt-[1.302vw]",
          selected && "mt-7",
          selected && scale && "3xl:mt-[1.823vw]"
        )}
      >
        $
        {Number.isInteger(cardPrice) ? (
          cardPrice
        ) : (
          <>
            {cardPrice.toFixed(2).split(".")[0]}
            <span className="text-xl">
              .{cardPrice.toFixed(2).split(".")[1]}
            </span>
          </>
        )}
      </span>
      {price !== cardPrice && (
        <div
          className={cn(
            "flex items-center gap-1.5",
            scale && "3xl:gap-[0.391vw]"
          )}
        >
          <Text2
            className={cn(
              "rounded-sm px-1 py-0.5 text-gray-1 bg-gradient-to-r from-corral to-purple",
              scale && "3xl:rounded-[0.13vw] 3xl:px-[0.26vw] 3xl:py-[0.13vw]"
            )}
          >
            -{totalDiscount}%
          </Text2>
          <div
            className={cn(
              "bg-gray-1 rounded-sm px-1 py-0.5 w-fit",
              scale && "3xl:rounded-[0.13vw] 3xl:px-[0.26vw] 3xl:py-[0.13vw]"
            )}
          >
            <Text2 className="text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text">
              {t("buy-subs.first-step.savings")}{" "}
              {(price - cardPrice).toFixed(2)}$
            </Text2>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center mt-auto">
        {benefits &&
          benefits.length > 0 &&
          (isDesktop ? (
            <HoverCard openDelay={150}>
              <HoverCardTrigger
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded px-2 py-1 mb-3 text-black dark:text-gray-5 bg-gray-5/25 dark:bg-gray-2/50 hover:bg-gray-5/[0.15] dark:hover:bg-gray-2/30 transition-colors cursor-pointer",
                  scale &&
                    "3xl:rounded-[0.26vw] 3xl:px-[0.52vw] 3xl:py-[0.26vw] 3xl:mb-[0.78125vw] 3xl:gap-[0.36vw]"
                )}
              >
                <GiftIcon
                  className={cn(
                    "w-4 h-4",
                    scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw]"
                  )}
                />
                <Text0>{t("buy-subs.first-step.bonuses")}</Text0>
              </HoverCardTrigger>
              <HoverCardContent
                className={cn(
                  "flex flex-col gap-1 w-[280px]",
                  scale && "3xl:gap-[0.26vw] 3xl:w-[19vw]"
                )}
              >
                {benefits.map((prize) => (
                  <Text1 key={prize.id}>
                    {prize.translations.ru.name === HARDCODED_BENEFIT_NAME
                      ? order === 0
                        ? "- 1 открытие бокса"
                        : order === 1
                        ? "- 3 открытия бокса"
                        : order === 2
                        ? "- 6 открытий бокса"
                        : order === 3
                        ? "- 12 открытий бокса"
                        : "- " + prize.translations.ru.name
                      : "- " + prize.translations.ru.name}
                    {/* {prize.remainingCount && (
                      <span>(осталось {prize.remainingCount})</span>
                    )} */}
                  </Text1>
                ))}
              </HoverCardContent>
            </HoverCard>
          ) : (
            <Popover>
              <PopoverTrigger
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded px-2 py-1 mb-3 text-black dark:text-gray-5 bg-gray-5/25 dark:bg-gray-2/50 hover:bg-gray-5/[0.15] dark:hover:bg-gray-2/30 transition-colors cursor-pointer",
                  scale &&
                    "3xl:rounded-[0.26vw] 3xl:px-[0.52vw] 3xl:py-[0.26vw] 3xl:gap-[0.36vw]"
                )}
              >
                <GiftIcon
                  className={cn(
                    "w-4 h-4",
                    scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw]"
                  )}
                />
                <Text0>Бонусы</Text0>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-1 w-[280px]">
                {benefits.map((prize) => (
                  <Text1>
                    - {prize.translations.ru.name}{" "}
                    {/* {prize.remainingCount && (
                      <span>(осталось {prize.remainingCount})</span>
                    )} */}
                  </Text1>
                ))}
              </PopoverContent>
            </Popover>
          ))}
        <Button
          className={cn(
            "w-[158px] disabled:bg-gray-1 disabled:hover:bg-gray-1 disabled:text-white dark:disabled:bg-white dark:disabled:hover:bg-white dark:disabled:text-black",
            scale && "3xl:w-[10.286vw]",
            selected && "bg-gray-1 text-white dark:bg-white dark:text-black"
          )}
          disabled={selected}
          onClick={onSelect}
        >
          {selected
            ? t("buy-subs.first-step.chosen-btn")
            : t("buy-subs.first-step.choose-btn")}
        </Button>
      </div>
    </div>
  )
}

export default SubscriptionCard
