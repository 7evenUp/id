import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Form, FormControl, FormField, FormItem, FormMessage } from "../Form"
import Button from "../Button"
import Input from "../Input"
import { useLoginMutation } from "@/redux/api/auth"

const EmailLogin = ({
  emailInput,
  setEmailInput,
}: {
  emailInput: string
  setEmailInput: Dispatch<SetStateAction<string>>
}) => {
  const [emailDomain, setEmailDomain] = useState("")

  const [login, { isLoading: isLoginLoading, isSuccess, error }] =
    useLoginMutation({
      fixedCacheKey: "login-by-mail",
    })

  const formSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: "The field is required",
      })
      .email("Invalid mail format"),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: emailInput || "",
    },
  })

  const onSubmit = async ({ email }: z.infer<typeof formSchema>) => {
    if (isLoginLoading) return

    const cleanEmail = email.toLowerCase().trim()

    setEmailInput(cleanEmail)
    setEmailDomain(cleanEmail.split("@")[1])

    const redirect_url = window.location.origin

    login({
      email: cleanEmail,
      redirect_url,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="id_crypton_form">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button style={{ marginTop: 24 }} isLoading={isLoginLoading}>
          Continue
        </Button>
      </form>
    </Form>
  )
}

export default EmailLogin
