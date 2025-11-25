import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { useTranslation } from "react-i18next"
import { isDesktop } from "react-device-detect"

// import PrimeIcon from "@/assets/icons/products/Prime.svg?react"
import CryptonIcon from "@/assets/icons/crypton-logo.svg?react"
import CheckIcon from "@/assets/icons/check.svg?react"
import HelpIcon from "@/assets/icons/help-circle.svg?react"
// import MoveLeft from "@/assets/icons/move-left.svg?react"

import SubscriptionModalHeader from "../components/SubscriptionModalHeader"
import SubscriptionModalFooter from "../components/SubscriptionModalFooter"
import SubscriptionCard from "../components/SubscriptionCard"
import CryptonPointsInfo from "../components/CryptonPointsInfo"
import RarityToDiscountTable from "../components/RarityToDiscountTable"

import TextAccent from "@/shared/typography/TextAccent"
import Text2 from "@/shared/typography/Text2"
import Text1 from "@/shared/typography/Text1"
import Text0 from "@/shared/typography/Text0"

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"
import { Dialog, DialogContent } from "@/shared/ui/Dialog"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/HoverCard"

import { cn } from "@/lib/classNames"

import { useNutcrackersQuery, useUserProfileQuery } from "@/redux/api/profile"
import { useBuyMutation } from "@/redux/api/subscription"
import { useValidatePromocodeMutation } from "@/redux/api/promocodes"
import { useAppSelector } from "@/redux/hooks"

import { Subscription } from "@/types/subscriptions"

import { PROMO_CODE_NOT_FOUND, INSUFFICIENT_BALANCE } from "@/utils/errorCodes"
import useSendEvent from "@/shared/hooks/useSendEvent"

const FirstStep = ({
  open,
  onOpenChange,
  openSecondStep,
  // openSelection,
  openBalanceModal,
  subscriptions,
  setBoughtSubDuration,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  openSecondStep: () => void
  // openSelection: () => void
  openBalanceModal: () => void
  subscriptions: Subscription[]
  setBoughtSubDuration: Dispatch<SetStateAction<number>>
}) => {
  const { t } = useTranslation("modals")
  const { t: tErrorResponses } = useTranslation("reqResponses")

  const { sendEvent } = useSendEvent()

  const scale = useAppSelector((state) => state.scale.value)

  const [activeSub, setActiveSub] = useState<number | null>(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [promo, setPromo] = useState("")
  const [validFor, setValidFor] = useState<number[]>([])
  const [invalidFor, setInvalidFor] = useState<number[]>([])
  const [discountAmount, setDiscountAmount] = useState(0)
  const [discountKind, setDiscountKind] = useState<{
    id: "MONEY" | "PERCENT"
    label: "Money" | "%"
  }>()
  const [discounts, setDiscounts] = useState<
    Array<{
      subscriptionId: number
      discountAmount: number
    }>
  >([])
  // больше ли скидка промокода чем реф скидка
  const [isPromoLarger, setIsPromoLarger] = useState<boolean | null>(null)

  const { data: userProfile } = useUserProfileQuery()
  const { data: nutcrackersData } = useNutcrackersQuery()
  const [buy, { isLoading, error }] = useBuyMutation()
  const [
    validatePromocode,
    {
      data: promocodeValidateData,
      isError,
      error: promocodeError,
      reset: resetRequest,
      isLoading: isValidateLoading,
      isSuccess: isValidateSuccess,
    },
  ] = useValidatePromocodeMutation()

  const { balance } = userProfile!

  const getSubscriptionPrice = (subID: number) => {
    const { individualPrice, price } = subscriptions[subID]

    return individualPrice ? individualPrice : price
  }

  const onPromoInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (activeSub === null) return

    setDiscountAmount(0)
    setDiscountKind(undefined)
    setDiscounts([])
    setValidFor([])
    setInvalidFor([])

    if (isError || isValidateSuccess) resetRequest()

    const { baseDiscountAmount, referralDiscountAmount, referralDiscountKind } =
      subscriptions[activeSub]

    setIsPromoLarger(null)

    const price = getSubscriptionPrice(activeSub)

    if (referralDiscountAmount && referralDiscountKind) {
      if (referralDiscountKind === "MONEY") {
        if (baseDiscountAmount) {
          if (subscriptions[activeSub].isPromotionalModeActive) {
            setTotalPrice(price - baseDiscountAmount - referralDiscountAmount)
          } else {
            setTotalPrice(price - baseDiscountAmount - referralDiscountAmount)
          }
        } else {
          setTotalPrice(price - referralDiscountAmount)
        }
      } else {
        if (baseDiscountAmount) {
          if (subscriptions[activeSub].isPromotionalModeActive) {
            setTotalPrice(
              price -
                baseDiscountAmount -
                Math.ceil(price * referralDiscountAmount)
            )
          } else {
            setTotalPrice(
              price -
                baseDiscountAmount -
                Math.ceil(price * referralDiscountAmount)
            )
          }
        } else {
          setTotalPrice(price - Math.ceil(price * referralDiscountAmount))
        }
      }
    } else {
      if (baseDiscountAmount) {
        if (subscriptions[activeSub].isPromotionalModeActive) {
          setTotalPrice(price - baseDiscountAmount)
        } else {
          setTotalPrice(price - baseDiscountAmount)
        }
      } else {
        setTotalPrice(price)
      }
    }
    setPromo(evt.currentTarget.value)
  }

  const onSelect = (subID: number) => {
    if (isError || isValidateSuccess) resetRequest()

    setDiscountAmount(0)
    setDiscountKind(undefined)
    setDiscounts([])
    setValidFor([])
    setInvalidFor([])

    const { baseDiscountAmount, referralDiscountAmount, referralDiscountKind } =
      subscriptions[subID]

    setIsPromoLarger(null)

    const price = getSubscriptionPrice(subID)

    setActiveSub(subID)

    if (referralDiscountAmount && referralDiscountKind) {
      if (referralDiscountKind === "MONEY") {
        if (baseDiscountAmount) {
          if (subscriptions[subID].isPromotionalModeActive) {
            setTotalPrice(price - baseDiscountAmount - referralDiscountAmount)
          } else {
            setTotalPrice(price - baseDiscountAmount - referralDiscountAmount)
          }
        } else {
          setTotalPrice(price - referralDiscountAmount)
        }
      } else {
        if (baseDiscountAmount) {
          if (subscriptions[subID].isPromotionalModeActive) {
            setTotalPrice(
              price -
                baseDiscountAmount -
                Math.ceil(price * referralDiscountAmount)
            )
          } else {
            setTotalPrice(
              price -
                baseDiscountAmount -
                Math.ceil(price * referralDiscountAmount)
            )
          }
        } else {
          setTotalPrice(price - Math.ceil(price * referralDiscountAmount))
        }
      }
    } else {
      if (baseDiscountAmount) {
        if (subscriptions[subID].isPromotionalModeActive) {
          setTotalPrice(price - baseDiscountAmount)
        } else {
          setTotalPrice(price - baseDiscountAmount)
        }
      } else {
        setTotalPrice(price)
      }
    }
  }

  const applyPromo = async () => {
    if (activeSub === null) return

    const { baseDiscountAmount, referralDiscountAmount, referralDiscountKind } =
      subscriptions[activeSub]

    const price = getSubscriptionPrice(activeSub)

    try {
      const {
        discountAmount,
        discountKind,
        discounts,
        invalidForSubscriptions,
        validForSubscriptions,
      } = await validatePromocode({
        promocode: promo,
        // subscription: subscriptions[activeSub].id,
      }).unwrap()

      setDiscountAmount(discountAmount)
      setDiscountKind(discountKind)
      setDiscounts(discounts)
      setValidFor(validForSubscriptions)
      setInvalidFor(invalidForSubscriptions)

      let finalPrice = 0

      const baseDiscountAmountNotNullable = baseDiscountAmount
        ? baseDiscountAmount
        : 0

      const isValid =
        validForSubscriptions.length === 0 &&
        invalidForSubscriptions.length === 0
          ? true
          : invalidForSubscriptions.length === 0 &&
              validForSubscriptions.includes(subscriptions[activeSub].id)
            ? true
            : validForSubscriptions.length === 0 &&
                !invalidForSubscriptions.includes(subscriptions[activeSub].id)
              ? true
              : validForSubscriptions.length !== 0 &&
                  invalidForSubscriptions.length !== 0 &&
                  validForSubscriptions.includes(subscriptions[activeSub].id)
                ? true
                : false

      if (!isValid) {
        setTotalPrice(price - baseDiscountAmountNotNullable)
        setPromo("")
        return
      }

      const matchedDiscount = discounts.find(
        (el) => el.subscriptionId === subscriptions[activeSub].id
      )

      const preferedDiscount = matchedDiscount
        ? matchedDiscount.discountAmount
        : discountAmount

      const referralDiscount = referralDiscountAmount
        ? referralDiscountKind === "MONEY"
          ? referralDiscountAmount
          : Math.ceil(price * referralDiscountAmount)
        : 0

      const promocodeDiscount =
        discountKind.id === "MONEY"
          ? preferedDiscount
          : Math.ceil(price * preferedDiscount)

      finalPrice =
        price -
        baseDiscountAmountNotNullable -
        Math.max(referralDiscount, promocodeDiscount)

      setTotalPrice(finalPrice)

      if (referralDiscountAmount && referralDiscountKind) {
        if (referralDiscount < promocodeDiscount) {
          setIsPromoLarger(true)
        } else {
          setIsPromoLarger(false)
        }
      }
    } catch {
      setPromo("")
    }
  }

  const buySubscription = async () => {
    if (activeSub === null) return

    const url = new URL(location.href)
    const refCode = url.searchParams.get("ref_code")
    const utm_source = url.searchParams.get("utm_source")
    const utm_medium = url.searchParams.get("utm_medium")
    const utm_campaign = url.searchParams.get("utm_campaign")
    const utm_content = url.searchParams.get("utm_content")

    let utm_data: {
      utm_source: string | null
      utm_medium: string | null
      utm_campaign: string | null
      utm_content: string | null
    } | null

    if (utm_source || utm_medium || utm_campaign || utm_content) {
      utm_data = {
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        utm_content: utm_content || null,
      }
    } else {
      utm_data = null
    }

    try {
      await buy({
        id: subscriptions[activeSub].id,
        promocode: promo,
        referralCode: refCode,
        utm: utm_data ? JSON.stringify(utm_data) : null,
      }).unwrap()
      sendEvent({
        name: "subscription_bought",
        payload: {
          duration: subscriptions[activeSub].duration.label,
        },
      })
      setBoughtSubDuration(subscriptions[activeSub].duration.id)
      openSecondStep()
      setTotalPrice(0)
      resetRequest()
      setActiveSub(null)
      setPromo("")
    } catch (error) {
      setPromo("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "pb-14 sm:max-w-[560px] sm:pb-14 lg:max-w-[910px] xl:max-w-[1200px]",
          scale && "3xl:max-w-[70vw] 3xl:pb-[3.645vw]"
        )}
      >
        {/* <button
          className={cn(
            "typography-btn-big flex items-center gap-2 hover:text-gray-3 w-fit",
            scale && "typography-btn-big_large 3xl:gap-[0.521vw]"
          )}
          onClick={openSelection}
        >
          <MoveLeft
            className={cn(
              "w-3.5 h-3.5",
              scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
            )}
          />
          <span className="text-left">{t("buy-subs.back-btn")}</span>
        </button> */}
        <SubscriptionModalHeader step={t("buy-subs.first-step.step")} />

        <div
          className={cn(
            "h-[400px] overflow-y-auto pb-1 pr-2 lg:h-auto",
            scale && "3xl:pb-[0.26vw] 3xl:pr-[0.521vw]"
          )}
        >
          {/* <PrimeInfo /> */}

          <div
            className={cn(
              "mb-6 grid grid-cols-1 gap-3 mobile:grid-cols-2 sm:gap-5 lg:grid-cols-2",
              // "mb-6 grid grid-cols-1 gap-3 mobile:grid-cols-2 sm:gap-5 lg:grid-cols-3",
              scale && "3xl:mb-[1.563vw] 3xl:gap-[1.302vw]"
            )}
          >
            {subscriptions.map((sub, i) => {
              return (
                <SubscriptionCard
                  key={sub.id}
                  subscription={sub}
                  selected={activeSub === i}
                  onSelect={() => onSelect(i)}
                  order={i}
                  discounts={discounts}
                  discountAmount={discountAmount}
                  discountKind={discountKind}
                  isValidForPromo={
                    validFor.length === 0 && invalidFor.length === 0
                      ? true
                      : invalidFor.length === 0 && validFor.includes(sub.id)
                        ? true
                        : validFor.length === 0 && !invalidFor.includes(sub.id)
                          ? true
                          : validFor.length !== 0 &&
                              invalidFor.length !== 0 &&
                              validFor.includes(sub.id)
                            ? true
                            : false
                  }
                />
              )
            })}
          </div>

          {activeSub !== null && (
            <div
              className={cn(
                "relative mb-5 flex flex-wrap items-center gap-2 sm:mb-9 lg:mb-5",
                scale && "3xl:mb-[1.302vw] 3xl:gap-[0.521vw]"
              )}
            >
              <Input
                placeholder={t("buy-subs.first-step.promo-placeholder")}
                value={promo}
                onChange={onPromoInputChange}
                className={cn(
                  isError &&
                    "border-error text-error focus:border-error dark:border-error dark:text-error dark:focus:border-error"
                )}
              />
              {isError && (
                <Text1
                  className={cn(
                    "w-full text-error sm:absolute sm:bottom-0 sm:translate-y-8 lg:translate-y-4",
                    scale && "3xl:translate-y-[1.042vw]"
                  )}
                >
                  {
                    /* @ts-expect-error No-Error-Types */
                    promocodeError.status === 400
                      ? /* @ts-expect-error No-Error-Types */
                        promocodeError.data.code === "discount_not_found"
                        ? t("buy-subs.first-step.promo-error")
                        : /* @ts-expect-error No-Error-Types */
                          promocodeError.data.code ===
                            "discount_for_non_subscribed_only"
                          ? tErrorResponses("discount_for_non_subscribed_only")
                          : /* @ts-expect-error No-Error-Types */
                            promocodeError.data.code ===
                              "discount_for_new_users_only"
                            ? tErrorResponses("discount_for_new_users_only")
                            : /* @ts-expect-error No-Error-Types */
                              promocodeError.data.code ===
                                "discount_code_already_used"
                              ? tErrorResponses("discount_code_already_used")
                              : /* @ts-expect-error No-Error-Types */
                                promocodeError.data.code ===
                                  "discount_code_validation_error"
                                ? tErrorResponses(
                                    "discount_code_validation_error"
                                  )
                                : tErrorResponses("server-error")
                      : tErrorResponses("server-error")
                  }
                </Text1>
              )}
              {promo && !isError && (
                <Button
                  disabled={isValidateSuccess}
                  onClick={applyPromo}
                  isLoading={isValidateLoading}
                  appearence={isValidateSuccess ? "success" : "outlined"}
                >
                  {isValidateSuccess
                    ? t("buy-subs.first-step.promo-applied")
                    : t("buy-subs.first-step.promo-apply-btn")}
                </Button>
              )}
            </div>
          )}

          <div
            className={cn(
              "flex flex-col justify-between gap-2 lg:flex-row lg:items-center",
              scale && "3xl:gap-[0.521vw]"
            )}
          >
            <div
              className={cn(
                "flex flex-col gap-0.5",
                scale && "3xl:gap-[0.13vw]"
              )}
            >
              <span
                className={cn(
                  "typography-head",
                  scale && "typography-head_large"
                )}
              >
                {t("buy-subs.first-step.total")}: ${totalPrice.toFixed(2)}
              </span>
              {subscriptions.some((el) => el.referralDiscountKind !== null) && (
                <Text1 className="bg-gradient-to-r from-corral to-purple bg-clip-text text-transparent">
                  {isPromoLarger === null
                    ? t("buy-subs.first-step.ref-discount-available")
                    : isPromoLarger
                      ? t("buy-subs.first-step.ref-discount-is-smaller")
                      : t("buy-subs.first-step.ref-discount-is-larger")}
                </Text1>
              )}
              {promocodeValidateData &&
                promocodeValidateData.isReferralCode && (
                  <Text1 className="bg-gradient-to-r from-corral to-purple bg-clip-text text-transparent">
                    {t("buy-subs.first-step.ref-discount-available")}
                  </Text1>
                )}
              {totalPrice !== 0 && nutcrackersData && (
                <div
                  className={cn(
                    "mt-2 flex flex-col gap-1 rounded-lg bg-gray-5/30 px-3 py-2 dark:bg-gray-2/50 mobile-sm:min-w-[300px]",
                    scale &&
                      "3xl:mt-[0.52vw] 3xl:min-w-[19.53vw] 3xl:gap-[0.26vw] 3xl:rounded-[0.52vw] 3xl:px-[0.78125vw] 3xl:py-[0.52vw]"
                  )}
                >
                  <div
                    className={cn(
                      "flex flex-col justify-between gap-1 mobile-sm:flex-row mobile-sm:items-center mobile-sm:gap-6",
                      scale && "3xl:gap-[1.5625vw]"
                    )}
                  >
                    <Text0>
                      {t("buy-subs.first-step.points-for-purchase")}
                    </Text0>
                    {isDesktop ? (
                      <HoverCard openDelay={200}>
                        <HoverCardTrigger>
                          <div
                            className={cn(
                              "flex w-fit cursor-pointer items-center gap-1.5 rounded-xl p-1 transition-opacity hover:opacity-80",
                              scale &&
                                "3xl:gap-[0.39vw] 3xl:rounded-[0.78125vw] 3xl:p-[0.26vw]",
                              nutcrackersData.maxRarity === null
                                ? "border border-gray-3 dark:border-gray-5"
                                : nutcrackersData.maxRarity === "common"
                                  ? "bg-gray-5"
                                  : nutcrackersData.maxRarity === "uncommon"
                                    ? "bg-tools-green"
                                    : nutcrackersData.maxRarity === "rare"
                                      ? "bg-res-bot-blue"
                                      : nutcrackersData.maxRarity === "mythical"
                                        ? "bg-prime-pink"
                                        : nutcrackersData.maxRarity === "epic"
                                          ? "bg-university-velvet"
                                          : nutcrackersData.maxRarity ===
                                              "legendary" && "bg-academy-gold"
                            )}
                          >
                            <Text2
                              className={cn(
                                "rounded-full bg-gray-1 px-1 py-px text-gray-6 dark:bg-gray-6 dark:text-black",
                                scale && "3xl:px-[0.26vw] 3xl:py-[0.0651vw]",
                                nutcrackersData.maxRarity === null
                                  ? "bg-gray-3 dark:bg-gray-5"
                                  : nutcrackersData.maxRarity === "common" &&
                                      "bg-gray-1 dark:bg-gray-2 dark:text-gray-5"
                              )}
                            >
                              {Math.round(
                                nutcrackersData.pointsCacheBack * 100
                              )}
                              %
                            </Text2>
                            <TextAccent
                              className={cn(
                                "tabular-nums text-black dark:text-gray-6",
                                nutcrackersData.maxRarity === null
                                  ? "dark:text-gray-5"
                                  : nutcrackersData.maxRarity === "common"
                                    ? "dark:text-gray-1"
                                    : nutcrackersData.maxRarity === "epic"
                                      ? "text-gray-6"
                                      : nutcrackersData.maxRarity ===
                                          "legendary" && "dark:text-black"
                              )}
                            >
                              +
                              {(
                                totalPrice * nutcrackersData.pointsCacheBack
                              ).toFixed(2)}
                            </TextAccent>
                            <CryptonIcon
                              className={cn(
                                "h-5 w-5",
                                scale && "3xl:h-[1.3vw] 3xl:w-[1.3vw]"
                              )}
                            />
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent
                          className={cn(
                            "flex w-[95vw] flex-col gap-1 sm:w-[600px]",
                            scale && "3xl:w-[39.06vw] 3xl:gap-[0.26vw]"
                          )}
                        >
                          <CryptonPointsInfo />
                        </HoverCardContent>
                      </HoverCard>
                    ) : (
                      <Popover>
                        <PopoverTrigger>
                          <div
                            className={cn(
                              "flex w-fit cursor-pointer items-center gap-1.5 rounded-xl p-1 transition-opacity hover:opacity-80",
                              scale &&
                                "3xl:gap-[0.39vw] 3xl:rounded-[0.78125vw] 3xl:p-[0.26vw]",
                              nutcrackersData.maxRarity === null
                                ? "border border-gray-3 dark:border-gray-5"
                                : nutcrackersData.maxRarity === "common"
                                  ? "bg-gray-5"
                                  : nutcrackersData.maxRarity === "uncommon"
                                    ? "bg-tools-green"
                                    : nutcrackersData.maxRarity === "rare"
                                      ? "bg-res-bot-blue"
                                      : nutcrackersData.maxRarity === "mythical"
                                        ? "bg-prime-pink"
                                        : nutcrackersData.maxRarity === "epic"
                                          ? "bg-university-velvet"
                                          : nutcrackersData.maxRarity ===
                                              "legendary" && "bg-academy-gold"
                            )}
                          >
                            <Text2
                              className={cn(
                                "rounded-full bg-gray-1 px-1 py-px text-gray-6 dark:bg-gray-6 dark:text-black",
                                scale && "3xl:px-[0.26vw] 3xl:py-[0.0651vw]",
                                nutcrackersData.maxRarity === null
                                  ? "bg-gray-3 dark:bg-gray-5"
                                  : nutcrackersData.maxRarity === "common" &&
                                      "bg-gray-1 dark:bg-gray-2 dark:text-gray-5"
                              )}
                            >
                              {Math.round(
                                nutcrackersData.pointsCacheBack * 100
                              )}
                              %
                            </Text2>
                            <TextAccent
                              className={cn(
                                "tabular-nums text-black dark:text-gray-6",
                                nutcrackersData.maxRarity === null
                                  ? "dark:text-gray-5"
                                  : nutcrackersData.maxRarity === "common"
                                    ? "dark:text-gray-1"
                                    : nutcrackersData.maxRarity === "epic"
                                      ? "text-gray-6"
                                      : nutcrackersData.maxRarity ===
                                          "legendary" && "dark:text-black"
                              )}
                            >
                              +
                              {(
                                totalPrice * nutcrackersData.pointsCacheBack
                              ).toFixed(2)}
                            </TextAccent>
                            <CryptonIcon
                              className={cn(
                                "h-5 w-5",
                                scale && "3xl:h-[1.3vw] 3xl:w-[1.3vw]"
                              )}
                            />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-[95vw] dark:text-gray-5">
                          <CryptonPointsInfo small />
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                  <div className="mobile:smitems-center flex flex-col justify-between gap-1 mobile-sm:flex-row mobile-sm:gap-6">
                    <Text0>{t("buy-subs.first-step.with-nutcracker")}:</Text0>
                    {nutcrackersData.maxRarity === null ? (
                      isDesktop ? (
                        <HoverCard openDelay={200}>
                          <HoverCardTrigger>
                            <div
                              className={cn(
                                "flex cursor-pointer items-center gap-2",
                                scale && "3xl:gap-[0.52vw]"
                              )}
                            >
                              <TextAccent>100-200%</TextAccent>
                              <HelpIcon
                                className={cn(
                                  "h-5 w-5",
                                  scale && "3xl:h-[1.3vw] 3xl:w-[1.3vw]"
                                )}
                              />
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent
                            className={cn(
                              "flex w-[220px] flex-col gap-1",
                              scale && "3xl:w-[14.32vw] 3xl:gap-[0.26vw]"
                            )}
                          >
                            <RarityToDiscountTable />
                          </HoverCardContent>
                        </HoverCard>
                      ) : (
                        <Popover>
                          <PopoverTrigger>
                            <div
                              className={cn(
                                "flex cursor-pointer items-center gap-2",
                                scale && "3xl:gap-[0.52vw]"
                              )}
                            >
                              <TextAccent>10-20%</TextAccent>
                              <HelpIcon
                                className={cn(
                                  "h-5 w-5",
                                  scale && "3xl:h-[1.3vw] 3xl:w-[1.3vw]"
                                )}
                              />
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="dark:text-gray-5">
                            <RarityToDiscountTable />
                          </PopoverContent>
                        </Popover>
                      )
                    ) : (
                      <CheckIcon
                        className={cn(
                          "h-5 w-5",
                          scale && "3xl:h-[1.3vw] 3xl:w-[1.3vw]"
                        )}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
            <div
              className={cn(
                "flex flex-col items-end gap-2",
                scale && "3xl:gap-[0.521vw]"
              )}
            >
              <div
                className={cn(
                  "flex flex-wrap gap-2 sm:gap-5",
                  scale && "3xl:gap-[1.302vw]"
                )}
              >
                <Button onClick={openBalanceModal}>
                  {t("buy-subs.first-step.replenish-btn")}
                </Button>
                <Button
                  onClick={buySubscription}
                  disabled={totalPrice > balance || activeSub === null}
                  isLoading={isLoading}
                >
                  {t("buy-subs.first-step.buy")}
                </Button>
              </div>
              <Text1 className="text-error">
                {error
                  ? /* @ts-expect-error No-Error-Types */
                    error.errorCode === "discount_not_found"
                    ? t("buy-subs.first-step.promo-error")
                    : /* @ts-expect-error No-Error-Types */
                      error.errorCode === "discount_for_non_subscribed_only"
                      ? tErrorResponses("discount_for_non_subscribed_only")
                      : /* @ts-expect-error No-Error-Types */
                        error.errorCode === "discount_for_new_users_only"
                        ? tErrorResponses("discount_for_new_users_only")
                        : /* @ts-expect-error No-Error-Types */
                          error.errorCode === "discount_code_already_used"
                          ? tErrorResponses("discount_code_already_used")
                          : /* @ts-expect-error No-Error-Types */
                            error.errorCode === "discount_code_validation_error"
                            ? tErrorResponses("discount_code_validation_error")
                            : /* @ts-expect-error No-Error-Types */
                              error.errorCode === PROMO_CODE_NOT_FOUND
                              ? tErrorResponses("promocode_not_found")
                              : /* @ts-expect-error No-Error-Types */
                                error.errorCode === INSUFFICIENT_BALANCE
                                ? tErrorResponses("insufficient_balance")
                                : tErrorResponses("server-error")
                  : totalPrice > balance && t("buy-subs.first-step.not-enough")}
              </Text1>
            </div>
          </div>
        </div>

        <SubscriptionModalFooter />
      </DialogContent>
    </Dialog>
  )
}

// const PrimeInfo = () => {
//   const { t } = useTranslation("modals")

//   const scale = useAppSelector((state) => state.scale.value)

//   return (
//     <div
//       className={cn(
//         "flex flex-col sm:flex-row sm:items-center gap-6 mb-6",
//         scale && "3xl:gap-[1.563vw] 3xl:mb-[1.563vw]"
//       )}
//     >
//       <div
//         className={cn("flex items-center gap-3", scale && "3xl:gap-[0.781vw]")}
//       >
//         <PrimeIcon
//           className={cn(
//             "dark:fill-gray-5 w-[27px] h-[30px]",
//             scale && "3xl:w-[1.757vw] 3xl:h-[1.953vw]"
//           )}
//         />
//         <span
//           className={cn(
//             "text-[22px]/[22px] 2xl:text-2xl tracking-[0.03em] font-semibold",
//             scale && "3xl:text-[1.432vw]/[1.432vw]"
//           )}
//         >
//           Prime
//         </span>
//       </div>
//       <Text1 className={cn("max-w-[464px]", scale && "3xl:max-w-[30.208vw]")}>
//         {t("buy-subs.first-step.prime-desc")}
//       </Text1>
//     </div>
//   )
// }

export default FirstStep
