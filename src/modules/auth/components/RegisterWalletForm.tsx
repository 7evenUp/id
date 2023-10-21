import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useAccount } from "wagmi"
import { useTranslation } from "react-i18next"

import { ReactComponent as MoveLeft } from "@/assets/icons/move-left.svg"

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

import { WalletReqParams, useRegisterByWalletMutation } from "@/redux/api/auth"
import { useAppSelector } from "@/redux/hooks"

import { cutWalletAddr } from "@/utils/cutWalletAddr"

import { cn } from "@/lib/classNames"

import { MAIL_TO_LINK } from "../constants"

const AUTH_MESSAGE = "Authorization"

const RegisterWalletForm = ({
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

  const { address } = useAccount()

  const [regWallet, { isSuccess, isLoading, error }] =
    useRegisterByWalletMutation()

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
      email: "",
    },
  })

  const onSubmit = async ({ email, username }: z.infer<typeof formSchema>) => {
    if (!address) return

    try {
      const url = new URL(location.href)
      const refCode = url.searchParams.get("ref_code")

      const cleanEmail = email.toLowerCase().trim()
      setEmailDomain(cleanEmail.split("@")[1])

      let payload: WalletReqParams = {
        address: address.toLowerCase(),
        message: AUTH_MESSAGE,
        signature,
        email: cleanEmail,
        profile_username: username,
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
      <Form {...form}>
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
                  <AuthInput placeholder={t("email-placeholder")} {...field} />
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
              scale && "3xl:text-[0.625vw]/[0.833vw]"
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
      <div className={cn("flex mt-3", scale && "3xl:mt-[0.625vw]")}>
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
              <a href={emailDomain} target="_blank" className="underline">
                {emailDomain}
              </a>
            )}
          </ResponseSuccessText>
        )}
        {error && (
          <ResponseErrorText>
            {tErrorResponses("server-error")}
          </ResponseErrorText>
        )}
      </div>
    </>
  )
}

export default RegisterWalletForm
