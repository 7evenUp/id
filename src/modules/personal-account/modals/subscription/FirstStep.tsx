import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { useTranslation } from "react-i18next"
import { isDesktop } from "react-device-detect"

import PrimeIcon from "@/assets/icons/products/Prime.svg?react"
import CryptonIcon from "@/assets/icons/crypton-logo.svg?react"
import CheckIcon from "@/assets/icons/check.svg?react"
import HelpIcon from "@/assets/icons/help-circle.svg?react"

import SubscriptionModalHeader from "../../components/SubscriptionModalHeader"
import SubscriptionModalFooter from "../../components/SubscriptionModalFooter"
import SubscriptionCard from "../../components/SubscriptionCard"

import TextAccent from "@/shared/typography/TextAccent"
import Text2 from "@/shared/typography/Text2"
import Text1 from "@/shared/typography/Text1"
import Text0 from "@/shared/typography/Text0"

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/Dialog"
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
  const { data: nutcrackersData } = useNutcrackersQuery()
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
              "flex flex-col lg:flex-row lg:items-center justify-between gap-2",
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
              {totalPrice !== 0 && nutcrackersData && (
                <div
                  className={cn(
                    "mobile-sm:min-w-[300px] bg-gray-5/30 dark:bg-gray-2/50 px-3 py-2 rounded-lg flex flex-col gap-1 mt-2",
                    scale &&
                      "3xl:min-w-[19.53vw] 3xl:px-[0.78125vw] 3xl:py-[0.52vw] 3xl:rounded-[0.52vw] 3xl:gap-[0.26vw] 3xl:mt-[0.52vw]"
                  )}
                >
                  <div
                    className={cn(
                      "flex justify-between mobile-sm:items-center flex-col mobile-sm:flex-row gap-1 mobile-sm:gap-6",
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
                              "w-fit flex items-center gap-1.5 p-1 rounded-xl cursor-pointer hover:opacity-80 transition-opacity",
                              scale &&
                                "3xl:gap-[0.39vw] 3xl:p-[0.26vw] 3xl:rounded-[0.78125vw]",
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
                                : nutcrackersData.maxRarity === "legendary" &&
                                  "bg-academy-gold"
                            )}
                          >
                            <Text2
                              className={cn(
                                "rounded-full bg-gray-1 dark:bg-gray-6 text-gray-6 dark:text-black px-1 py-px",
                                scale && "3xl:px-[0.26vw] 3xl:py-[0.0651vw]",
                                nutcrackersData.maxRarity === null
                                  ? "bg-gray-3 dark:bg-gray-5"
                                  : nutcrackersData.maxRarity === "common" &&
                                      "bg-gray-1 dark:bg-gray-2 dark:text-gray-5"
                              )}
                            >
                              {nutcrackersData.pointsCacheBack * 100}%
                            </Text2>
                            <TextAccent
                              className={cn(
                                "text-black dark:text-gray-6 tabular-nums",
                                nutcrackersData.maxRarity === null
                                  ? "dark:text-gray-5"
                                  : nutcrackersData.maxRarity === "common"
                                  ? "dark:text-gray-1"
                                  : nutcrackersData.maxRarity === "epic"
                                  ? "text-gray-6"
                                  : nutcrackersData.maxRarity === "legendary" &&
                                    "dark:text-black"
                              )}
                            >
                              +
                              {(
                                totalPrice * nutcrackersData.pointsCacheBack
                              ).toFixed(2)}
                            </TextAccent>
                            <CryptonIcon
                              className={cn(
                                "w-5 h-5",
                                scale && "3xl:w-[1.3vw] 3xl:h-[1.3vw]"
                              )}
                            />
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent
                          className={cn(
                            "flex flex-col gap-1 w-[95vw] sm:w-[600px]",
                            scale && "3xl:gap-[0.26vw] 3xl:w-[39.06vw]"
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
                              "w-fit flex items-center gap-1.5 p-1 rounded-xl cursor-pointer hover:opacity-80 transition-opacity",
                              scale &&
                                "3xl:gap-[0.39vw] 3xl:p-[0.26vw] 3xl:rounded-[0.78125vw]",
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
                                : nutcrackersData.maxRarity === "legendary" &&
                                  "bg-academy-gold"
                            )}
                          >
                            <Text2
                              className={cn(
                                "rounded-full bg-gray-1 dark:bg-gray-6 text-gray-6 dark:text-black px-1 py-px",
                                scale && "3xl:px-[0.26vw] 3xl:py-[0.0651vw]",
                                nutcrackersData.maxRarity === null
                                  ? "bg-gray-3 dark:bg-gray-5"
                                  : nutcrackersData.maxRarity === "common" &&
                                      "bg-gray-1 dark:bg-gray-2 dark:text-gray-5"
                              )}
                            >
                              {nutcrackersData.pointsCacheBack * 100}%
                            </Text2>
                            <TextAccent
                              className={cn(
                                "text-black dark:text-gray-6 tabular-nums",
                                nutcrackersData.maxRarity === null
                                  ? "dark:text-gray-5"
                                  : nutcrackersData.maxRarity === "common"
                                  ? "dark:text-gray-1"
                                  : nutcrackersData.maxRarity === "epic"
                                  ? "text-gray-6"
                                  : nutcrackersData.maxRarity === "legendary" &&
                                    "dark:text-black"
                              )}
                            >
                              +
                              {(
                                totalPrice * nutcrackersData.pointsCacheBack
                              ).toFixed(2)}
                            </TextAccent>
                            <CryptonIcon
                              className={cn(
                                "w-5 h-5",
                                scale && "3xl:w-[1.3vw] 3xl:h-[1.3vw]"
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
                  <div className="flex justify-between mobile:smitems-center flex-col mobile-sm:flex-row gap-1 mobile-sm:gap-6">
                    <Text0>{t("buy-subs.first-step.with-nutcracker")}:</Text0>
                    {nutcrackersData.maxRarity === null ? (
                      isDesktop ? (
                        <HoverCard openDelay={200}>
                          <HoverCardTrigger>
                            <div
                              className={cn(
                                "flex items-center gap-2 cursor-pointer",
                                scale && "3xl:gap-[0.52vw]"
                              )}
                            >
                              <TextAccent>10-20%</TextAccent>
                              <HelpIcon
                                className={cn(
                                  "w-5 h-5",
                                  scale && "3xl:w-[1.3vw] 3xl:h-[1.3vw]"
                                )}
                              />
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent
                            className={cn(
                              "flex flex-col gap-1 w-[220px]",
                              scale && "3xl:gap-[0.26vw] 3xl:w-[14.32vw]"
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
                                "flex items-center gap-2 cursor-pointer",
                                scale && "3xl:gap-[0.52vw]"
                              )}
                            >
                              <TextAccent>10-20%</TextAccent>
                              <HelpIcon
                                className={cn(
                                  "w-5 h-5",
                                  scale && "3xl:w-[1.3vw] 3xl:h-[1.3vw]"
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
                          "w-5 h-5",
                          scale && "3xl:w-[1.3vw] 3xl:h-[1.3vw]"
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

const RarityToDiscountTable = () => (
  <>
    <a
      href="https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Common%22%5D%7D%7D"
      target="_blank"
      className="flex items-center justify-between hover:underline"
    >
      <span>common</span>
      <TextAccent className="tabular-nums">10%</TextAccent>
    </a>
    <a
      href="https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Uncommon%22%5D%7D%7D"
      target="_blank"
      className="flex items-center justify-between text-tools-green hover:underline"
    >
      <span>uncommon</span>
      <TextAccent className="tabular-nums">12%</TextAccent>
    </a>
    <a
      href="https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Rare%22%5D%7D%7D"
      target="_blank"
      className="flex items-center justify-between text-res-bot-blue hover:underline"
    >
      <span>rare</span>
      <TextAccent className="tabular-nums">14%</TextAccent>
    </a>
    <a
      href="https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Mythical%22%5D%7D%7D"
      target="_blank"
      className="flex items-center justify-between text-prime-pink hover:underline"
    >
      <span>mythical</span>
      <TextAccent className="tabular-nums">16%</TextAccent>
    </a>
    <a
      href="https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Epic%22%5D%7D%7D"
      target="_blank"
      className="flex items-center justify-between text-university-velvet hover:underline"
    >
      <span>epic</span>
      <TextAccent className="tabular-nums">18%</TextAccent>
    </a>
    <a
      href="https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Legendary%22%5D%7D%7D"
      target="_blank"
      className="flex items-center justify-between text-academy-gold hover:underline"
    >
      <span>legendary</span>
      <TextAccent className="tabular-nums">20%</TextAccent>
    </a>
  </>
)

const CryptonPointsInfo = ({ small }: { small?: boolean }) => {
  const { t } = useTranslation("modals")

  const language = useAppSelector((state) => state.language.value)

  if (small)
    return (
      <>
        <DialogTitle>{t("points-info.heading")}</DialogTitle>

        <Text1>{t("points-info.text-1")}</Text1>
        <Text1>
          {t("points-info.text-2")}{" "}
          {language === "ru" ? (
            <>
              <a
                href="https://t.me/cryptonannouncement"
                target="_blank"
                className="underline underline-offset-4 text-res-bot-blue hover:opacity-70 transition-opacity"
              >
                канале анонсов
              </a>
            </>
          ) : (
            <a
              href="https://twitter.com/cryptonxyz"
              target="_blank"
              className="underline underline-offset-4 text-res-bot-blue hover:opacity-70 transition-opacity"
            >
              twitter
            </a>
          )}{" "}
          .
        </Text1>
        <Text1>{t("points-info.text-3")}</Text1>

        <DialogTitle>{t("points-info.part-2-heading")}</DialogTitle>

        <Text1>
          {t("points-info.part-2-text-1-1")}{" "}
          <a
            href="https://getgems.io/nutcrackers"
            target="_blank"
            className="underline underline-offset-4 text-res-bot-blue hover:opacity-70 transition-opacity"
          >
            Nutcrackers
          </a>{" "}
          {t("points-info.part-2-text-1-2")}
        </Text1>
        <Text1>{t("points-info.part-2-text-2")}</Text1>
        <Text1>{t("points-info.part-2-text-3")}</Text1>
        <Text1>{t("points-info.part-2-text-4")}</Text1>
      </>
    )

  return (
    <>
      <DialogTitle>{t("points-info.heading")}</DialogTitle>

      <Text0>{t("points-info.text-1")}</Text0>
      <Text0>
        {t("points-info.text-2")}{" "}
        {language === "ru" ? (
          <>
            <a
              href="https://t.me/cryptonannouncement"
              target="_blank"
              className="underline underline-offset-4 text-res-bot-blue hover:opacity-70 transition-opacity"
            >
              канале анонсов
            </a>
          </>
        ) : (
          <a
            href="https://twitter.com/cryptonxyz"
            target="_blank"
            className="underline underline-offset-4 text-res-bot-blue hover:opacity-70 transition-opacity"
          >
            twitter
          </a>
        )}{" "}
        .
      </Text0>
      <Text0>{t("points-info.text-3")}</Text0>

      <DialogTitle>{t("points-info.part-2-heading")}</DialogTitle>

      <Text0>
        {t("points-info.part-2-text-1-1")}{" "}
        <a
          href="https://getgems.io/nutcrackers"
          target="_blank"
          className="underline underline-offset-4 text-res-bot-blue hover:opacity-70 transition-opacity"
        >
          Nutcrackers
        </a>{" "}
        {t("points-info.part-2-text-1-2")}
      </Text0>
      <Text0>{t("points-info.part-2-text-2")}</Text0>
      <Text0>{t("points-info.part-2-text-3")}</Text0>
      <Text0>{t("points-info.part-2-text-4")}</Text0>
    </>
  )
}
