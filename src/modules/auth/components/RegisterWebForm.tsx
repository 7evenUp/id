import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form"
import { HiOutlineArrowNarrowLeft } from "react-icons/hi"
import { AuthInput } from "./AuthInput"
import ActionButton from "./ActionButton"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useRegisterByWalletMutation } from "@/redux/api/auth"
import { useTranslation } from "react-i18next"
import { useAccount, useConnect, useSignMessage } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { useEffect } from "react"

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

const AUTH_MESSAGE = "Authorization"

const RegisterWebForm = ({ back }: { back: () => void }) => {
  const { t } = useTranslation("auth")

  const { address, isConnected } = useAccount()
  const { connectAsync, isLoading: isLoadingConnect } = useConnect({
    connector: new InjectedConnector(),
  })
  const {
    isError: isSignError,
    isLoading: isLoadingSign,
    signMessageAsync,
  } = useSignMessage()

  const [regWallet, { isSuccess, isLoading, error }] =
    useRegisterByWalletMutation()

  useEffect(() => {
    if (isSuccess) location.reload()
  }, [isSuccess])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  const onSubmit = async ({ email, username }: z.infer<typeof formSchema>) => {
    try {
      let connectedAddress = ""
      if (!isConnected && address === undefined) {
        console.log("use connect")
        const connection = await connectAsync()
        connectedAddress = connection.account
      }
      const signature = await signMessageAsync({ message: AUTH_MESSAGE })
      const lowerAddress =
        isConnected && address
          ? address.toLowerCase()
          : connectedAddress.toLowerCase()
      await regWallet({
        address: lowerAddress,
        message: AUTH_MESSAGE,
        signature,
        email,
        profile_username: username,
      })
    } catch (error) {
      console.log("Catch error: ", error)
    }
  }
  return (
    <>
      <button
        className="typography-btn-big flex items-center gap-2 hover:text-gray-3 mb-6 w-fit"
        onClick={back}
      >
        <HiOutlineArrowNarrowLeft />
        <span className="text-left">{t("register.another-method")}</span>
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
          <ActionButton
            type="submit"
            isLoading={isLoading || isLoadingConnect || isLoadingSign}
          >
            {t("register.register-btn")}
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
}

export default RegisterWebForm
