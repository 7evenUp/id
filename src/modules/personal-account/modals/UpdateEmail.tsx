import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { BiLoaderAlt } from "react-icons/bi"

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
    <DialogContent className="mobile:w-[370px] sm:w-[370px]">
      <DialogHeader>
        <DialogTitle>Изменить почту</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[18px]"
        >
          <FormField
            name="oldEmail"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-3 dark:text-gray-4 group-focus-within:text-gray-1 dark:group-focus-within:text-gray-5">
                  Старая почта
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Введите вашу старую почту"
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
                  Новая почта
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Введите вашу новую почту"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isSuccess && (
            <span className="typography-text-2 text-success">
              Ваша почта успешно изменена
            </span>
          )}
          {error && (
            <span className="typography-text-2 text-error">
              {/* @ts-expect-error No-Error-Types */}
              {error.data.detail}
            </span>
          )}
          <div className="flex gap-2 items-center">
            {isLoading && <BiLoaderAlt className="animate-spin" />}
            <Button type="submit" className="w-fit">
              подтвердить
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}

export default UpdateEmail
