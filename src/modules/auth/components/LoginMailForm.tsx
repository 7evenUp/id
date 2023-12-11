import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useTranslation } from "react-i18next"
import { addMinutes, isAfter } from "date-fns"

import ActionButton from "./ActionButton"
import { AuthInput } from "./AuthInput"

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

import { useLoginMutation } from "@/redux/api/auth"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

import { MAIL_TO_LINK } from "../constants"
import { clearReferrer } from "@/redux/referrer/slice"

const NEW_YEAR_URL = "https://events.crypton.xyz/"
const NEW_YEAR_URL_DEV = "https://events-dev.crypton.xyz/"
const WEB3XMS_URL = "https://web3xms.com/"

const LoginMailForm = ({
  emailInput,
  setEmailInput,
}: {
  emailInput: string
  setEmailInput: Dispatch<SetStateAction<string>>
}) => {
  const { t } = useTranslation("auth")
  const { t: tSchema } = useTranslation("schema")
  const { t: tErrorResponses } = useTranslation("reqResponses")

  const dispatch = useAppDispatch()

  const scale = useAppSelector((state) => state.scale.value)
  const {
    productName: referrer,
    url: referrerUrl,
    timestamp,
  } = useAppSelector((state) => state.referrer)

  const [emailDomain, setEmailDomain] = useState("")

  const formSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: tSchema("required"),
      })
      .email(tSchema("email-incorrect-format")),
  })

  const [trigger, { isLoading, isSuccess, error }] = useLoginMutation({
    fixedCacheKey: "login-by-mail",
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: emailInput || "",
    },
  })

  const onSubmit = async ({ email }: z.infer<typeof formSchema>) => {
    const cleanEmail = email.toLowerCase().trim()

    setEmailInput(cleanEmail)
    setEmailDomain(cleanEmail.split("@")[1])

    let redirect_url = window.location.origin

    if (referrer && timestamp) {
      const currentTime = new Date()
      const timestampPlus2Minutes = addMinutes(new Date(timestamp), 2)

      if (isAfter(currentTime, timestampPlus2Minutes)) {
        redirect_url = window.location.origin
      } else {
        redirect_url =
          referrerUrl === NEW_YEAR_URL ||
          referrerUrl === NEW_YEAR_URL_DEV ||
          referrerUrl === WEB3XMS_URL
            ? referrerUrl + "quest/phase-1"
            : window.location.origin
      }
    }

    trigger({
      email: cleanEmail,
      redirect_url,
    })
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearReferrer())
    }
  }, [isSuccess])

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
                  <AuthInput placeholder={t("email-placeholder")} {...field} />
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
      <div className={cn("flex mt-3", scale && "3xl:mt-[0.781vw]")}>
        {isSuccess && (
          <ResponseSuccessText>
            {t("login.request-success")}{" "}
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

export default LoginMailForm
