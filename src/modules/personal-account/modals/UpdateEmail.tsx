import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { DialogClose } from "@radix-ui/react-dialog"
import { useTranslation } from "react-i18next"

import MoveLeft from "@/assets/icons/move-left.svg?react"

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

import Text0 from "@/shared/typography/Text0"
import useSendEvent from "@/shared/hooks/useSendEvent"

import { EMAIL_ALREADY_BEEN_USED, LIMIT_REACHED } from "@/utils/errorCodes"

import {
  useUpdateEmailMutation,
  useVerifyEmailMutation,
  useUserProfileQuery,
} from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const UpdateEmail = () => {
  const { t } = useTranslation("modals")

  const [isSecondStep, setIsSecondStep] = useState(false)

  const [oldEmailInput, setOldEmailInput] = useState("")
  const [newEmailInput, setNewEmailInput] = useState("")

  const scale = useAppSelector((state) => state.scale.value)

  const openSecondStep = () => setIsSecondStep(true)
  const closeSecondStep = () => setIsSecondStep(false)

  return (
    <DialogContent
      className={cn(
        "mobile:w-[370px] sm:w-[370px]",
        scale && "3xl:w-[24.088vw]"
      )}
      onCloseAutoFocus={(event) => event.preventDefault()}
    >
      {isSecondStep && (
        <button
          className={cn(
            "typography-btn-big flex items-center gap-2 hover:text-gray-3 w-fit",
            scale && "typography-btn-big_large 3xl:gap-[0.521vw]"
          )}
          onClick={closeSecondStep}
        >
          <MoveLeft
            className={cn(
              "w-3.5 h-3.5",
              scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
            )}
          />
          <span className="text-left">{t("change-email.back-button")}</span>
        </button>
      )}
      <DialogHeader>
        <DialogTitle>{t("change-email.heading")}</DialogTitle>
        <span
          className={cn(
            "flex items-center typography-text-0",
            scale && "typography-text-0_large"
          )}
        >
          {isSecondStep ? "2" : "1"}/2
        </span>
      </DialogHeader>

      {!isSecondStep ? (
        <NewEmailForm
          openSecondStep={openSecondStep}
          oldEmailValue={oldEmailInput}
          newEmailValue={newEmailInput}
          setOldEmailValue={setOldEmailInput}
          setNewEmailValue={setNewEmailInput}
        />
      ) : (
        <CodeForm sentTo={newEmailInput} />
      )}
    </DialogContent>
  )
}

export default UpdateEmail

const NewEmailForm = ({
  openSecondStep,
  oldEmailValue,
  newEmailValue,
  setOldEmailValue,
  setNewEmailValue,
}: {
  openSecondStep: () => void
  oldEmailValue: string
  newEmailValue: string
  setOldEmailValue: Dispatch<SetStateAction<string>>
  setNewEmailValue: Dispatch<SetStateAction<string>>
}) => {
  const { t } = useTranslation("modals")
  const { t: tSchema } = useTranslation("schema")
  const { t: tErrorResponses } = useTranslation("reqResponses")

  const { sendEvent } = useSendEvent()

  const scale = useAppSelector((state) => state.scale.value)

  const { data: userProfileData } = useUserProfileQuery()
  const [updateEmail, { isLoading, error }] = useUpdateEmailMutation()

  const { email } = userProfileData!

  const formSchema = z.object({
    oldEmail: z
      .string()
      .min(1, {
        message: tSchema("required"),
      })
      .email(tSchema("email-incorrect-format"))
      .refine((val) => val === email, {
        message: tSchema("email-incorrect-old"),
      }),
    newEmail: z
      .string()
      .min(1, { message: tSchema("required") })
      .email(tSchema("email-incorrect-format")),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldEmail: oldEmailValue ? oldEmailValue : "",
      newEmail: newEmailValue ? newEmailValue : "",
    },
  })

  const onSubmit = async ({
    newEmail,
    oldEmail,
  }: z.infer<typeof formSchema>) => {
    try {
      sendEvent({ name: "email_update" })

      await updateEmail({ email: newEmail }).unwrap()
      setOldEmailValue(oldEmail)
      setNewEmailValue(newEmail)
      openSecondStep()
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-[18px]", scale && "3xl:gap-[1.172vw]")}
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

        {error && (
          <ResponseErrorText>
            {
              /* @ts-expect-error No-Error-Types */
              error.errorCode === LIMIT_REACHED
                ? tErrorResponses("email_limit_reached")
                : /* @ts-expect-error No-Error-Types */
                error.errorCode === EMAIL_ALREADY_BEEN_USED
                ? tErrorResponses("email_already_taken")
                : tErrorResponses("server-error")
            }
          </ResponseErrorText>
        )}

        <div
          className={cn(
            "flex gap-2 items-center",
            scale && "3xl:gap-[0.521vw]"
          )}
        >
          <Button type="submit" className="w-fit" isLoading={isLoading}>
            {t("change-email.button")}
          </Button>
        </div>
      </form>
    </Form>
  )
}

const CodeForm = ({ sentTo }: { sentTo: string }) => {
  const { t } = useTranslation("modals")
  const { t: tSchema } = useTranslation("schema")

  const scale = useAppSelector((state) => state.scale.value)

  const [verifyEmail, { isLoading, isSuccess, isError }] =
    useVerifyEmailMutation()

  const codeFormSchema = z.object({
    code: z
      .string()
      .min(1, {
        message: tSchema("required"),
      })
      .regex(new RegExp("^[0-9]+$", "g"), { message: tSchema("digits-only") }),
  })

  const form = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: { code: "" },
  })

  const onSubmit = async ({ code }: z.infer<typeof codeFormSchema>) => {
    try {
      await verifyEmail({ code: parseInt(code) }).unwrap()
    } catch (err) {
      console.warn(err)
    }
  }

  useEffect(() => {
    if (isError)
      form.setError(
        "code",
        { message: t("change-email.incorrect-code") },
        { shouldFocus: true }
      )
  }, [isError, form])

  return (
    <>
      <Text0>
        {t("change-email.description")}{" "}
        <span className="font-medium text-black dark:text-gray-5">
          {sentTo}
        </span>
      </Text0>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "flex flex-col gap-[18px]",
            scale && "3xl:gap-[1.172vw]"
          )}
        >
          <FormField
            name="code"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-3 dark:text-gray-4 group-focus-within:text-gray-1 dark:group-focus-within:text-gray-5">
                  {t("change-email.code-label")}
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      "text-sm aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error",
                      scale && "3xl:text-[0.911vw]/[1.302vw]"
                    )}
                    placeholder={t("change-email.code-placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isSuccess && (
            <ResponseSuccessText>
              {t("change-email.request-success")}
            </ResponseSuccessText>
          )}

          {isSuccess ? (
            <DialogClose asChild>
              <Button className={cn("w-fit mt-2", scale && "3xl:mt-[0.521vw]")}>
                {t("change-email.close-dialog")}
              </Button>
            </DialogClose>
          ) : (
            <Button
              className={cn("w-fit mt-2", scale && "3xl:mt-[0.521vw]")}
              type="submit"
              isLoading={isLoading}
              appearence={"outlined"}
            >
              {t("change-email.confirm-button")}
            </Button>
          )}
        </form>
      </Form>
    </>
  )
}
