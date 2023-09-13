import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"
import { SerializedError } from "@reduxjs/toolkit"
import { useTranslation } from "react-i18next"
import { isMobile } from "react-device-detect"

import { ReactComponent as MoveLeft } from "@/assets/icons/move-left.svg"
import { ReactComponent as HelpCircle } from "@/assets/icons/help-circle.svg"

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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/HoverCard"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"

import {
  useUpdateTelegramMutation,
  useVerifyTelegramMutation,
} from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"
import Text1 from "@/shared/typography/Text1"

const nicknameFormSchema = z.object({
  nickname: z.string(),
})

const codeFormSchema = z.object({
  code: z.string(),
})

const UpdateTelegram = () => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

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
    <DialogContent
      className="mobile:w-[370px] sm:w-[370px] 3xl:w-[24.088vw]"
      onCloseAutoFocus={(event) => event.preventDefault()}
    >
      {isSecondStep && (
        <button
          className="typography-btn-big flex items-center gap-2 3xl:gap-[0.521vw] hover:text-gray-3 w-fit"
          onClick={() => setIsSecondStep(false)}
        >
          <MoveLeft className="w-3.5 h-3.5 3xl:w-[0.911vw] 3xl:h-[0.911vw]" />
          <span className="text-left">{t("change-tg.back-button")}</span>
        </button>
      )}
      <DialogHeader className="mb-4 3xl:mb-[1.042vw]">
        <div className="flex flex-col">
          <DialogTitle>{t("change-tg.heading")}</DialogTitle>
        </div>
        <span
          className={cn(
            "flex items-center typography-text-0",
            scale && "typography-text-0_large"
          )}
        >
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
  const { t: tSchema } = useTranslation("schema")

  const nicknameFormSchema = z.object({
    nickname: z
      .string()
      .min(5, {
        message: tSchema("tg-username-min"),
      })
      .max(32, {
        message: tSchema("tg-username-max"),
      })
      .regex(new RegExp("^[a-zA-Z0-9_]+$", "g"), {
        message: tSchema("tg-username-incorrect-format"),
      })
      .regex(new RegExp("^[a-zA-Z]"), {
        message: tSchema("tg-username-starts-error"),
      })
      .regex(new RegExp("[a-zA-Z0-9]$"), {
        message: tSchema("tg-username-ends-error"),
      }),
  })

  const form = useForm<z.infer<typeof nicknameFormSchema>>({
    resolver: zodResolver(nicknameFormSchema),
    defaultValues: { nickname: defaultInputValue ? defaultInputValue : "" },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[18px] 3xl:gap-[1.172vw]"
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
                <span className="absolute left-0 top-1 3xl:top-[0.26vw] text-sm 3xl:text-[0.911vw]/[1.302vw]">
                  @
                </span>
                <FormControl>
                  <Input
                    className="w-full text-sm 3xl:text-[0.911vw]/[1.302vw] pl-4 3xl:pl-[1.042vw] aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error"
                    placeholder={t("change-tg.username-placeholder")}
                    {...field}
                  />
                </FormControl>
                {isMobile ? (
                  <Popover>
                    <PopoverTrigger asChild role="button">
                      <span>
                        <HelpCircle className="absolute right-0 top-1.5 3xl:top-[0.39vw] w-4 h-4 3xl:w-[1.041vw] 3xl:h-[1.041vw] cursor-pointer" />
                      </span>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      className="w-[300px] 3xl:w-[19.5313vw]"
                    >
                      <p className="3xl:text-[1.0417vw]/[1.5625vw]">
                        {t("change-tg.help-card-first")}
                        <a
                          className="text-res-bot-blue underline underline-offset-4 hover:opacity-70"
                          href="https://t.me/crypton_lobby_bot"
                          target="_blank"
                        >
                          {t("change-tg.help-card-link")}
                        </a>
                        {t("change-tg.help-card-second")}
                      </p>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger>
                      <HelpCircle className="absolute right-0 top-1.5 3xl:top-[0.39vw] w-4 h-4 3xl:w-[1.041vw] 3xl:h-[1.041vw] cursor-pointer" />
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <p>
                        {t("change-tg.help-card-first")}
                        <a
                          className="text-res-bot-blue underline underline-offset-4 hover:opacity-70"
                          href="https://t.me/crypton_lobby_bot"
                          target="_blank"
                        >
                          {t("change-tg.help-card-link")}
                        </a>
                        {t("change-tg.help-card-second")}
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <ResponseErrorText error={error} />}

        <Button
          className="w-fit mt-2 3xl:mt-[0.521vw]"
          type="submit"
          isLoading={isLoading}
        >
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
  const { t: tSchema } = useTranslation("schema")

  const codeFormSchema = z.object({
    code: z
      .string()
      .min(1, {
        message: tSchema("required"),
      })
      .regex(new RegExp("^[0-9]+$", "g"), { message: tSchema("digits-only") }),
  })

  const form = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: { code: "" },
  })

  useEffect(() => {
    if (isError)
      form.setError(
        "code",
        { message: t("change-tg.incorrect-code") },
        { shouldFocus: true }
      )
  }, [isError, form])

  return (
    <>
      <Text1>{t("change-tg.description")}</Text1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[18px] 3xl:gap-[1.172vw]"
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
                    className="text-sm 3xl:text-[0.911vw]/[1.302vw] aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error"
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
              {t("change-tg.request-success")}
            </ResponseSuccessText>
          )}

          <Button
            className="w-fit mt-2 3xl:mt-[0.521vw]"
            type="submit"
            isLoading={isLoading}
            disabled={isSuccess}
            appearence={isSuccess ? "success" : "outlined"}
          >
            {isSuccess
              ? t("change-tg.confirm-button-success")
              : t("change-tg.confirm-button")}
          </Button>
        </form>
      </Form>
    </>
  )
}
