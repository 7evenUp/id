import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useTranslation } from "react-i18next"

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
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const LoginMailForm = ({
  emailInput,
  setEmailInput,
}: {
  emailInput: string
  setEmailInput: Dispatch<SetStateAction<string>>
}) => {
  const { t } = useTranslation("auth")
  const { t: tSchema } = useTranslation("schema")

  const scale = useAppSelector(state=>state.scale.value)

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
    setEmailInput(email)
    trigger({
      email: email.toLowerCase().trim(),
      redirect_url: window.location.origin,
    })
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
            {t("login.request-success")}
          </ResponseSuccessText>
        )}
        {error && <ResponseErrorText error={error} />}
      </div>
    </>
  )
}

export default LoginMailForm
