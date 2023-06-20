import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as PrimeIcon } from "@/assets/icons/products/Prime.svg"

import SubscriptionModalHeader from "../../components/SubscriptionModalHeader"
import SubscriptionModalFooter from "../../components/SubscriptionModalFooter"
import SubscriptionCard from "../../components/SubscriptionCard"

import { Dialog, DialogContent } from "@/shared/ui/Dialog"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"

import { cn } from "@/lib/classNames"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useBuyMutation } from "@/redux/api/subscription"
import { useValidatePromocodeMutation } from "@/redux/api/promocodes"

import { Subscription } from "@/types/subscriptions"

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

  const [activeSub, setActiveSub] = useState<number | null>(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [promo, setPromo] = useState("")

  const { data: userProfile } = useUserProfileQuery()
  const [buy, { isLoading }] = useBuyMutation()
  const [
    validatePromocode,
    {
      isError,
      reset: resetRequest,
      isLoading: isValidateLoading,
      isSuccess: isValidateSuccess,
    },
  ] = useValidatePromocodeMutation()

  const { balance } = userProfile!

  const getSubscriptionPrice = (subID: number) => {
    const selectedSub = subscriptions[subID]
    const discount = selectedSub.baseDiscount
    const price =
      discount === null
        ? selectedSub.price
        : selectedSub.price - (selectedSub.price * discount) / 100
    return price
  }

  const onPromoInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (activeSub === null) return

    if (isError || isValidateSuccess) resetRequest()

    const price = getSubscriptionPrice(activeSub)
    setTotalPrice(price)
    setPromo(evt.currentTarget.value)
  }

  const onSelect = (subID: number) => {
    if (isError || isValidateSuccess) resetRequest()

    const price = getSubscriptionPrice(subID)
    setActiveSub(subID)
    setTotalPrice(price)
  }

  const applyPromo = async () => {
    if (activeSub !== null) {
      const { discountAmount, discountKind } = await validatePromocode({
        promocode: promo,
        subscription: subscriptions[activeSub].id,
      }).unwrap()

      if (discountKind.id === "MONEY") {
        setTotalPrice((prev) => prev - discountAmount)
      } else {
        setTotalPrice((prev) => prev - (prev * discountAmount) / 100)
      }
    }
  }

  const buySubscription = async () => {
    if (activeSub === null) return

    try {
      await buy({ id: subscriptions[activeSub].id, promocode: promo }).unwrap()
      setBoughtSubDuration(subscriptions[activeSub].duration.id)
      openSecondStep()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pb-14 sm:pb-14 sm:max-w-[560px] lg:max-w-[910px]">
        <SubscriptionModalHeader step={t("buy-subs.first-step.step")} />

        <div className="h-[400px] lg:h-auto overflow-y-auto pr-2 pb-1">
          <PrimeInfo />

          <div className="flex flex-col items-center flex-wrap mobile:flex-row gap-3 sm:gap-5 mb-6">
            {subscriptions.map((sub, i) => (
              <SubscriptionCard
                key={sub.id}
                duration={sub.name}
                discount={
                  sub.baseDiscount === null
                    ? null
                    : {
                        percent: sub.baseDiscount,
                        amount: (sub.price * sub.baseDiscount) / 100,
                      }
                }
                price={
                  sub.baseDiscount === null
                    ? sub.price
                    : sub.price - (sub.price * sub.baseDiscount) / 100
                }
                selected={activeSub === i}
                onSelect={() => onSelect(i)}
              />
            ))}
          </div>

          {activeSub !== null && (
            <div className="relative flex items-center gap-2 mb-5">
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
                <span className="absolute bottom-0 translate-y-4 typography-text-1 text-error">
                  {t("buy-subs.first-step.promo-error")}
                </span>
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

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex flex-col gap-0.5">
              <span className="typography-head">
                {t("buy-subs.first-step.total")}: ${totalPrice.toFixed(2)}
              </span>
              <span className="typography-tip text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text">
                {t("buy-subs.first-step.make-sure")}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-5">
              <Button onClick={openBalanceModal}>
                {t("buy-subs.first-step.replenish-btn")}
              </Button>
              <Button
                onClick={buySubscription}
                disabled={totalPrice > balance}
                isLoading={isLoading}
              >
                {t("buy-subs.first-step.buy")}
              </Button>
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

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
      <div className="flex items-center gap-3">
        <PrimeIcon className="dark:fill-gray-5" />
        <span className="typography-head">Prime</span>
      </div>
      <p className="typography-text-1 max-w-[464px]">
        {t("buy-subs.first-step.prime-desc")}
      </p>
    </div>
  )
}

export default FirstStep
