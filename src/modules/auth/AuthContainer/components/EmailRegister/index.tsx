import { useState } from "react"
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
import { Checkbox, CheckboxLabel } from "../../shared/Checkbox"

import AuthApi from "../../api"
import { RegisterByMailRequest } from "../../api/types"

import { useTranslate } from "../../useTranslate"

import "./styles.css"

const EmailRegister = ({ emailInput }: { emailInput: string }) => {
  const t = useTranslate()

  const [emailDomain, setEmailDomain] = useState("")
  const [isNewsChecked, setIsNewsChecked] = useState(true)
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(true)
  const [isPrivacyError, setIsPrivacyError] = useState(false)

  const {
    mutate: register,
    isPending: isRegisterLoading,
    isSuccess: isRegisterSuccess,
    error,
  } = useMutation({
    mutationFn: (body: RegisterByMailRequest) => AuthApi.registerByEmail(body),
  })

  const formSchema = z.object({
    email: z.string(),
    username: z.string().min(1, {
      message: t("Поле обязательно для заполнения"),
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: emailInput,
    },
  })

  const onSubmit = async ({ email, username }: z.infer<typeof formSchema>) => {
    if (!isPrivacyChecked) {
      setIsPrivacyError(true)
      return
    }
    if (isRegisterLoading) return

    const url = new URL(location.href)
    const refCode = url.searchParams.get("ref_code")

    const cleanEmail = email.toLowerCase().trim()
    setEmailDomain(cleanEmail.split("@")[1])

    const redirect_url = window.location.origin

    let payload: RegisterByMailRequest = {
      email: cleanEmail,
      profile_username: username.trim(),
      redirect_url,
      advertising_consent: isNewsChecked,
      use_verification_code: !isDesktop,
    }

    if (refCode) {
      payload = {
        ...payload,
        referral_code: refCode,
      }
    }

    register(payload)
  }

  if (isRegisterSuccess) {
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
        <p className="id_crypton_register_description">
          {t("Создание аккаунта с почтой")}:
          <br />
          <b>{emailInput}</b>
        </p>
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t("Введите имя пользователя")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="id_crypton_checkboxes_wrapper">
          <div className="id_crypton_checkbox_container">
            <Checkbox
              id="news"
              checked={isNewsChecked}
              onCheckedChange={(val) => setIsNewsChecked(val as boolean)}
            />
            <CheckboxLabel htmlFor="news">
              {t("Подписаться на новости и скидки")}
            </CheckboxLabel>
          </div>
          <div className="id_crypton_checkbox_container">
            <Checkbox
              defaultChecked={true}
              id="privacy"
              checked={isPrivacyChecked}
              onCheckedChange={(val) => {
                setIsPrivacyChecked(val as boolean)
                if (val as boolean) setIsPrivacyError(false)
              }}
            />
            <CheckboxLabel htmlFor="privacy">
              {t("Подтверждаю, что ознакомлен и согласен с")}{" "}
              <a
                href="https://id.crypton.xyz/terms-of-use"
                className="text-res-bot-blue cursor-pointer hover:underline underline-offset-2 font-medium"
              >
                {t("Условиями и Положениями")}
              </a>{" "}
              {t("и")}{" "}
              <a
                href="https://id.crypton.xyz/privacy-policy"
                className="text-res-bot-blue cursor-pointer hover:underline underline-offset-2 font-medium"
              >
                {t("Политикой Конфиденциальности")}
              </a>
            </CheckboxLabel>
          </div>
          {isPrivacyError && (
            <p className="id_crypton_message__error">
              {t("Поле должно быть выбрано")}
            </p>
          )}
        </div>

        <Button style={{ marginTop: 24 }} isLoading={isRegisterLoading}>
          {t("Зарегистрироваться")}
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

export default EmailRegister
