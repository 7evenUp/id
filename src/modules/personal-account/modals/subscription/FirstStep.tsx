import { useState } from "react"
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

import { Subscription } from "@/types/subscriptions"
import { useBuyMutation } from "@/redux/api/subscription"

const FirstStep = ({
  open,
  onOpenChange,
  openSecondStep,
  openBalanceModal,
  subscriptions,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  openSecondStep: () => void
  openBalanceModal: () => void
  subscriptions: Subscription[]
}) => {
  const { t } = useTranslation("modals")
  
  const [activeSub, setActiveSub] = useState<number | null>(null)
  const [promo, setPromo] = useState("")
  const [isPromoInvalid, setIsPromoInvalid] = useState(false)
  const [isPromoApplied, setIsPromoApplied] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  
  const { data: userProfile } = useUserProfileQuery()
  const [buy, {error, data}] = useBuyMutation()

  if (error) console.log("ERROR: ", error)
  if (data) console.log("DATA: ", data)

  const { balance } = userProfile!

  const applyPromo = () => {
    if (!promo) {
      return
    }

    if (isPromoApplied) return

    if (promo !== "PROMO") {
      setIsPromoInvalid(true)
      return
    }

    setIsPromoApplied(true)
    setIsPromoInvalid(false)
    setTotalPrice(totalPrice - totalPrice * 0.1)
  }

  const onSelect = (subID: number) => {
    setActiveSub(subID)
    if (isPromoApplied) {
      setTotalPrice(
        subscriptions[subID].price - subscriptions[subID].price * 0.1
      )
    } else {
      setTotalPrice(subscriptions[subID].price)
    }
  }

  const buySubscription = () => {
    if (activeSub === null) return
    // openSecondStep()
    buy({id: subscriptions[activeSub].id, promocode: promo})
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
                discount={{
                  percent: sub.baseDiscount,
                  amount: (sub.price * sub.baseDiscount) / 100,
                }}
                price={sub.price}
                selected={activeSub === i}
                onSelect={() => onSelect(i)}
              />
            ))}
          </div>

          <div className="relative flex items-center gap-2 mb-5">
            <Input
              placeholder={t("buy-subs.first-step.promo-placeholder")}
              value={promo}
              onChange={(evt) => setPromo(evt.currentTarget.value)}
              className={cn(
                isPromoInvalid &&
                  "text-error border-error dark:text-error dark:border-error focus:border-error dark:focus:border-error"
              )}
            />
            {isPromoInvalid && (
              <span className="absolute bottom-0 translate-y-4 typography-text-1 text-error">
                Такого промокода не существует
              </span>
            )}
            {promo && <Button onClick={applyPromo}>готово</Button>}
          </div>

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
              <Button onClick={buySubscription} disabled={totalPrice > balance}>
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
