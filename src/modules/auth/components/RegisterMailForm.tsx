import { Dispatch, SetStateAction, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { AuthInput } from "./AuthInput"
import ActionButton from "./ActionButton"

import ResponseErrorText from "@/components/ResponseErrorText"
import ResponseSuccessText from "@/components/ResponseSuccessText"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form"

import { MailRegParams, useRegisterMutation } from "@/redux/api/auth"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

import { MAIL_TO_LINK } from "../constants"

const RegisterMailForm = ({
  emailInput,
  setEmailInput,
  resetLoginError,
}: {
  emailInput: string
  setEmailInput: Dispatch<SetStateAction<string>>
  resetLoginError: () => void
}) => {
  const { t } = useTranslation("auth")
  const { t: tSchema } = useTranslation("schema")
  const { t: tErrorResponses } = useTranslation("reqResponses")

  const scale = useAppSelector((state) => state.scale.value)

  const [emailDomain, setEmailDomain] = useState("")

  const [register, { isLoading, isSuccess, error }] = useRegisterMutation()

  const formSchema = z.object({
    username: z.string().min(1, {
      message: tSchema("required"),
    }),
    email: z
      .string()
      .min(1, {
        message: tSchema("required"),
      })
      .email(tSchema("email-incorrect-format")),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: emailInput || "",
    },
  })

  const onSubmit = async ({ email, username }: z.infer<typeof formSchema>) => {
    const url = new URL(location.href)
    const refCode = url.searchParams.get("ref_code")

    const cleanEmail = email.toLowerCase().trim()
    setEmailDomain(cleanEmail.split("@")[1])

    const redirect_url = window.location.origin

    let payload: MailRegParams = {
      email: cleanEmail,
      profile_username: username,
      redirect_url,
    }

    if (refCode) {
      payload = {
        ...payload,
        referral_code: refCode,
      }
    }

    register(payload)
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("flex flex-col gap-3", scale && "3xl:gap-[0.781vw]")}
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
                    onChange={(evt) => {
                      setEmailInput(evt.currentTarget.value)
                      resetLoginError()
                    }}
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
                <FormLabel className="group-focus-within:text-res-bot-blue">
                  {t("register.username-label")}
                </FormLabel>
                <FormControl>
                  <AuthInput
                    placeholder={t("register.username-placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p
            className={cn(
              "text-xs w-full",
              scale && "3xl:text-[0.781vw]/[1.042vw]"
            )}
          >
            {t("register.privacy-policy.text")}{" "}
            <a
              href="#"
              className="text-res-bot-blue cursor-pointer hover:underline underline-offset-2 font-medium"
            >
              {t("register.privacy-policy.link")}
            </a>
          </p>
          <ActionButton type="submit" isLoading={isLoading}>
            {t("register.register-btn")}
          </ActionButton>
        </form>
      </Form>
      <div className={cn("flex mt-3", scale && "3xl:mt-[0.781vw]")}>
        {isSuccess && (
          <ResponseSuccessText>
            {t("register.request-success")}{" "}
            {emailDomain in MAIL_TO_LINK ? (
              <a
                href={
                  MAIL_TO_LINK[
                    emailDomain as "gmail.com" | "mail.ru" | "yandex.ru"
                  ].link
                }
                target="_blank"
                className="underline"
              >
                {
                  MAIL_TO_LINK[
                    emailDomain as "gmail.com" | "mail.ru" | "yandex.ru"
                  ].name
                }
              </a>
            ) : (
              <a
                href={`https://${emailDomain}`}
                target="_blank"
                className="underline"
              >
                {emailDomain}
              </a>
            )}
          </ResponseSuccessText>
        )}
        {error && (
          <ResponseErrorText>
            {
              // @ts-expect-error No-Error-Types
              error.status === 429
                ? tErrorResponses("too-many-requests")
                : tErrorResponses("server-error")
            }
          </ResponseErrorText>
        )}
      </div>
    </>
  )
}

export default RegisterMailForm
