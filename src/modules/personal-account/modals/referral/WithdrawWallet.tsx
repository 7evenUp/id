import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { ReactComponent as MoveLeft } from "@/assets/icons/move-left.svg"

import ResponseSuccessText from "@/components/ResponseSuccessText"
import ResponseErrorText from "@/components/ResponseErrorText"

import { Dialog, DialogContent, DialogHeader } from "@/shared/ui/Dialog"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"
import Chip from "@/shared/ui/Chip"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useWithdrawMutation } from "@/redux/api/referral"

type WithdrawType = "USDC (ERC-20)" | "USDT (ERC-20)" | "USDT (TRC-20)"

const WithdrawWallet = ({
  open,
  onOpenChange,
  openMain,
  close,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  openMain: () => void
  close: () => void
}) => {
  const { t } = useTranslation("modals")

  const [withdrawType, setWithdrawType] =
    useState<WithdrawType>("USDC (ERC-20)")

  const { data: userProfile } = useUserProfileQuery()
  const [
    requestWithdraw,
    { isLoading, error, isSuccess, reset: resetMutation },
  ] = useWithdrawMutation()

  const {
    referralInfo: { refBalance },
  } = userProfile!

  const formSchema = z.object({
    wallet: z.string().min(1, {
      message: "Поле обязательно для заполнения.",
    }),
    amount: z
      .string()
      .min(1, { message: "Поле обязательно для заполнения." })
      .refine((val) => parseFloat(val) <= refBalance, {
        message: "На балансе недостаточно средств",
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wallet: "",
      amount: "",
    },
  })

  const onSubmit = ({ amount, wallet }: z.infer<typeof formSchema>) => {
    requestWithdraw({
      amount: parseFloat(amount),
      wallet_address: wallet,
      kind: "TO_PERSONAL_WALLET",
    })
  }

  const onDialogClose = () => {
    form.reset()
    resetMutation()
    close()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open)
        form.reset()
        resetMutation()
      }}
    >
      <DialogContent className="max-w-[550px]">
        <DialogHeader>
          <button
            className="typography-btn-big dark:text-gray-5 flex items-center gap-2 hover:text-gray-3 dark:hover:text-gray-3"
            onClick={openMain}
          >
            <MoveLeft className="w-3.5 h-3.5" /> {t("ref-withdraw.back-btn")}
          </button>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-[18px]"
          >
            <FormField
              name="wallet"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-3 dark:text-gray-4 group-focus-within:text-gray-1 dark:group-focus-within:text-gray-5">
                    {t("ref-withdraw.address-placeholder")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-sm aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error"
                      placeholder="0x12345...abcdef"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 flex-wrap mb-2">
              <Chip
                onClick={() => setWithdrawType("USDC (ERC-20)")}
                type="button"
              >
                USDC Polygon (ERC20)
              </Chip>
              <Chip
                onClick={() => setWithdrawType("USDT (ERC-20)")}
                type="button"
              >
                USDT Polygon (ERC20)
              </Chip>
              <Chip
                onClick={() => setWithdrawType("USDT (TRC-20)")}
                type="button"
              >
                USDT Tron (TRC20)
              </Chip>
            </div>
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-3 dark:text-gray-4 group-focus-within:text-gray-1 dark:group-focus-within:text-gray-5">
                    {t("ref-withdraw.amount-label")}
                  </FormLabel>
                  <div className="relative w-[260px]">
                    <span className="absolute left-0 top-1 text-sm">$</span>
                    <FormControl>
                      <Input
                        className="w-[260px] pl-4 mb-2 text-sm aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error"
                        placeholder={t("ref-withdraw.amount-placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <span className="typography-text-1 absolute right-0 top-2">
                      {withdrawType}
                    </span>
                  </div>
                  <FormMessage />
                  <span className="typography-text-1 block">
                    {t("ref-withdraw.available")}: ${refBalance}
                  </span>
                </FormItem>
              )}
            />
            {isSuccess && (
              <ResponseSuccessText className="max-w-[320px]">
                {t("ref-withdraw.personal-wallet-success")}
              </ResponseSuccessText>
            )}
            {error && <ResponseErrorText error={error} />}

            {isSuccess ? (
              <Button className="w-fit" type="button" onClick={onDialogClose}>
                {t("ref-withdraw.close-btn")}
              </Button>
            ) : (
              <Button
                disabled={refBalance <= 0}
                isLoading={isLoading}
                className="w-fit"
              >
                {t("ref-withdraw.confirm-btn")}
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default WithdrawWallet
