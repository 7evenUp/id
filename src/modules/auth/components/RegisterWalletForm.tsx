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
import { cutWalletAddr } from "@/utils/cutWalletAddr"

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

      let payload: WalletReqParams = {
        address: address.toLowerCase(),
        message: AUTH_MESSAGE,
        signature,
        email: email.toLowerCase().trim(),
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
        className="typography-btn-big flex items-center gap-2 hover:text-gray-3 mb-6 w-fit"
        onClick={back}
      >
        <MoveLeft className="w-3.5 h-3.5" />
        <span className="text-left">{t("login.another-method")}</span>
      </button>
      <p className="text-xs w-full mb-3">
        {t("register.creation-with-wallet")}: {cutWalletAddr(address)}
      </p>
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
          <p className="text-xs w-full">
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
      <div className="flex mt-3">
        {isSuccess && (
          <ResponseSuccessText>
            {t("register.request-success")}
          </ResponseSuccessText>
        )}
        {error && <ResponseErrorText error={error} />}
      </div>
    </>
  )
}

export default RegisterWalletForm
