import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"
import { SerializedError } from "@reduxjs/toolkit"
import { useTranslation } from "react-i18next"

import { ReactComponent as MoveLeft } from "@/assets/icons/move-left.svg"

import ResponseErrorText from "@/components/ResponseErrorText"
import ResponseSuccessText from "@/components/ResponseSuccessText"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"
import Input from "@/shared/ui/Input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form"

import {
  useUpdateTelegramMutation,
  useVerifyTelegramMutation,
} from "@/redux/api/profile"

const nicknameFormSchema = z.object({
  nickname: z
    .string()
    .min(5, {
      message: "Минимальная длина - 5 символов",
    })
    .max(32, {
      message: "Максимальная длина - 32 символа",
    })
    .regex(new RegExp("^[a-zA-Z0-9_]+$", "g"), {
      message: "Формат допускает использование символов a-z, 0-9 и _",
    })
    .regex(new RegExp("^[a-zA-Z]"), {
      message: "Никнейм не может начинаться с цифры или _",
    })
    .regex(new RegExp("[a-zA-Z0-9]$"), {
      message: "Никнейм не может заканчиваться символом _",
    }),
})

const codeFormSchema = z.object({
  code: z
    .string()
    .min(1, {
      message: "Поле обязательно для заполнения.",
    })
    .regex(new RegExp("^[0-9]+$", "g"), { message: "Только цифры" }),
})

const UpdateTelegram = () => {
  const { t } = useTranslation("modals")

  const [nickInputValue, setNickInputValue] = useState("")
  const [isSecondStep, setIsSecondStep] = useState(false)

  const [changeTelegram, { isLoading: isChangeLoading, error }] =
    useUpdateTelegramMutation()
  const [verifyTelegram, { isLoading: isVerifyLoading, isError, isSuccess }] =
    useVerifyTelegramMutation()

  const submitNickname = async ({
    nickname,
  }: z.infer<typeof nicknameFormSchema>) => {
    await changeTelegram({ telegram: nickname }).unwrap()
    setIsSecondStep(true)
    setNickInputValue(nickname)
  }

  const submitCode = ({ code }: z.infer<typeof codeFormSchema>) => {
    verifyTelegram({ code: parseInt(code) })
  }

  return (
    <DialogContent className="mobile:w-[370px] sm:w-[370px] 2xl:w-[24.088vw]">
      {isSecondStep && (
        <button
          className="typography-btn-big flex items-center gap-2 2xl:gap-[0.521vw] hover:text-gray-3 w-fit"
          onClick={() => setIsSecondStep(false)}
        >
          <MoveLeft className="w-3.5 h-3.5 2xl:w-[0.911vw] 2xl:h-[0.911vw]" />
          <span className="text-left">{t("change-tg.back-button")}</span>
        </button>
      )}
      <DialogHeader className="mb-4 2xl:mb-[1.042vw]">
        <div className="flex flex-col">
          <DialogTitle>{t("change-tg.heading")}</DialogTitle>
        </div>
        <span className="flex items-center typography-text-0">
          {isSecondStep ? "2" : "1"}/2
        </span>
      </DialogHeader>

      {!isSecondStep ? (
        <NicknameForm
          onSubmit={submitNickname}
          defaultInputValue={nickInputValue}
          isLoading={isChangeLoading}
          error={error}
        />
      ) : (
        <CodeForm
          onSubmit={submitCode}
          isLoading={isVerifyLoading}
          isSuccess={isSuccess}
          isError={isError}
        />
      )}
    </DialogContent>
  )
}

export default UpdateTelegram

const NicknameForm = ({
  onSubmit,
  defaultInputValue,
  isLoading,
  error,
}: {
  onSubmit: ({ nickname }: z.infer<typeof nicknameFormSchema>) => void
  defaultInputValue: string
  isLoading: boolean
  error: FetchBaseQueryError | SerializedError | undefined
}) => {
  const { t } = useTranslation("modals")

  const form = useForm<z.infer<typeof nicknameFormSchema>>({
    resolver: zodResolver(nicknameFormSchema),
    defaultValues: { nickname: defaultInputValue ? defaultInputValue : "" },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[18px] 2xl:gap-[1.172vw]"
      >
        <FormField
          name="nickname"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-3 dark:text-gray-4 group-focus-within:text-gray-1 dark:group-focus-within:text-gray-5">
                {t("change-tg.username-label")}
              </FormLabel>
              <div className="relative">
                <span className="absolute left-0 top-1 2xl:top-[0.26vw] text-sm 2xl:text-[0.911vw]/[1.302vw]">@</span>
                <FormControl>
                  <Input
                    className="w-full text-sm 2xl:text-[0.911vw]/[1.302vw] pl-4 2xl:pl-[1.042vw] aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error"
                    placeholder={t("change-tg.username-placeholder")}
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <ResponseErrorText error={error} />}

        <Button className="w-fit mt-2 2xl:mt-[0.521vw]" type="submit" isLoading={isLoading}>
          {t("change-tg.sync-button")}
        </Button>
      </form>
    </Form>
  )
}

const CodeForm = ({
  onSubmit,
  isLoading,
  isSuccess,
  isError,
}: {
  onSubmit: ({ code }: z.infer<typeof codeFormSchema>) => void
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}) => {
  const { t } = useTranslation("modals")

  const form = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: { code: "" },
  })

  useEffect(() => {
    if (isError)
      form.setError("code", { message: "Неверный код" }, { shouldFocus: true })
  }, [isError, form])

  return (
    <>
      <p className="typography-text-1">{t("change-tg.description")}</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[18px] 2xl:gap-[1.172vw]"
        >
          <FormField
            name="code"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-3 dark:text-gray-4 group-focus-within:text-gray-1 dark:group-focus-within:text-gray-5">
                  {t("change-tg.code-label")}
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-sm 2xl:text-[0.911vw]/[1.302vw] aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error"
                    placeholder={t("change-tg.code-placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isSuccess && (
            <ResponseSuccessText>
              Telegram успешно синхронизирован
            </ResponseSuccessText>
          )}

          <Button
            className="w-fit mt-2 2xl:mt-[0.521vw]"
            type="submit"
            isLoading={isLoading}
            disabled={isSuccess}
            appearence={isSuccess ? "success" : "outlined"}
          >
            {isSuccess ? "Успешно" : t("change-tg.confirm-button")}
          </Button>
        </form>
      </Form>
    </>
  )
}
