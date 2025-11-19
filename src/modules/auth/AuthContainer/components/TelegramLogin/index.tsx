import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { AxiosError } from "axios"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../shared/Form"
import Button from "../../shared/Button"
import Input from "../../shared/Input"

import { LoginRequest } from "../../api/types"
import AuthApi from "../../api"

import { useTranslate } from "../../useTranslate"

import "./styles.css"
import AuthByCode from "../AuthByCode"

const TelegramLogin = () => {
  const t = useTranslate()

  const {
    mutate: login,
    isPending: isLoginLoading,
    isSuccess,
    error,
  } = useMutation({ mutationFn: (body: LoginRequest) => AuthApi.login(body) })

  const formSchema = z.object({
    tgUsername: z
      .string()
      .min(5, {
        message: t("Минимальная длина - 5 символов"),
      })
      .max(32, {
        message: t("Максимальная длина - 32 символа"),
      })
      .regex(new RegExp("^[a-zA-Z0-9_]+$", "g"), {
        message: t("Формат допускает использование символов a-z, 0-9 и _"),
      })
      .regex(new RegExp("^[a-zA-Z]"), {
        message: t("Username не может начинаться с цифры или _"),
      })
      .regex(new RegExp("[a-zA-Z0-9]$"), {
        message: t("Username не может заканчиваться символом _"),
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tgUsername: "",
    },
  })

  const onSubmit = async ({ tgUsername }: z.infer<typeof formSchema>) => {
    login({
      tg_username: tgUsername,
    })
  }

  const onSendAgainClick = () => {
    if (isLoginLoading) return

    login({ tg_username: form.watch("tgUsername") })
  }

  if (isSuccess) return <AuthByCode isTelegramCode={true} />

  if (error instanceof AxiosError) {
    if (error.response?.data.code === "user_not_found") {
      return (
        <>
          <p className="id_crypton_register_description">
            {t("Мы не смогли найти аккаунт с таким Telegram Username")}:{" "}
            <b>{form.watch("tgUsername")}</b>
          </p>

          <ul className="id_crypton_list">
            <li>
              {t("1. Перейдите и активируйте")}{" "}
              <a
                className="id_crypton_link"
                href="https://t.me/CryptonLobbyBot"
                target="_blank"
              >
                Lobby bot
              </a>
              . {t("Таким образом вы создадите аккаунт в нашей системе")}
            </li>
            <li>{t("2. Нажмите кнопку повторной отправки кода ниже")}</li>
          </ul>

          <Button
            style={{ marginTop: 24 }}
            isLoading={isLoginLoading}
            onClick={onSendAgainClick}
          >
            {t("Отправить код повторно")}
          </Button>
        </>
      )
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="id_crypton_form">
        <p className="id_crypton_register_description">
          {t("Введите ваш Telegram Username")}
        </p>

        <div className="id_crypton_inputs_wrapper">
          <FormField
            name="tgUsername"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <label className="id_crypton_telegram_label">
                    <Input
                      type="text"
                      placeholder="Username"
                      {...field}
                      style={{ paddingLeft: 32 }}
                    />
                    <span className="id_crypton_telegram_at">@</span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button style={{ marginTop: 24 }} isLoading={isLoginLoading}>
          {t("Войти")}
        </Button>

        {error && (
          <p className="id_crypton_message__error" style={{ marginTop: 12 }}>
            {error instanceof AxiosError
              ? error.status === 429
                ? t(
                    "Замечено много попыток авторизации. Пожалуйста, повторите позже"
                  )
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

export default TelegramLogin
