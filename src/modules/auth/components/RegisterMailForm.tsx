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

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Поле обязательно для заполнения.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Поле обязательно для заполнения.",
    })
    .email("Неверный формат почты."),
})

const NewRegisterMailForm = ({ email }: { email: string }) => {
  const { t } = useTranslation("auth")

  const [register, { isLoading, isSuccess, error }] = useRegisterMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: email || "",
    },
  })

  const onSubmit = async ({ email, username }: z.infer<typeof formSchema>) => {
    const url = new URL(location.href)
    const refCode = url.searchParams.get("ref_code")

    let payload: MailRegParams = {
      email: email.toLowerCase().trim(),
      profile_username: username,
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
          className="flex flex-col gap-3 2xl:gap-[0.781vw]"
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
          <p className="text-xs 2xl:text-[0.781vw]/[1.042vw] w-full">
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
      <div className="flex mt-3 2xl:mt-[0.781vw]">
        {isSuccess && (
          <ResponseSuccessText>
            Вы успешно зарегистрированны! Перейдите по ссылке, которую мы
            отправили вам на почту
          </ResponseSuccessText>
        )}
        {error && <ResponseErrorText error={error} />}
      </div>
    </>
  )
}

export default NewRegisterMailForm
