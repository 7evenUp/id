import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import ResponseSuccessText from "@/components/ResponseSuccessText"
import ResponseErrorText from "@/components/ResponseErrorText"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"
import Input from "@/shared/ui/Input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form"

import {
  useUpdateEmailMutation,
  useUserProfileQuery,
} from "@/redux/api/profile"

const UpdateEmail = () => {
  const { t } = useTranslation("modals")

  const { data: userProfileData } = useUserProfileQuery()
  const [updateEmail, { isSuccess, error, isLoading }] =
    useUpdateEmailMutation()

  const { email } = userProfileData!

  const formSchema = z.object({
    oldEmail: z
      .string()
      .min(1, {
        message: "Поле обязательно для заполнения.",
      })
      .email("Неверный формат почты.")
      .refine((val) => val === email, {
        message: "Неверно введена старая почта",
      }),
    newEmail: z
      .string()
      .min(1, { message: "Поле обязательно для заполнения." })
      .email("Неверный формат почты."),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldEmail: "",
      newEmail: "",
    },
  })

  const onSubmit = ({ newEmail }: z.infer<typeof formSchema>) => {
    updateEmail({
      email: newEmail,
    })
  }

  return (
    <DialogContent className="mobile:w-[370px] sm:w-[370px] 2xl:w-[24.088vw]">
      <DialogHeader>
        <DialogTitle>{t("change-email.heading")}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[18px] 2xl:gap-[1.172vw]"
        >
          <FormField
            name="oldEmail"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-3 dark:text-gray-4 group-focus-within:text-gray-1 dark:group-focus-within:text-gray-5">
                  {t("change-email.old-label")}
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-sm aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error appearance-none"
                    placeholder={t("change-email.old-placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="newEmail"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-3 dark:text-gray-4 group-focus-within:text-gray-1 dark:group-focus-within:text-gray-5">
                  {t("change-email.new-label")}
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-sm aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error rounded-none"
                    placeholder={t("change-email.new-placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isSuccess && (
            <ResponseSuccessText>
              Ваша почта успешно изменена
            </ResponseSuccessText>
          )}

          {error && <ResponseErrorText error={error} />}

          <div className="flex gap-2 2xl:gap-[0.521vw] items-center">
            <Button type="submit" className="w-fit" isLoading={isLoading}>
              {t("change-email.button")}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}

export default UpdateEmail
