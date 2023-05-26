import { useState } from "react"
import { HiOutlineArrowNarrowLeft } from "react-icons/hi"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"

import { ReactComponent as Web3Logo } from "@/assets/icons/utility/Web3_logo.svg"
import { ReactComponent as MailLogo } from "@/assets/icons/utility/Mail_logo.svg"

import AuthButton from "./AuthButton"
import ActionButton from "./ActionButton"
import { AuthInput } from "./AuthInput"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form"

import { useRegisterMutation } from "@/redux/api/auth"

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

const Register = () => {
  const [isMailMode, setIsMailMode] = useState(false)

  const [register, { isLoading, isSuccess, error }] = useRegisterMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    register(values)
  }

  if (isMailMode)
    return (
      <>
        <button
          className="typography-btn-big flex items-center gap-2 hover:text-gray-3 mb-6 w-fit"
          onClick={() => setIsMailMode(false)}
        >
          <HiOutlineArrowNarrowLeft />
          <span className="text-left">Другой метод регистрации</span>
        </button>
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
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <AuthInput placeholder="Введите вашу почту" {...field} />
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
                  <FormLabel>Имя пользователя</FormLabel>
                  <FormControl>
                    <AuthInput
                      placeholder="Введите ваше имя пользователя"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-xs w-full">
              Создавая учетную запись, я соглашаюсь с{" "}
              <a
                href="#"
                className="text-res-bot-blue cursor-pointer hover:underline underline-offset-2 font-medium"
              >
                Политикой конфиденциальности
              </a>
            </p>
            <ActionButton type="submit" isLoading={isLoading}>
              Зарегистрироваться
            </ActionButton>
          </form>
        </Form>
        <div className="flex mt-3">
          {isSuccess && (
            <span className="text-success text-xs font-medium tracking-wide">
              Вы успешно зарегистрированны! Перейдите по ссылке, которую мы
              отправили вам на почту
            </span>
          )}
          {error && (
            <span className="text-error text-xs font-medium tracking-wide">
              {/* @ts-expect-error No-Error-Types */}
              {error.message ? (
                <span>
                  {/* @ts-expect-error No-Error-Types */}
                  {error.message}
                </span>
              ) : (
                <span>На стороне сервера произошла ошибка</span>
              )}
            </span>
          )}
        </div>
      </>
    )

  return (
    <div className="flex gap-3 flex-wrap items-center my-3.5">
      <AuthButton>
        <Web3Logo />
        <span>Кошелёк</span>
      </AuthButton>
      <AuthButton onClick={() => setIsMailMode(true)}>
        <MailLogo />
        <span>Почта</span>
      </AuthButton>
    </div>
  )
}

export default Register
