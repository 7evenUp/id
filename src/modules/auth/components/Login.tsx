import { useState } from "react"
import { HiOutlineArrowNarrowLeft } from "react-icons/hi"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { ReactComponent as Web3Logo } from "@/assets/icons/utility/Web3_logo.svg"
import { ReactComponent as MailLogo } from "@/assets/icons/utility/Mail_logo.svg"

import AuthButton from "./AuthButton"
import ActionButton from "./ActionButton"
import { AuthInput } from "./AuthInput"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form"

import { useLoginMutation } from "@/redux/api/auth"

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Поле обязательно для заполнения.",
    })
    .email("Неверный формат почты."),
})

const Login = () => {
  const { t } = useTranslation("auth")

  const [isMailMode, setIsMailMode] = useState(false)

  const [trigger, { isLoading, isSuccess, error }] = useLoginMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    trigger({ ...values, redirect_url: "https://id.crypton.xyz" })
  }

  if (isMailMode)
    return (
      <>
        <button
          className="typography-btn-big flex items-center gap-2 hover:text-gray-3 mb-6 w-fit"
          onClick={() => setIsMailMode(false)}
        >
          <HiOutlineArrowNarrowLeft />
          <span className="text-left">{t("login.another-method")}</span>
        </button>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="group-focus-within:text-res-bot-blue">
                    {t("email-label")}
                  </FormLabel>
                  <FormControl>
                    <AuthInput
                      placeholder={t("email-placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ActionButton type="submit" isLoading={isLoading}>
              {t("login.login-btn")}
            </ActionButton>
          </form>
        </Form>
        <div className="flex mt-3">
          {isSuccess && (
            <span className="text-success text-xs font-medium tracking-wide">
              Ссылка для входа успешно отправлена вам на почту
            </span>
          )}
          {error && (
            <span className="text-error text-xs font-medium tracking-wide">
              {/* @ts-expect-error No-Error-Types */}
              {error.message ? (
                <span>
                  {/* @ts-expect-error No-Error-Types */}
                  {error.message}
                </span>
              ) : (
                <span>На стороне сервера произошла ошибка</span>
              )}
            </span>
          )}
        </div>
      </>
    )

  return (
    <div className="flex gap-3 flex-wrap items-center my-3.5">
      <AuthButton>
        <Web3Logo />
        <span>{t("web3-btn")}</span>
      </AuthButton>
      <AuthButton onClick={() => setIsMailMode(true)}>
        <MailLogo />
        <span>{t("email-btn")}</span>
      </AuthButton>
    </div>
  )
}

export default Login
