import { Dispatch, SetStateAction, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { isDesktop } from "react-device-detect"
import { differenceInMinutes } from "date-fns"
import { useForm } from "react-hook-form"
import { AxiosError } from "axios"
import * as z from "zod"

import AuthByCode from "../AuthByCode"
import MailToLinkMap from "../MailToLinkMap"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../shared/Form"
import Button from "../../shared/Button"
import Input from "../../shared/Input"

import AuthApi from "../../api"
import { LoginRequest } from "../../api/types"

import { useTranslate } from "../../useTranslate"

const EmailLogin = ({
  emailInput,
  setEmailInput,
  setIsUserNotFoundByMailLogin,
}: {
  emailInput: string
  setEmailInput: Dispatch<SetStateAction<string>>
  setIsUserNotFoundByMailLogin: Dispatch<SetStateAction<boolean>>
}) => {
  const t = useTranslate()

  const [emailDomain, setEmailDomain] = useState("")

  const {
    mutate: login,
    isPending: isLoginLoading,
    isSuccess: isLoginSuccess,
    error,
  } = useMutation({
    mutationFn: (body: LoginRequest) => AuthApi.login(body),
    onError: (error: Error) => {
      if (error instanceof AxiosError) {
        if (
          error.status === 400 &&
          error.response?.data.code === "user_not_found"
        ) {
          setIsUserNotFoundByMailLogin(true)
        }
      }
    },
  })

  const formSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: t("Поле обязательно для заполнения"),
      })
      .email(t("Неверный формат")),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: emailInput || "",
    },
  })

  const onSubmit = async ({ email }: z.infer<typeof formSchema>) => {
    if (isLoginLoading) return

    const cleanEmail = email.toLowerCase().trim()

    setEmailInput(cleanEmail)
    setEmailDomain(cleanEmail.split("@")[1])

    const redirect_url = window.location.origin

    login({
      email: cleanEmail,
      redirect_url,
      use_verification_code: !isDesktop,
    })
  }

  if (isLoginSuccess) {
    if (!isDesktop) {
      return <AuthByCode emailDomain={emailDomain} />
    } else {
      return (
        <p className="id_crypton_message__success">
          {t("Ссылка для входа отправлена вам на почту")}{" "}
          <MailToLinkMap emailDomain={emailDomain} />
        </p>
      )
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="id_crypton_form">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("Введите вашу почту")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button style={{ marginTop: 24 }} isLoading={isLoginLoading}>
          {t("Продолжить")}
        </Button>

        {error && (
          <p className="id_crypton_message__error" style={{ marginTop: 12 }}>
            {error instanceof AxiosError
              ? error.status === 429
                ? t(
                    "Замечено много попыток авторизации. Пожалуйста, повторите позже"
                  )
                : error.response?.data.loginBlockedTill
                  ? t(
                      "Повторное получение письма на почту будет доступно через "
                    ) +
                    differenceInMinutes(
                      new Date(error.response?.data.loginBlockedTill * 1000),
                      new Date()
                    ) +
                    t(" мин")
                  : t("На стороне сервера произошла ошибка")
              : t(
                  "Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже"
                )}
          </p>
        )}
      </form>
    </Form>
  )
}

export default EmailLogin
