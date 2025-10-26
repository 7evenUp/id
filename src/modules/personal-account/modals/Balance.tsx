import { useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import ResponseSuccessText from "@/components/ResponseSuccessText"
import ResponseErrorText from "@/components/ResponseErrorText"

import ModalTrigger from "../components/ModalTrigger"

import TxHistory from "./TxHistory"

import Text0 from "@/shared/typography/Text0"
import Text1 from "@/shared/typography/Text1"

import { DialogContent } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"
import Chip from "@/shared/ui/Chip"
import Input from "@/shared/ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/shared/ui/Select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form"
import { Checkbox, CheckboxLabel } from "@/shared/ui/Checkbox"

import { useUserProfileQuery } from "@/redux/api/profile"
import { TopUpReqParams, useTopUpBalanceMutation } from "@/redux/api/balance"
import { useAppSelector } from "@/redux/hooks"
import { useAvailableMethodsQuery } from "@/redux/api/payments"

import { cn } from "@/lib/classNames"
import useSendEvent from "@/shared/hooks/useSendEvent"

const PREDEFINED_AMOUNT_VALUES = ["390", "639", "998"]

const Balance = () => {
  const { t } = useTranslation("modals")
  const { t: tSchema } = useTranslation("schema")
  const { t: tErrorResponses } = useTranslation("reqResponses")

  const { sendEvent } = useSendEvent()

  const scale = useAppSelector((state) => state.scale.value)

  const checkboxRef = useRef<HTMLButtonElement>(null)
  const [paymentType, setPaymentType] = useState<"crypto" | "card">("crypto")
  const [activeToken, setActiveToken] = useState<string | undefined>(undefined)
  const [activeNetwork, setActiveNetwork] = useState<string | undefined>(
    undefined
  )
  const [paymentURL, setPaymentURL] = useState("")

  const { data: availableMethods } = useAvailableMethodsQuery()
  const [trigger, { isLoading, isSuccess, error }] = useTopUpBalanceMutation()

  const formSchema = z.object({
    amount: z
      .string()
      .min(1, { message: tSchema("required") })
      .regex(new RegExp("^[0-9]+$", "g"), {
        message: tSchema("digits-only"),
      })
      .refine((val) => parseInt(val) > 0, {
        message: tSchema("min-top-up"),
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { amount: "" },
  })

  const networks = new Set<string>()
  const tokens = new Set<string>()

  if (!availableMethods || !availableMethods.length) return null

  const cryptoMethods = availableMethods
    .filter((el) => el.method.id === "crypto" && el.isActive)
    .sort((a, b) => +b.isDefault - +a.isDefault)

  cryptoMethods.forEach((method) => {
    tokens.add(method.currency.label)

    if (method.network && method.network.label && activeToken) {
      if (activeToken === method.currency.label) {
        networks.add(method.network.label)
      }
    }
  })

  const onSubmit = async ({ amount }: z.infer<typeof formSchema>) => {
    if (!checkboxRef.current) return

    const url = new URL(location.href)
    const refCode = url.searchParams.get("ref_code")
    const utm_source = url.searchParams.get("utm_source")
    const utm_medium = url.searchParams.get("utm_medium")
    const utm_campaign = url.searchParams.get("utm_campaign")
    const utm_content = url.searchParams.get("utm_content")

    const utm_data = {
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      utm_content: utm_content || null,
    }

    try {
      let paymentUrl = ""

      if (paymentType === "card") {
        sendEvent({
          name: "topup_click",
          payload: { type: "card", amount: amount },
        })
        let payload: TopUpReqParams = {
          amount: parseInt(amount),
          is_receipt_need:
            checkboxRef.current.ariaChecked === "false" ? false : true,
          payment_type: "card",
          currency: "RUB",
          successUrl: "https://id.crypton.xyz/payment-success",
          failUrl: "https://id.crypton.xyz/payment-error",
        }
        if (refCode) {
          payload = { ...payload, referralCode: refCode }
        }
        if (utm_source || utm_medium || utm_campaign || utm_content) {
          payload = {
            ...payload,
            utm: JSON.stringify(utm_data),
          }
        }
        paymentUrl = await trigger(payload).unwrap()
      } else {
        sendEvent({
          name: "topup_click",
          payload: {
            type: "crypto",
            amount: amount,
            network: activeNetwork ?? "BSC",
            currency: activeToken ?? "USDT",
          },
        })
        let payload: TopUpReqParams = {
          amount: parseInt(amount),
          is_receipt_need:
            checkboxRef.current.ariaChecked === "false" ? false : true,
          payment_type: "crypto",
          // @ts-expect-error If "crypto" non-nullable
          network: activeNetwork ?? "BSC",
          // @ts-expect-error string is one of values
          currency: activeToken ?? "USDT",
          successUrl: "https://id.crypton.xyz/payment-success",
          failUrl: "https://id.crypton.xyz/payment-error",
        }
        if (refCode) {
          payload = { ...payload, referralCode: refCode }
        }
        if (utm_source || utm_medium || utm_campaign || utm_content) {
          payload = {
            ...payload,
            utm: JSON.stringify(utm_data),
          }
        }
        paymentUrl = await trigger(payload).unwrap()
      }

      setPaymentURL(paymentUrl)
      form.reset()
      window.open(paymentUrl, "_blank")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DialogContent className={cn("sm:w-[500px]", scale && "3xl:w-[32.552vw]")}>
      <div>
        <CurrentBalance />
        <div
          className={cn(
            "mb-4 flex items-center gap-2",
            scale && "3xl:mb-1.041vw] 3xl:gap-[0.521vw]"
          )}
        >
          <Text1>{t("balance.choose-deposit")}:</Text1>
          <Select
            value={paymentType}
            onValueChange={(value) =>
              setPaymentType(value as "crypto" | "card")
            }
          >
            <SelectTrigger
              className={cn(
                "w-40 shrink-0 2xl:w-44",
                scale && "3xl:w-[9.765vw]"
              )}
            />
            <SelectContent
              className={cn(
                "z-[999] w-40 2xl:w-44",
                scale && "3xl:w-[9.765vw]"
              )}
            >
              <SelectItem value="crypto">
                {t("balance.deposit-options.crypto")}
              </SelectItem>
              <SelectItem value="card">
                {t("balance.deposit-options.fiat")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {paymentType === "crypto" && (
          <>
            <Text1
              className={cn(
                "mb-2 mt-4",
                scale && "3xl:mb-[0.52vw] 3xl:mt-[1.041vw]"
              )}
            >
              {t("balance.choose-cryptocurrency")}:
            </Text1>
            <div
              className={cn(
                "mb-6 flex flex-wrap items-center gap-2.5",
                scale && "3xl:mb-[1.5625vw] 3xl:gap-[0.651vw]"
              )}
            >
              {[...tokens].map((el, i) => (
                <Chip
                  key={i}
                  className={cn(
                    el === activeToken &&
                      "bg-gray-1 text-gray-6 dark:bg-gray-5 dark:text-gray-1 dark:hover:bg-gray-5"
                  )}
                  onClick={() => {
                    setActiveToken(el)
                    setActiveNetwork(undefined)
                  }}
                >
                  {el}
                </Chip>
              ))}
            </div>
            <div
              className={cn(
                "mb-4 flex items-center gap-2",
                scale && "3xl:mb-1.041vw] 3xl:gap-[0.521vw]"
              )}
            >
              <Text1>{t("balance.choose-network")}:</Text1>
              <Select
                key={activeToken}
                value={activeNetwork}
                onValueChange={(value) => {
                  setActiveNetwork(value)
                }}
                disabled={!activeToken}
              >
                <SelectTrigger
                  placeholder={t("balance.choose")}
                  className={cn(
                    "w-[100px] shrink-0",
                    scale && "3xl:w-[6.51vw]"
                  )}
                />
                <SelectContent
                  className={cn("z-[999] w-[100px]", scale && "3xl:w-[6.51vw]")}
                >
                  {[...networks].map((el) => (
                    <SelectItem key={el} value={el}>
                      {el}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
              "flex flex-col gap-[18px]",
              scale && "3xl:gap-[1.172vw]"
            )}
          >
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-3 group-focus-within:text-gray-1 dark:text-gray-4 dark:group-focus-within:text-gray-5">
                    {t("balance.amount-label")}
                  </FormLabel>
                  <div className="relative">
                    <span
                      className={cn(
                        "absolute left-0 top-1 text-sm 3xl:top-[0.26vw]",
                        scale && "3xl:text-[0.911vw]/[1.302vw]"
                      )}
                    >
                      $
                    </span>
                    <FormControl>
                      <Input
                        className={cn(
                          "pl-4 text-sm aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error",
                          scale &&
                            "3xl:pl-[1.042vw] 3xl:text-[0.911vw]/[1.302vw]"
                        )}
                        placeholder={t("balance.amount-placeholder")}
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <div
                className={cn(
                  "mb-6 flex items-center gap-2.5",
                  scale && "3xl:mb-[1.563vw] 3xl:gap-[0.651vw]"
                )}
              >
                {PREDEFINED_AMOUNT_VALUES.map((amount, i) => (
                  <Chip
                    key={i}
                    onClick={() => form.setValue("amount", amount)}
                    type="button"
                  >
                    ${amount}
                  </Chip>
                ))}
              </div>
              <div
                className={cn(
                  "mb-6 flex items-center gap-2",
                  scale && "3xl:mb-[1.563vw] 3xl:gap-[0.521vw]"
                )}
              >
                <Checkbox id="email_bill" ref={checkboxRef} />
                <CheckboxLabel htmlFor="email_bill">
                  {t("balance.send-check")}
                </CheckboxLabel>
              </div>

              {isSuccess && (
                <div
                  className={cn(
                    "mb-6 flex flex-col gap-2",
                    scale && "3xl:mb-[1.563vw] 3xl:gap-[0.52vw]"
                  )}
                >
                  <ResponseSuccessText className="block">
                    {t("balance.request-success")}
                  </ResponseSuccessText>
                  <ResponseSuccessText className="block">
                    {t("balance.if-link-not-opened")}{" "}
                    <a href={paymentURL} target="_blank" className="underline">
                      {t("balance.link")}
                    </a>
                  </ResponseSuccessText>
                </div>
              )}
              {error && (
                <ResponseErrorText
                  className={cn("mb-6 block", scale && "3xl:mb-[1.563vw]")}
                >
                  {
                    // @ts-expect-error No-Error-Types
                    error.code === "invalid_data"
                      ? // @ts-expect-error No-Error-Types
                        `${tErrorResponses("top-up-minimum")} ${error.message
                          .split(" ")
                          // @ts-expect-error No-Error-Types
                          .at(-2)} ${error.message.split(" ").at(-1)}`
                      : // @ts-expect-error No-Error-Types
                        error.code === "top_up_low_limit"
                        ? tSchema("min-top-up")
                        : tErrorResponses("server-error")
                  }
                </ResponseErrorText>
              )}

              <div
                className={cn(
                  "flex flex-wrap items-center gap-3",
                  scale && "3xl:gap-[0.781vw]"
                )}
              >
                <Button
                  className="w-fit"
                  type="submit"
                  isLoading={isLoading}
                  disabled={
                    paymentType === "crypto" && activeNetwork === undefined
                  }
                >
                  {t("balance.replenish-btn")}
                </Button>
                {isSuccess && (
                  <ModalTrigger content={<TxHistory />}>
                    <Button>{t("balance.tx-history-btn")}</Button>
                  </ModalTrigger>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </DialogContent>
  )
}

export default Balance

const CurrentBalance = () => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()

  const { balance } = profileData!

  return (
    <div
      className={cn(
        "mb-6 flex items-end justify-between gap-4 rounded-xl bg-gray-6 p-3 dark:bg-gray-2 sm:gap-6",
        scale &&
          "3xl:mb-[1.563vw] 3xl:gap-[1.563vw] 3xl:rounded-[0.781vw] 3xl:p-[0.781vw]"
      )}
    >
      <Text0 className="text-gray-3 dark:text-gray-4">
        {t("balance.current")}
      </Text0>
      <span
        className={cn(
          "w-fit shrink-0 text-right text-4xl font-semibold dark:text-gray-5 sm:text-5xl",
          scale && "3xl:text-[3.125vw]"
        )}
      >
        $ {balance}
      </span>
    </div>
  )
}
