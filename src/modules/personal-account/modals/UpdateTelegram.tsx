import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { HiOutlineArrowNarrowLeft } from "react-icons/hi"

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

const nicknameFormSchema = z.object({
  nickname: z
    .string()
    .min(5, {
      message: "Минимальная длина - 5 символов",
    })
    .max(32, {
      message: "Максимальная длина - 32 символа",
    })
    .regex(new RegExp("^[a-zA-Z0-9_]+$", "g"), {
      message: "Формат допускает использование символов a-z, 0-9 и underscores",
    })
    .regex(new RegExp("^[a-zA-Z]"), {
      message: "Никнейм не может начинаться с цифры или underscore",
    })
    .regex(new RegExp("[a-zA-Z0-9]$"), {
      message: "Никнейм не может заканчиваться символом underscore",
    }),
})

const codeFormSchema = z.object({
  code: z.string().min(1, {
    message: "Поле обязательно для заполнения.",
  }),
})

const UpdateTelegram = () => {
  const { t } = useTranslation("modals")
  const [nickInputValue, setNickInputValue] = useState("")
  const [isSecondStep, setIsSecondStep] = useState(false)

  const submitNickname = ({ nickname }: z.infer<typeof nicknameFormSchema>) => {
    setIsSecondStep(true)
    setNickInputValue(nickname)
    console.log(nickname)
  }

  const submitCode = ({ code }: z.infer<typeof codeFormSchema>) => {
    console.log(code)
  }

  return (
    <DialogContent className="mobile:w-[370px] sm:w-[370px]">
      {isSecondStep && (
        <button
          className="typography-btn-big flex items-center gap-2 hover:text-gray-3 w-fit"
          onClick={() => setIsSecondStep(false)}
        >
          <HiOutlineArrowNarrowLeft />
          <span className="text-left">{t("change-tg.back-button")}</span>
        </button>
      )}
      <DialogHeader className="mb-4">
        <div className="flex flex-col">
          <DialogTitle>{t("change-tg.heading")}</DialogTitle>
        </div>
        <span className="flex items-center typography-text-0">
          {isSecondStep ? "2" : "1"}/2
        </span>
      </DialogHeader>

      {!isSecondStep ? (
        <NicknameForm
          onSubmit={submitNickname}
          defaultInputValue={nickInputValue}
        />
      ) : (
        <CodeForm onSubmit={submitCode} />
      )}
    </DialogContent>
  )
}

export default UpdateTelegram

const NicknameForm = ({
  onSubmit,
  defaultInputValue,
}: {
  onSubmit: ({ nickname }: z.infer<typeof nicknameFormSchema>) => void
  defaultInputValue: string
}) => {
  const { t } = useTranslation("modals")

  const form = useForm<z.infer<typeof nicknameFormSchema>>({
    resolver: zodResolver(nicknameFormSchema),
    defaultValues: { nickname: defaultInputValue ? defaultInputValue : "" },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[18px]"
      >
        <FormField
          name="nickname"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-3 dark:text-gray-4 group-focus-within:text-gray-1 dark:group-focus-within:text-gray-5">
                {t("change-tg.username-label")}
              </FormLabel>
              <div className="relative">
                <span className="absolute left-0 top-1 text-sm">@</span>
                <FormControl>
                  <Input
                    className="w-full text-sm pl-4 aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error"
                    placeholder={t("change-tg.username-placeholder")}
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-fit mt-2" type="submit">
          {t("change-tg.sync-button")}
        </Button>
      </form>
    </Form>
  )
}

const CodeForm = ({
  onSubmit,
}: {
  onSubmit: ({ code }: z.infer<typeof codeFormSchema>) => void
}) => {
  const { t } = useTranslation("modals")

  const form = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: { code: "" },
  })

  return (
    <>
      <p className="typography-text-1">{t("change-tg.description")}</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[18px]"
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
                    className="text-sm aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error"
                    placeholder={t("change-tg.code-placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-fit mt-2" type="submit">
            {t("change-tg.confirm-button")}
          </Button>
        </form>
      </Form>
    </>
  )
}
