import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useAccount } from "wagmi"
import { useTranslation } from "react-i18next"

import MoveLeft from "@/assets/icons/move-left.svg?react"

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

import { useUserProfileQuery } from "@/redux/api/profile"
import {
  WalletReqParams,
  useAuthByCodeMutation,
  useRegisterByWalletMobileMutation,
} from "@/redux/api/auth"
import { useAppSelector } from "@/redux/hooks"

import { cutWalletAddr } from "@/utils/cutWalletAddr"
import { INVALID_DATA } from "@/utils/errorCodes"

import { cn } from "@/lib/classNames"

import { MAIL_TO_LINK } from "../constants"

const AUTH_MESSAGE = "Authorization"

const RegisterWalletFormMobile = ({
  back,
  signature,
}: {
  signature: string
  back: () => void
}) => {
  const { t } = useTranslation("auth")
  const { t: tSchema } = useTranslation("schema")
  const { t: tErrorResponses } = useTranslation("reqResponses")

  const scale = useAppSelector((state) => state.scale.value)

  const [emailDomain, setEmailDomain] = useState("")
  const [isCodeSent, setIsCodeSent] = useState(false)

  const { address } = useAccount()

  const { refetch } = useUserProfileQuery()
  const [regWallet, { isSuccess: isRegisterSuccess, isLoading, error }] =
    useRegisterByWalletMobileMutation()

  const [
    authByCode,
    {
      isError: isAuthError,
      error: authError,
      isLoading: isAuthLoading,
      isSuccess: isAuthSuccess,
    },
  ] = useAuthByCodeMutation()

  useEffect(() => {
    if (isAuthSuccess) setTimeout(() => refetch(), 100)
  }, [isAuthSuccess])

  useEffect(() => {
    if (isRegisterSuccess) {
      setIsCodeSent(true)
    }
  }, [isRegisterSuccess])

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
      email: "",
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
    if (!address) return

    try {
      const url = new URL(location.href)
      const refCode = url.searchParams.get("ref_code")

      const cleanEmail = email.toLowerCase().trim()
      setEmailDomain(cleanEmail.split("@")[1])

      const redirect_url = window.location.origin

      let payload: WalletReqParams = {
        address: address.toLowerCase(),
        message: AUTH_MESSAGE,
        signature,
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

      await regWallet(payload)
    } catch (error) {
      console.log("Catch error: ", error)
    }
  }

  if (!address) return null

  return (
    <>
      <button
        className={cn(
          "text-sm flex items-center gap-2 text-gray-1 hover:text-gray-3 dark:text-white dark:hover:text-gray-5 mb-6 w-fit",
          scale && "3xl:text-[0.911vw] 3xl:gap-[0.521vw] 3xl:mb-[1.56vw]"
        )}
        onClick={back}
      >
        <MoveLeft
          className={cn(
            "w-3.5 h-3.5",
            scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
          )}
        />
        <span className="text-left">{t("login.another-method")}</span>
      </button>
      <p
        className={cn(
          "text-xs w-full mb-3",
          scale && "3xl:text-[0.625vw]/[0.833vw] 3xl:mb-[0.625vwvw]"
        )}
      >
        {t("register.creation-with-wallet")}: {cutWalletAddr(address)}
      </p>

      {isCodeSent ? (
        <Form {...codeForm} key="codeForm">
          <form
            onSubmit={codeForm.handleSubmit(onCodeSubmit)}
            className={cn("flex flex-col gap-3", scale && "3xl:gap-[0.625vw]")}
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
            <ActionButton type="submit" isLoading={isLoading}>
              {t("register.register-btn")}
            </ActionButton>
          </form>
        </Form>
      )}

      <div className={cn("flex mt-3", scale && "3xl:mt-[0.625vw]")}>
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
        {error && (
          <ResponseErrorText>
            {
              /* @ts-expect-error No-Error-Types */
              error.status === 429
                ? tErrorResponses("too-many-requests")
                : // @ts-expect-error No-Error-Types
                error.code === INVALID_DATA
                ? tErrorResponses("email_already_taken")
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

export default RegisterWalletFormMobile
