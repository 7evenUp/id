import { Dispatch, SetStateAction, useEffect, useState } from "react"
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

import {
  MailRegParams,
  useAuthByCodeMutation,
  useRegisterMobileMutation,
} from "@/redux/api/auth"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

import { MAIL_TO_LINK } from "../constants"

const RegisterMailFormMobile = ({
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
  const [isCodeSent, setIsCodeSent] = useState(false)

  const [
    registerMobile,
    {
      isLoading: isRegisterLoading,
      isSuccess: isRegisterSuccess,
      error: registerError,
    },
  ] = useRegisterMobileMutation()

  const [
    authByCode,
    { isError: isAuthError, error: authError, isLoading: isAuthLoading },
  ] = useAuthByCodeMutation()

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

  const codeFormSchema = z.object({
    code: z.string().min(1, {
      message: tSchema("required"),
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: emailInput || "",
    },
  })

  const codeForm = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: {
      code: "",
    },
  })

  const onCodeSubmit = async ({ code }: z.infer<typeof codeFormSchema>) => {
    const cleanCode = code.trim()

    authByCode({ code: cleanCode })
  }

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

    registerMobile(payload)
  }

  useEffect(() => {
    if (isRegisterSuccess) {
      setIsCodeSent(true)
    }
  }, [isRegisterSuccess])

  return (
    <>
      {isCodeSent ? (
        <Form {...codeForm} key="codeForm">
          <form
            onSubmit={codeForm.handleSubmit(onCodeSubmit)}
            className={cn("flex flex-col gap-3", scale && "3xl:gap-[0.781vw]")}
          >
            <FormField
              name="code"
              control={codeForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="group-focus-within:text-res-bot-blue">
                    {t("code-label")}
                  </FormLabel>
                  <FormControl>
                    <AuthInput placeholder={t("code-placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ActionButton type="submit" isLoading={isAuthLoading}>
              {t("login.login-btn")}
            </ActionButton>
          </form>
        </Form>
      ) : (
        <Form {...form} key="EmailForm">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("flex flex-col gap-3", scale && "3xl:gap-[0.625vw]")}
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
            <ActionButton type="submit" isLoading={isRegisterLoading}>
              {t("register.register-btn")}
            </ActionButton>
          </form>
        </Form>
      )}

      <div className={cn("flex mt-3", scale && "3xl:mt-[0.781vw]")}>
        {isRegisterSuccess && !isAuthError && (
          <ResponseSuccessText>
            {t("code-sent-register-success")}{" "}
            {emailDomain in MAIL_TO_LINK ? (
              <a
                href={
                  MAIL_TO_LINK[emailDomain as keyof typeof MAIL_TO_LINK].link
                }
                target="_blank"
                className="underline"
              >
                {MAIL_TO_LINK[emailDomain as keyof typeof MAIL_TO_LINK].name}
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
            {t("code-sent-success-2")}
          </ResponseSuccessText>
        )}

        {registerError && (
          <ResponseErrorText>
            {
              // @ts-expect-error No-Error-Types
              error.status === 429
                ? tErrorResponses("too-many-requests")
                : tErrorResponses("server-error")
            }
          </ResponseErrorText>
        )}

        {authError && (
          <ResponseErrorText>
            {
              // @ts-expect-error No-Error-Types
              authError.message === "Token not found"
                ? tErrorResponses("invalid-code")
                : // @ts-expect-error No-Error-Types
                authError.status === 429
                ? tErrorResponses("too-many-requests")
                : tErrorResponses("server-error")
            }
          </ResponseErrorText>
        )}
      </div>
    </>
  )
}

export default RegisterMailFormMobile
