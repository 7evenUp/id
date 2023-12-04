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
import { useTopUpBalanceMutation } from "@/redux/api/balance"
import { useAppSelector } from "@/redux/hooks"
import { useAvailableMethodsQuery } from "@/redux/api/payments"

import { cn } from "@/lib/classNames"

const PREDEFINED_AMOUNT_VALUES = ["74", "211", "400", "755"]

const Balance = () => {
  const { t } = useTranslation("modals")
  const { t: tSchema } = useTranslation("schema")
  const { t: tErrorResponses } = useTranslation("reqResponses")

  const scale = useAppSelector((state) => state.scale.value)

  const checkboxRef = useRef<HTMLButtonElement>(null)
  const [paymentType, setPaymentType] = useState<"crypto" | "card">("crypto")
  const [activePaymentMethod, setActivePaymentMethod] = useState(0)
  const [paymentURL, setPaymentURL] = useState("")

  const { data: profileData } = useUserProfileQuery()
  const { data: availableMethods } = useAvailableMethodsQuery()
  const [trigger, { isLoading, isSuccess, error }] = useTopUpBalanceMutation()

  const { balance } = profileData!

  const formSchema = z.object({
    amount: z
      .string()
      .min(1, { message: tSchema("required") })
      .regex(new RegExp("^[0-9]+$", "g"), {
        message: tSchema("digits-only"),
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { amount: "" },
  })

  if (!availableMethods || !availableMethods.length) return null

  const cryptoMethods = availableMethods
    .filter((el) => el.method.id === "crypto" && el.isActive)
    .toSorted((a, b) => +b.isDefault - +a.isDefault)
  // const cardMethods = availableMethods
  //   .filter((el) => el.method.id === "card" && el.isActive)
  //   .toSorted((a, b) => +b.isDefault - +a.isDefault)

  const onSubmit = async ({ amount }: z.infer<typeof formSchema>) => {
    if (!checkboxRef.current) return

    try {
      let paymentUrl = ""

      if (paymentType === "card") {
        paymentUrl = await trigger({
          amount: parseInt(amount),
          is_receipt_need:
            checkboxRef.current.ariaChecked === "false" ? false : true,
          payment_type: "card",
          successUrl: "https://id.crypton.xyz/payment-success",
          failUrl: "https://id.crypton.xyz/payment-error",
        }).unwrap()
      } else {
        paymentUrl = await trigger({
          amount: parseInt(amount),
          is_receipt_need:
            checkboxRef.current.ariaChecked === "false" ? false : true,
          payment_type: "crypto",
          // @ts-expect-error If "crypto" non-nullable
          network: cryptoMethods[activePaymentMethod].network?.label,
          // @ts-expect-error string is one of values
          currency: cryptoMethods[activePaymentMethod].currency.label,
          successUrl: "https://id.crypton.xyz/payment-success",
          failUrl: "https://id.crypton.xyz/payment-error",
        }).unwrap()
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
        <div
          className={cn(
            "flex justify-between items-baseline gap-4 sm:gap-6 bg-gray-6 dark:bg-gray-2 rounded-xl p-3 mb-6",
            scale &&
              "3xl:gap-[1.563vw] 3xl:rounded-[0.781vw] 3xl:p-[0.781vw] 3xl:mb-[1.563vw]"
          )}
        >
          <Text0 className="text-gray-3 dark:text-gray-4">
            {t("balance.current")}
          </Text0>
          <span
            className={cn(
              "w-fit shrink-0 text-right font-semibold text-[40px] sm:text-[54px] dark:text-gray-5",
              scale && "3xl:text-[3.515vw]"
            )}
          >
            $ {balance}
          </span>
        </div>
        <div
          className={cn(
            "flex items-center gap-2 mb-4",
            scale && "3xl:gap-[0.521vw] 3xl:mb-1.041vw]"
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
                "w-40 2xl:w-44 shrink-0",
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
                "mt-4 mb-2",
                scale && "3xl:mt-[1.041vw] 3xl:mb-[0.52vw]"
              )}
            >
              {t("balance.choose-cryptocurrency")}:
            </Text1>
            <div
              className={cn(
                "flex items-center gap-2.5 mb-6",
                scale && "3xl:gap-[0.651vw] 3xl:mb-[1.5625vw]"
              )}
            >
              {cryptoMethods.map((el, i) => (
                <Chip
                  key={i}
                  className={cn(
                    i === activePaymentMethod &&
                      "bg-gray-1 text-gray-6 dark:bg-gray-5 dark:text-gray-1 dark:hover:bg-gray-5"
                  )}
                  onClick={() => setActivePaymentMethod(i)}
                >
                  {el.currency.label}
                </Chip>
              ))}
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
                  <FormLabel className="text-gray-3 dark:text-gray-4 group-focus-within:text-gray-1 dark:group-focus-within:text-gray-5">
                    {t("balance.amount-label")}
                  </FormLabel>
                  <div className="relative">
                    <span
                      className={cn(
                        "absolute left-0 top-1 3xl:top-[0.26vw] text-sm",
                        scale && "3xl:text-[0.911vw]/[1.302vw]"
                      )}
                    >
                      $
                    </span>
                    <FormControl>
                      <Input
                        className={cn(
                          "text-sm pl-4 aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error",
                          scale &&
                            "3xl:text-[0.911vw]/[1.302vw] 3xl:pl-[1.042vw]"
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
                  "flex items-center gap-2.5 mb-6",
                  scale && "3xl:gap-[0.651vw] 3xl:mb-[1.563vw]"
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
                  "flex items-center gap-2 mb-6",
                  scale && "3xl:gap-[0.521vw] 3xl:mb-[1.563vw]"
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
                    "flex flex-col gap-2 mb-6",
                    scale && "3xl:gap-[0.52vw] 3xl:mb-[1.563vw]"
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
                    error.message
                      ? // @ts-expect-error No-Error-Types
                        `${tErrorResponses("top-up-minimum")} ${error.message
                          .split(" ")
                          // @ts-expect-error No-Error-Types
                          .at(-2)} ${error.message.split(" ").at(-1)}`
                      : tErrorResponses("server-error")
                  }
                </ResponseErrorText>
              )}

              <div
                className={cn(
                  "flex items-center flex-wrap gap-3",
                  scale && "3xl:gap-[0.781vw]"
                )}
              >
                <Button className="w-fit" type="submit" isLoading={isLoading}>
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
