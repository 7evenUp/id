import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

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

import { useUserProfileQuery } from "@/redux/api/profile"
import { useTopUpBalanceMutation } from "@/redux/api/balance"

const PREDEFINED_AMOUNT_VALUES = ["5", "10", "20", "50", "100"]

const formSchema = z.object({
  amount: z
    .string()
    .min(1, { message: "Поле не может быть пустым" })
    .regex(new RegExp("^[0-9]+$", "g"), {
      message: "Допустимы только цифровые значения",
    }),
})

const Balance = () => {
  const { t } = useTranslation("modals")

  const { data: profileData } = useUserProfileQuery()

  const {
    subscriptionInfo: { currentBalance },
  } = profileData!

  const [trigger, { error }] = useTopUpBalanceMutation()

  if (error) console.log(error)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { amount: "" },
  })

  const onSubmit = ({ amount }: z.infer<typeof formSchema>) => {
    trigger({ amount: parseInt(amount) })
  }

  return (
    <DialogContent className="sm:w-[500px]">
      <div>
        <div className="flex justify-between items-baseline gap-4 sm:gap-6 bg-gray-6 dark:bg-gray-2 rounded-xl p-3 mb-6">
          <span className="typography-text-0 text-gray-3 dark:text-gray-4">
            {t("balance.current")}
          </span>
          <span className="w-fit shrink-0 text-right font-semibold text-[40px] sm:text-[54px] dark:text-gray-5">
            $ {currentBalance}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-5 typography-text-1">
          <span>{t("balance.choose-deposit")}:</span>
          <Select defaultValue="crypto">
            <SelectTrigger className="w-[130px]" />
            <SelectContent className="z-[999] w-[130px]">
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
            className="flex flex-col gap-[18px]"
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
                    <span className="absolute left-0 top-1 text-sm">$</span>
                    <FormControl>
                      <Input
                        className="text-sm pl-4 aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error"
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
              <div className="flex items-center gap-2.5 mb-6">
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
              <div className="flex items-center gap-2 mb-6">
                <input type="checkbox" id="email_bill" />
                <label
                  htmlFor="email_bill"
                  className="typography-btn-additional"
                >
                  {t("balance.send-check")}
                </label>
              </div>
              <Button className="w-fit" type="submit">
                {t("balance.replenish-btn")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DialogContent>
  )
}

export default Balance
