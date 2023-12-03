import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { useTranslation } from "react-i18next"

import PrimeIcon from "@/assets/icons/products/Prime.svg?react"

import SubscriptionModalHeader from "../../components/SubscriptionModalHeader"
import SubscriptionModalFooter from "../../components/SubscriptionModalFooter"
import SubscriptionCard from "../../components/SubscriptionCard"

import Text1 from "@/shared/typography/Text1"

import { Dialog, DialogContent } from "@/shared/ui/Dialog"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"

import { cn } from "@/lib/classNames"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useBuyMutation } from "@/redux/api/subscription"
import { useValidatePromocodeMutation } from "@/redux/api/promocodes"
import { useAppSelector } from "@/redux/hooks"

import { Subscription } from "@/types/subscriptions"
import { PROMO_CODE_NOT_FOUND } from "@/utils/errorCodes"

const REFERRAL_DISCOUNT_AMOUNT = 5

const FirstStep = ({
  open,
  onOpenChange,
  openSecondStep,
  openBalanceModal,
  subscriptions,
  setBoughtSubDuration,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  openSecondStep: () => void
  openBalanceModal: () => void
  subscriptions: Subscription[]
  setBoughtSubDuration: Dispatch<SetStateAction<number>>
}) => {
  const { t } = useTranslation("modals")
  const { t: tErrorResponses } = useTranslation("reqResponses")

  const scale = useAppSelector((state) => state.scale.value)

  const [activeSub, setActiveSub] = useState<number | null>(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [promo, setPromo] = useState("")
  // больше ли скидка промокода чем реф скидка
  const [isPromoLarger, setIsPromoLarger] = useState<boolean | null>(null)

  const { data: userProfile } = useUserProfileQuery()
  const [buy, { isLoading, error }] = useBuyMutation()
  const [
    validatePromocode,
    {
      isError,
      reset: resetRequest,
      isLoading: isValidateLoading,
      isSuccess: isValidateSuccess,
    },
  ] = useValidatePromocodeMutation()

  const { balance, isReferralDiscountAvailable } = userProfile!

  const getSubscriptionPrice = (subID: number) => {
    const selectedSub = subscriptions[subID]
    const discount = selectedSub.baseDiscountAmount
    const activePrice =
      selectedSub.individualPrice === undefined
        ? selectedSub.price
        : selectedSub.individualPrice
    const price = discount === null ? activePrice : activePrice - discount

    return price
  }

  const onPromoInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (activeSub === null) return

    if (isError || isValidateSuccess) resetRequest()

    setIsPromoLarger(null)

    const price = getSubscriptionPrice(activeSub)
    setTotalPrice(
      isReferralDiscountAvailable ? price - REFERRAL_DISCOUNT_AMOUNT : price
    )
    setPromo(evt.currentTarget.value)
  }

  const onSelect = (subID: number) => {
    if (isError || isValidateSuccess) resetRequest()

    setIsPromoLarger(null)

    const price = getSubscriptionPrice(subID)
    setActiveSub(subID)
    setTotalPrice(
      isReferralDiscountAvailable ? price - REFERRAL_DISCOUNT_AMOUNT : price
    )
  }

  const applyPromo = async () => {
    if (activeSub === null) return

    const price = getSubscriptionPrice(activeSub)

    if (activeSub !== null) {
      try {
        const { discountAmount, discountKind } = await validatePromocode({
          promocode: promo,
          subscription: subscriptions[activeSub].id,
        }).unwrap()

        if (discountKind.id === "MONEY") {
          if (isReferralDiscountAvailable) {
            if (discountAmount < REFERRAL_DISCOUNT_AMOUNT) {
              setIsPromoLarger(false)
              setTotalPrice(price - REFERRAL_DISCOUNT_AMOUNT)
            } else {
              setIsPromoLarger(true)
              setTotalPrice(price - discountAmount)
            }
          } else {
            setTotalPrice(price - discountAmount)
          }
        } else {
          if (isReferralDiscountAvailable) {
            if (price * discountAmount < REFERRAL_DISCOUNT_AMOUNT) {
              setIsPromoLarger(false)
              setTotalPrice(price - REFERRAL_DISCOUNT_AMOUNT)
            } else {
              setIsPromoLarger(true)
              setTotalPrice(price - price * discountAmount)
            }
          } else {
            setTotalPrice(price - price * discountAmount)
          }
        }
      } catch {
        setPromo("")
      }
    }
  }

  const buySubscription = async () => {
    if (activeSub === null) return

    try {
      await buy({ id: subscriptions[activeSub].id, promocode: promo }).unwrap()
      setBoughtSubDuration(subscriptions[activeSub].duration.id)
      openSecondStep()
      setTotalPrice(0)
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
          "pb-14 sm:pb-14 sm:max-w-[560px] lg:max-w-[910px] xl:max-w-[1200px]",
          scale && "3xl:pb-[3.645vw] 3xl:max-w-[70vw]"
        )}
      >
        <SubscriptionModalHeader step={t("buy-subs.first-step.step")} />

        <div
          className={cn(
            "h-[400px] lg:h-auto overflow-y-auto pr-2 pb-1",
            scale && "3xl:pr-[0.521vw] 3xl:pb-[0.26vw]"
          )}
        >
          <PrimeInfo />

          <div
            className={cn(
              "flex flex-col mobile:flex-row items-center flex-wrap gap-3 sm:gap-5 mb-6",
              scale && "3xl:gap-[1.302vw] 3xl:mb-[1.563vw]"
            )}
          >
            {subscriptions.map((sub, i) => {
              let discount, activePrice, price

              if (sub.baseDiscount !== null && sub.baseDiscountAmount !== null)
                discount = {
                  percent: sub.baseDiscount,
                  amount: sub.baseDiscountAmount,
                }
              else discount = null

              if (sub.individualPrice === undefined) activePrice = sub.price
              else activePrice = sub.individualPrice

              if (discount === null) price = activePrice
              else price = activePrice - discount.amount

              return (
                <SubscriptionCard
                  key={sub.id}
                  duration={t("buy-subs.first-step.duration", {
                    count: sub.duration.id,
                  })}
                  discount={discount}
                  price={price}
                  selected={activeSub === i}
                  onSelect={() => onSelect(i)}
                />
              )
            })}
          </div>

          {activeSub !== null && (
            <div
              className={cn(
                "relative flex items-center gap-2 mb-5",
                scale && "3xl:gap-[0.521vw] 3xl:mb-[1.302vw]"
              )}
            >
              <Input
                placeholder={t("buy-subs.first-step.promo-placeholder")}
                value={promo}
                onChange={onPromoInputChange}
                className={cn(
                  isError &&
                    "text-error border-error dark:text-error dark:border-error focus:border-error dark:focus:border-error"
                )}
              />
              {isError && (
                <Text1
                  className={cn(
                    "absolute bottom-0 translate-y-4 text-error",
                    scale && "3xl:translate-y-[1.042vw]"
                  )}
                >
                  {t("buy-subs.first-step.promo-error")}
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
              "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
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
              {isReferralDiscountAvailable && (
                <Text1 className="text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text">
                  {isPromoLarger === null
                    ? t("buy-subs.first-step.ref-discount-available")
                    : isPromoLarger
                    ? t("buy-subs.first-step.ref-discount-is-smaller")
                    : t("buy-subs.first-step.ref-discount-is-larger")}
                </Text1>
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
                    error.errorCode === PROMO_CODE_NOT_FOUND
                    ? tErrorResponses("promocode_not_found")
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

const PrimeInfo = () => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center gap-6 mb-6",
        scale && "3xl:gap-[1.563vw] 3xl:mb-[1.563vw]"
      )}
    >
      <div
        className={cn("flex items-center gap-3", scale && "3xl:gap-[0.781vw]")}
      >
        <PrimeIcon
          className={cn(
            "dark:fill-gray-5 w-[27px] h-[30px]",
            scale && "3xl:w-[1.757vw] 3xl:h-[1.953vw]"
          )}
        />
        <span
          className={cn(
            "text-[22px]/[22px] 2xl:text-2xl tracking-[0.03em] font-semibold",
            scale && "3xl:text-[1.432vw]/[1.432vw]"
          )}
        >
          Prime
        </span>
      </div>
      <Text1 className={cn("max-w-[464px]", scale && "3xl:max-w-[30.208vw]")}>
        {t("buy-subs.first-step.prime-desc")}
      </Text1>
    </div>
  )
}

export default FirstStep
