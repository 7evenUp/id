import { useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import ResponseSuccessText from "@/components/ResponseSuccessText"
import ResponseErrorText from "@/components/ResponseErrorText"

import ModalTrigger from "../components/ModalTrigger"

import TxHistory from "./TxHistory"

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

const PREDEFINED_AMOUNT_VALUES = ["74", "211", "400", "755"]

const Balance = () => {
  const { t } = useTranslation("modals")
  const { t: tSchema } = useTranslation("schema")

  const checkboxRef = useRef<HTMLButtonElement>(null)

  const { data: profileData } = useUserProfileQuery()
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

  const onSubmit = async ({ amount }: z.infer<typeof formSchema>) => {
    if (!checkboxRef.current) return
    try {
      const paymentUrl = await trigger({
        amount: parseInt(amount),
        is_receipt_needed:
          checkboxRef.current.ariaChecked === "false" ? false : true,
      }).unwrap()
      form.reset()
      window.open(paymentUrl, "_blank")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DialogContent className="sm:w-[500px] 2xl:w-[32.552vw]">
      <div>
        <div className="flex justify-between items-baseline gap-4 sm:gap-6 2xl:gap-[1.563vw] bg-gray-6 dark:bg-gray-2 rounded-xl p-3 mb-6 2xl:rounded-[0.781vw] 2xl:p-[0.781vw] 2xl:mb-[1.563vw]">
          <span className="typography-text-0 text-gray-3 dark:text-gray-4">
            {t("balance.current")}
          </span>
          <span className="w-fit shrink-0 text-right font-semibold text-[40px] sm:text-[54px] 2xl:text-[3.515vw] dark:text-gray-5">
            $ {balance}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-5 2xl:gap-[0.521vw] 2xl:mb-1.302vw] typography-text-1">
          <span>{t("balance.choose-deposit")}:</span>
          <Select defaultValue="crypto">
            <SelectTrigger className="w-[130px] 2xl:w-[8.463vw]" />
            <SelectContent className="z-[999] w-[130px] 2xl:w-[8.463vw]">
              <SelectItem value="crypto">
                {t("balance.deposit-options.crypto")}
              </SelectItem>
              <SelectItem value="card" disabled>
                {t("balance.deposit-options.fiat")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-[18px] 2xl:gap-[1.172vw]"
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
                    <span className="absolute left-0 top-1 2xl:top-[0.26vw] text-sm 2xl:text-[0.911vw]/[1.302vw]">
                      $
                    </span>
                    <FormControl>
                      <Input
                        className="text-sm 2xl:text-[1.0417vw]/[1.5625vw] pl-4 2xl:pl-[1.042vw] aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error"
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
              <div className="flex items-center gap-2.5 mb-6 2xl:gap-[0.651vw] 2xl:mb-[1.563vw]">
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
              <div className="flex items-center gap-2 mb-6 2xl:gap-[0.521vw] 2xl:mb-[1.563vw]">
                <Checkbox id="email_bill" ref={checkboxRef} />
                <CheckboxLabel htmlFor="email_bill">
                  {t("balance.send-check")}
                </CheckboxLabel>
              </div>

              {isSuccess && (
                <ResponseSuccessText className="mb-6 2xl:mb-[1.563vw] block">
                  {t("balance.request-success")}
                </ResponseSuccessText>
              )}
              {error && (
                <ResponseErrorText
                  className="mb-6 2xl:mb-[1.563vw] block"
                  error={error}
                />
              )}

              <div className="flex items-center flex-wrap gap-3 2xl:gap-[0.781vw]">
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
