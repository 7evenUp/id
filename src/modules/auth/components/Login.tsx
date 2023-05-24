import { useState } from "react"
import { HiOutlineArrowNarrowLeft } from "react-icons/hi"

import { ReactComponent as Web3Logo } from "@/assets/icons/utility/Web3_logo.svg"
import { ReactComponent as MailLogo } from "@/assets/icons/utility/Mail_logo.svg"

import AuthButton from "./AuthButton"
import ActionButton from "./ActionButton"
import { AuthInput, AuthLabel } from "./AuthInput"

import { useLoginMutation } from "@/redux/api/core"

const Login = () => {
  const [isMailMode, setIsMailMode] = useState(false)
  const [email, setEmail] = useState("")

  const [trigger, { isLoading, isSuccess, error }] = useLoginMutation()

  const onSubmit = async () => {
    trigger({ email, redirect_url: "https://crypton.xyz/profile" })
  }

  if (isMailMode)
    return (
      <>
        <button
          className="typography-btn-big flex items-center gap-2 hover:text-gray-3 mb-6 w-fit"
          onClick={() => setIsMailMode(false)}
        >
          <HiOutlineArrowNarrowLeft />
          <span className="text-left">Другой метод авторизации</span>
        </button>
        <div className="flex flex-col gap-3">
          <div className="group flex flex-col gap-1">
            <AuthLabel htmlFor="email">Почта</AuthLabel>
            <AuthInput
              id="email"
              type="email"
              placeholder="Введите вашу почту"
              value={email}
              onChange={(evt) => setEmail(evt.currentTarget.value)}
            />
          </div>
          <ActionButton onClick={onSubmit} isLoading={isLoading}>
            Войти
          </ActionButton>
          {isSuccess && (
            <span className="text-success text-xs font-medium tracking-wide">
              Ссылка для входа успешно отправлена вам на почту
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

export default Login
