import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

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
import { Dispatch, SetStateAction } from "react"

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Поле обязательно для заполнения.",
    })
    .email("Неверный формат почты."),
})

const LoginMailForm = ({
  setEmail,
}: {
  setEmail: Dispatch<SetStateAction<string>>
}) => {
  const { t } = useTranslation("auth")

  const [trigger, { isLoading, isSuccess, error }] = useLoginMutation({
    fixedCacheKey: "login-by-mail",
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async ({ email }: z.infer<typeof formSchema>) => {
    setEmail(email)
    trigger({
      email: email.toLowerCase().trim(),
      redirect_url: "https://id.crypton.xyz",
    })
  }

  return (
    <>
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
          <ActionButton type="submit" isLoading={isLoading}>
            {t("login.login-btn")}
          </ActionButton>
        </form>
      </Form>
      <div className="flex mt-3">
        {isSuccess && (
          <ResponseSuccessText>
            Ссылка для входа успешно отправлена вам на почту
          </ResponseSuccessText>
        )}
        {error && <ResponseErrorText error={error} />}
      </div>
    </>
  )
}

export default LoginMailForm
