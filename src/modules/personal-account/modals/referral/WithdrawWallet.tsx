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

import Text1 from "@/shared/typography/Text1"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useWithdrawMutation } from "@/redux/api/referral"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

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
  const { t: tSchema } = useTranslation("schema")
  const { t: tErrorResponses } = useTranslation("reqResponses")

  const scale = useAppSelector((state) => state.scale.value)

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
      message: tSchema("required"),
    }),
    amount: z
      .string()
      .min(1, { message: tSchema("required") })
      .refine((val) => parseFloat(val) <= refBalance, {
        message: tSchema("balance-not-enough"),
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
      <DialogContent
        className={cn("max-w-[550px]", scale && "3xl:max-w-[35.807vw]")}
      >
        <DialogHeader>
          <button
            className={cn(
              "typography-btn-big dark:text-gray-5 flex items-center gap-2 hover:text-gray-3 dark:hover:text-gray-3",
              scale && "typography-btn-big_large 3xl:gap-[0.521vw]"
            )}
            onClick={openMain}
          >
            <MoveLeft
              className={cn(
                "w-3.5 h-3.5",
                scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
              )}
            />{" "}
            {t("ref-withdraw.back-btn")}
          </button>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
              "flex flex-col gap-[18px]",
              scale && "3xl:gap-[1.172vw]"
            )}
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
                      className={cn(
                        "text-sm aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error",
                        scale && "3xl:text-[1.0417vw]/[1.5625vw]"
                      )}
                      placeholder="0x12345...abcdef"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              className={cn(
                "flex flex-wrap gap-2 mb-2",
                scale && "3xl:gap-[0.521vw] 3xl:mb-[0.521vw]"
              )}
            >
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
                  <div
                    className={cn(
                      "relative w-[260px]",
                      scale && "3xl:w-[16.927vw]"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute left-0 top-1 text-sm",
                        scale && "3xl:top-[0.26vw] 3xl:text-[0.911vw]/[1.302vw]"
                      )}
                    >
                      $
                    </span>
                    <FormControl>
                      <Input
                        className={cn(
                          "w-[260px] pl-4 mb-2 text-sm aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error",
                          scale &&
                            "3xl:w-[16.927vw] 3xl:pl-[1.042vw] 3xl:mb-[0.521vw] 3xl:text-[0.911vw]/[1.302vw]"
                        )}
                        placeholder={t("ref-withdraw.amount-placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <Text1
                      className={cn(
                        "absolute right-0 top-2",
                        scale && "3xl:top-[0.521vw]"
                      )}
                    >
                      {withdrawType}
                    </Text1>
                  </div>
                  <FormMessage />
                  <Text1 className="block">
                    {t("ref-withdraw.available")}: ${refBalance}
                  </Text1>
                </FormItem>
              )}
            />
            {isSuccess && (
              <ResponseSuccessText
                className={cn("max-w-[320px]", scale && "3xl:max-w-[20.833vw]")}
              >
                {t("ref-withdraw.personal-wallet-success")}
              </ResponseSuccessText>
            )}
            {error && (
              <ResponseErrorText>
                {tErrorResponses("server-error")}
              </ResponseErrorText>
            )}

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
