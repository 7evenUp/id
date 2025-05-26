import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { isDesktop } from "react-device-detect"
import { useAccount } from "wagmi"

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
import { RegisterByWalletRequest } from "../../api/types"

import "./styles.css"

const AUTH_MESSAGE = "Authorization"

const WalletRegister = ({
  signature,
  refetchAfterSuccessAuth,
}: {
  signature: string
  refetchAfterSuccessAuth: VoidFunction
}) => {
  const [emailDomain, setEmailDomain] = useState("")
  const [isNewsChecked, setIsNewsChecked] = useState(true)
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(true)

  const { address } = useAccount()

  const {
    mutate: register,
    isPending: isRegisterLoading,
    isSuccess: isRegisterSuccess,
    error,
  } = useMutation({
    mutationFn: (body: RegisterByWalletRequest) =>
      AuthApi.registerByWallet(body),
    onSuccess: (data) => {
      console.log("success: ", data)
    },
    onError: (error: Error) => {
      if (error instanceof AxiosError) {
        if (
          error.status === 400 &&
          error.response?.data.code === "user_not_found"
        ) {
          console.log("usernotfound")
        }
      }

      console.log(error)
      console.error(
        error instanceof AxiosError
          ? `❌ ${error.response?.data?.message || error.message}`
          : `❌ Неизвестная ошибка`
      )
    },
  })

  const formSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: "Поле обязательно для заполнения",
      })
      .email("Неверный формат"),
    username: z.string().min(1, {
      message: "Поле обязательно для заполнения",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  const onSubmit = async ({ email, username }: z.infer<typeof formSchema>) => {
    if (!isPrivacyChecked) return
    if (isRegisterLoading) return
    if (!address) return

    const url = new URL(location.href)
    const refCode = url.searchParams.get("ref_code")

    const cleanEmail = email.toLowerCase().trim()
    setEmailDomain(cleanEmail.split("@")[1])

    const redirect_url = window.location.origin

    let payload: RegisterByWalletRequest = {
      address: address.toLowerCase(),
      message: AUTH_MESSAGE,
      signature,
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
      return (
        <AuthByCode
          emailDomain={emailDomain}
          refetchAfterSuccessAuth={refetchAfterSuccessAuth}
        />
      )
    } else {
      return (
        <p className="id_crypton_message__success">
          Ссылка для входа отправлена вам на почту{" "}
          <MailToLinkMap emailDomain={emailDomain} />
        </p>
      )
    }
  }

  if (address === undefined) return null

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="id_crypton_form">
        <p className="id_crypton_register_description">
          Создание аккаунта с кошельком:
          <br />
          <b>{`${address.slice(0, 6)}...${address.slice(
            address.length - 4
          )}`}</b>
        </p>

        <div className="id_crypton_inputs_wrapper">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Введите вашу почту"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Введите имя пользователя" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="id_crypton_checkboxes_wrapper">
          <div className="id_crypton_checkbox_container">
            <Checkbox
              id="news"
              checked={isNewsChecked}
              onCheckedChange={(val) => setIsNewsChecked(val as boolean)}
            />
            <CheckboxLabel htmlFor="news">
              Подписаться на новости и скидки
            </CheckboxLabel>
          </div>
          <div className="id_crypton_checkbox_container">
            <Checkbox
              defaultChecked={true}
              id="privacy"
              checked={isPrivacyChecked}
              onCheckedChange={(val) => setIsPrivacyChecked(val as boolean)}
            />
            <CheckboxLabel htmlFor="privacy">
              Подтверждаю, что ознакомлен и согласен с{" "}
              <a
                href="https://id.crypton.xyz/terms-of-use"
                className="text-res-bot-blue cursor-pointer hover:underline underline-offset-2 font-medium"
              >
                Условиями и Положениями
              </a>{" "}
              и{" "}
              <a
                href="https://id.crypton.xyz/privacy-policy"
                className="text-res-bot-blue cursor-pointer hover:underline underline-offset-2 font-medium"
              >
                Политикой Конфиденциальности
              </a>
            </CheckboxLabel>
          </div>
        </div>

        <Button style={{ marginTop: 24 }} isLoading={isRegisterLoading}>
          Зарегистрироваться
        </Button>

        {error && (
          <p className="id_crypton_message__error" style={{ marginTop: 12 }}>
            {error instanceof AxiosError
              ? error.status === 429
                ? "Замечено много попыток авторизации. Пожалуйста, повторите позже"
                : error.response?.data.code === "invalid_data"
                ? "Аккаунт с таким email уже существует"
                : "На стороне сервера произошла ошибка"
              : "Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже"}
          </p>
        )}
      </form>
    </Form>
  )
}

export default WalletRegister
