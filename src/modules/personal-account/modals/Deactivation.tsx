import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form"

import {
  useDeactivateMutation,
  useUserProfileQuery,
  useVerifyDeactivationMutation,
} from "@/redux/api/profile"

const codeFormSchema = z.object({
  code: z
    .string()
    .min(1, {
      message: "Поле обязательно для заполнения.",
    })
    .regex(new RegExp("^[0-9]+$", "g"), { message: "Только цифры" }),
})

const Deactivation = () => {
  const { t } = useTranslation("modals")

  const { data: userProfile } = useUserProfileQuery()
  const [deactivate, { isLoading, isSuccess }] = useDeactivateMutation()
  const [
    verifyDeactivate,
    { isLoading: isVerifyLoading, isError: isVerifyError },
  ] = useVerifyDeactivationMutation()

  const { id } = userProfile!

  const form = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: { code: "" },
  })

  useEffect(() => {
    if (isVerifyError)
      form.setError(
        "code",
        { message: t("deactivation.error-incorrect-code") },
        { shouldFocus: true }
      )
  }, [isVerifyError, form])

  const onDeactivationStart = () => {
    deactivate({ id })
  }

  const onDelete = ({ code }: z.infer<typeof codeFormSchema>) => {
    verifyDeactivate({ id, code: parseInt(code) })
  }

  return (
    <DialogContent className="max-w-[500px] 2xl:max-w-[32.552vw]">
      <DialogHeader>
        <DialogTitle>{t("deactivation.heading")}</DialogTitle>
      </DialogHeader>
      <div>
        <p className="typography-text-0 mb-6 2xl:mb-[1.563vw] max-w-prose">
          {t("deactivation.text-1")}
        </p>
        <p className="typography-text-1 mb-2 2xl:mb-[0.521vw]">
          {t("deactivation.text-2")}
        </p>

        {!isSuccess ? (
          <Button
            className="w-fit mt-2 2xl:mt-[0.521vw]"
            onClick={onDeactivationStart}
            isLoading={isLoading}
          >
            {t("deactivation.send-code-btn")}
          </Button>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onDelete)}
              className="flex flex-col gap-[18px] 2xl:gap-[1.172vw]"
            >
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-3 dark:text-gray-4 group-focus-within:text-gray-1 dark:group-focus-within:text-gray-5">
                      {t("change-tg.code-label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm 2xl:text-[0.911vw]/[1.302vw] aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error"
                        placeholder={t("change-tg.code-placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="bg-error hover:bg-red-600 dark:hover:bg-red-600 text-white dark:text-white w-fit mt-2 2xl:mt-[0.521vw]"
                type="submit"
                isLoading={isVerifyLoading}
              >
                {t("deactivation.deactivate-btn")}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </DialogContent>
  )
}

export default Deactivation
