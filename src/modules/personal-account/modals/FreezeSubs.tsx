import {
  ComponentPropsWithoutRef,
  Dispatch,
  SetStateAction,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import * as RadioGroup from "@radix-ui/react-radio-group"

import CheckIcon from "@/assets/icons/check.svg?react"
import Loader from "@/assets/icons/loader.svg?react"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"
import Text1 from "@/shared/typography/Text1"
import Text0 from "@/shared/typography/Text0"
import TextAccent from "@/shared/typography/TextAccent"

import {
  useFreezeSubsMutation,
  useUnfreezeSubsMutation,
  useUserProfileQuery,
} from "@/redux/api/profile"
import {
  useGiveFreezeFeedbackMutation,
  useUpdateFreezeFeedbackMutation,
} from "@/redux/api/freeze-feedback"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const FreezeSubs = () => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  const [isFeedbackOpened, setIsFeedbackOpened] = useState(false)

  const { data } = useUserProfileQuery()
  const [freeze, { isLoading: isFreezeLoading, isSuccess: isFreezeSuccess }] =
    useFreezeSubsMutation()
  const [
    unfreeze,
    { isLoading: isUnfreezeLoading, isSuccess: isUnfreezeSuccess },
  ] = useUnfreezeSubsMutation()

  const {
    subscriptionInfo: { status, isFreezeAllowed },
  } = data!

  const isFrozen = status === "FROZEN"

  const onFreezeClick = () => {
    freeze()
    setIsFeedbackOpened(true)
  }

  return (
    <>
      <DialogContent
        className={cn(
          "max-w-[560px] pb-16 sm:pb-16 lg:max-w-[700px]",
          scale && "3xl:max-w-[45.572vw] 3xl:pb-[4.166vw]"
        )}
      >
        <DialogHeader
          className={cn(
            "mb-4 flex-col gap-2 mobile:mb-6 mobile:flex-row mobile:items-center",
            scale && "3xl:mb-[1.563vw] 3xl:gap-[0.521vw]"
          )}
        >
          <div className="flex flex-col">
            <Text1
              className={cn(
                "flex items-center gap-2",
                scale && "3xl:gap-[0.521vw]"
              )}
            >
              {t("freeze.status")}:{" "}
              <span
                className={cn(
                  "select-none rounded-full bg-gradient-to-r px-1.5 py-0.5 italic text-gray-6",
                  scale && "3xl:px-[0.391vw] 3xl:py-[0.13vw]",
                  isFrozen
                    ? "from-frozen-start to-frozen-end"
                    : "from-green to-mint"
                )}
              >
                {isFrozen
                  ? t("freeze.status-frozen")
                  : t("freeze.status-active")}
              </span>
            </Text1>
            <Text1
              className={cn(
                "flex items-baseline gap-2",
                scale && "3xl:gap-[0.521vw]"
              )}
            >
              {t("freeze.freeze-available")}:{" "}
              <TextAccent>
                {isFreezeAllowed
                  ? t("freeze.freeze-available-true")
                  : t("freeze.freeze-available-false")}
              </TextAccent>
            </Text1>
          </div>
          {isFrozen ? (
            <Button
              className="w-fit"
              isLoading={isUnfreezeLoading}
              appearence={isUnfreezeSuccess ? "success" : "outlined"}
              onClick={() => unfreeze()}
            >
              {isUnfreezeSuccess
                ? t("freeze.request-success")
                : t("freeze.unfreeze-btn")}
            </Button>
          ) : (
            <Button
              className="w-fit"
              disabled={!isFreezeAllowed}
              isLoading={isFreezeLoading}
              appearence={isFreezeSuccess ? "success" : "outlined"}
              onClick={onFreezeClick}
            >
              {isFreezeSuccess
                ? t("freeze.request-success")
                : t("freeze.confirm-btn")}
            </Button>
          )}
        </DialogHeader>
        <div>
          <h3
            className={cn(
              "typography-semi-head mb-2.5",
              scale && "typography-semi-head_large 3xl:mb-[0.651vw]"
            )}
          >
            {t("freeze.sub-freeze-title")}
          </h3>
          <Text0 className="text-black dark:text-gray-4">
            {t("freeze.sub-freeze-desc")}
          </Text0>
        </div>
        <div>
          <h3
            className={cn(
              "typography-semi-head mb-2.5",
              scale && "typography-semi-head_large 3xl:mb-[0.651vw]"
            )}
          >
            {t("freeze.how-works-title")}
          </h3>
          <Text0 className="text-black dark:text-gray-4">
            {t("freeze.how-works-desc")}
          </Text0>
        </div>
        <DialogFooter>{t("freeze.footer")}</DialogFooter>
      </DialogContent>

      <FeedbackDialog
        isOpen={isFeedbackOpened}
        setIsOpen={setIsFeedbackOpened}
      />
    </>
  )
}

export default FreezeSubs

const FeedbackDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const [activeVariant, setActiveVariant] = useState<undefined | string>(
    undefined
  )
  const [inputValue, setInputValue] = useState("")
  const [step, setStep] = useState<1 | 2>(1)
  const [feedbackId, setFeedbackId] = useState<undefined | number>(undefined)

  const [giveFeedback, { isLoading: isGiveFeedbackLoading }] =
    useGiveFreezeFeedbackMutation()
  const [updateFeedback, { isLoading: isUpdateFeedbackLoading }] =
    useUpdateFreezeFeedbackMutation()

  const onSubmit = async () => {
    if (activeVariant === undefined) return
    if (isGiveFeedbackLoading) return

    const data = await giveFeedback({
      choice_reason: activeVariant,
      reason: activeVariant === "other" ? inputValue.trim() : "",
    }).unwrap()

    if (activeVariant === "other") {
      setIsOpen(false)
    } else {
      setStep(2)
      setFeedbackId(data.id)
    }
  }

  const onUpdate = () => {
    if (isUpdateFeedbackLoading) return
    if (activeVariant === undefined) return
    if (feedbackId === undefined) return

    updateFeedback({
      feedbackId,
      reason: inputValue.trim(),
      choice_reason: activeVariant,
    })

    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-96 gap-6 sm:p-4">
        {step === 1 ? (
          <>
            <div className="flex flex-col">
              <TextAccent className="mb-2 text-center">
                Ты заморозил подписку
              </TextAccent>
              <Text1 className="mb-1 text-center">
                Подскажи, пожалуйста, причину — это поможет нам стать лучше.
              </Text1>
              <Text1 className="text-center">
                🎁 Ты получишь +25 поинтов за ответ.{" "}
                <a
                  className="text-res-bot-blue underline underline-offset-2"
                  href="https://id.crypton.xyz?open_tab=store"
                  target="_blank"
                >
                  Посмотри
                </a>
                , где их можно потратить
              </Text1>
            </div>

            <RadioGroup.Root
              className="flex flex-col gap-2"
              value={activeVariant}
              onValueChange={(val) => setActiveVariant(val)}
            >
              <VariantButton value="personal">
                Временные личные причины
              </VariantButton>
              <VariantButton value="vacation">Отпуск</VariantButton>
              <VariantButton value="not-enough-time">
                Мало времени
              </VariantButton>
              <VariantButton value="not-enough-activities">
                Мало активностей
              </VariantButton>
              <VariantButton value="financial">
                Финансовые причины
              </VariantButton>
              <VariantButton value="other">
                Другое (введи свой вариант)
              </VariantButton>
              {activeVariant === "other" && (
                <textarea
                  className="rounded-[10px] border border-black/[0.08] bg-black/[0.04] p-3 text-base/[125%] outline-none transition-colors animate-in fade-in-10 zoom-in-0 placeholder:text-black/50 focus:border-black/[0.12] focus:bg-black/[0.06] dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder:text-gray-4 dark:focus:border-white/30 dark:focus:bg-white/20"
                  placeholder="Можешь рассказать подробнее, что именно ты имеешь в виду?"
                  value={inputValue}
                  onChange={(evt) => setInputValue(evt.currentTarget.value)}
                />
              )}
            </RadioGroup.Root>

            <button
              className="flex h-10 items-center justify-center rounded-[10px] border border-black/[0.08] bg-black/[0.04] text-base font-medium transition-colors hover:border-black/[0.16] hover:bg-black/[0.08] active:border-black/[0.12] active:bg-black/[0.06] disabled:pointer-events-none disabled:text-gray-3 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/20 dark:active:border-white/25 dark:active:bg-white/15 dark:disabled:text-gray-3"
              disabled={
                activeVariant === undefined ||
                (activeVariant === "other" && inputValue.trim().length === 0) ||
                isGiveFeedbackLoading
              }
              onClick={onSubmit}
            >
              {isGiveFeedbackLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Отправить"
              )}
            </button>
          </>
        ) : (
          <>
            <Text0 className="text-center">
              Спасибо за ответ! Можешь рассказать подробнее, что именно ты
              имеешь в виду?
            </Text0>
            <textarea
              className="rounded-[10px] border border-black/[0.08] bg-black/[0.04] p-3 text-base/[125%] outline-none transition-colors placeholder:text-black/50 focus:border-black/[0.12] focus:bg-black/[0.06] dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder:text-gray-4 dark:focus:border-white/30 dark:focus:bg-white/20"
              placeholder="Можешь рассказать подробнее, что именно ты имеешь в виду?"
              value={inputValue}
              onChange={(evt) => setInputValue(evt.currentTarget.value)}
            />
            <div className="flex flex-col gap-2">
              <button
                className="flex h-10 items-center justify-center rounded-[10px] border border-black/[0.08] bg-black/[0.04] text-base font-medium transition-colors hover:border-black/[0.16] hover:bg-black/[0.08] active:border-black/[0.12] active:bg-black/[0.06] disabled:pointer-events-none disabled:text-gray-3 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/20 dark:active:border-white/25 dark:active:bg-white/15 dark:disabled:text-gray-3"
                disabled={
                  inputValue.trim().length === 0 || isUpdateFeedbackLoading
                }
                onClick={onUpdate}
              >
                {isUpdateFeedbackLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Отправить"
                )}
              </button>
              <button
                className="flex h-10 items-center justify-center rounded-[10px] border border-black/[0.08] bg-black/[0.04] text-base font-medium transition-colors hover:border-black/[0.16] hover:bg-black/[0.08] active:border-black/[0.12] active:bg-black/[0.06] disabled:pointer-events-none disabled:text-gray-3 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/20 dark:active:border-white/25 dark:active:bg-white/15 dark:disabled:text-gray-3"
                onClick={() => setIsOpen(false)}
              >
                Закрыть
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

const VariantButton = ({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<typeof RadioGroup.Item>) => (
  <RadioGroup.Item
    {...rest}
    className={cn(
      "flex h-9 items-center justify-between rounded-[10px] bg-black/[0.04] px-3 text-left text-sm transition-colors hover:bg-black/[0.08] active:bg-black/[0.06] data-[state=checked]:bg-black/[0.08] dark:bg-white/10 dark:hover:bg-white/20 dark:active:bg-white/15 dark:data-[state=checked]:bg-white/20",
      className
    )}
  >
    {children}
    <RadioGroup.Indicator>
      <CheckIcon className="size-4 text-black dark:text-white" />
    </RadioGroup.Indicator>
  </RadioGroup.Item>
)
