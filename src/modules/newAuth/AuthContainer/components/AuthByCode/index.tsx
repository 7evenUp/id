import React, { useEffect } from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { AxiosError } from "axios"
import { useMutation } from "@tanstack/react-query"

import MailToLinkMap from "../MailToLinkMap"

import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../shared/InputOTP"
import Loader from "../../shared/Loader"

import AuthApi from "../../api"

import "./styles.css"

const MAX_CODE_LENGTH = 4

const AuthByCode = ({
  emailDomain,
  refetchAfterSuccessAuth,
}: {
  emailDomain: string
  refetchAfterSuccessAuth: VoidFunction
}) => {
  const [value, setValue] = React.useState("")

  const {
    mutate: auth,
    isPending,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: ({ code }: { code: string }) => AuthApi.authByCode({ code }),
    onSuccess: () => {
      refetchAfterSuccessAuth()
    },
  })

  useEffect(() => {
    if (isPending) return

    reset()

    if (value.length === MAX_CODE_LENGTH) {
      auth({ code: value })
    }
  }, [value])

  return (
    <div className="id_crypton_code_container">
      {isSuccess ? (
        <p className="id_crypton_message__success">Успешно введённый код</p>
      ) : (
        <>
          <InputOTP
            maxLength={MAX_CODE_LENGTH}
            pattern={REGEXP_ONLY_DIGITS}
            value={value}
            onChange={(value) => !isPending && setValue(value)}
          >
            <InputOTPGroup>
              {[...new Array(MAX_CODE_LENGTH)].map((_, i) => (
                <InputOTPSlot index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {isPending ? (
            <Loader />
          ) : error ? (
            <p className="id_crypton_message__error">
              {error instanceof AxiosError
                ? error.status === 429
                  ? "Замечено много попыток авторизации. Пожалуйста, повторите позже"
                  : error.status === 400 &&
                    error.response?.data.code === "token_not_found"
                  ? "Введённый код неверный"
                  : "На стороне сервера произошла ошибка"
                : "Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже"}
            </p>
          ) : (
            <p className="id_crypton_message">
              Введите код, который пришёл на почту{" "}
              <MailToLinkMap emailDomain={emailDomain} />
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default AuthByCode
