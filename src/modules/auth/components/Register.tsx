import { useState } from "react"
import { HiOutlineArrowNarrowLeft } from "react-icons/hi"

import { ReactComponent as Web3Logo } from "@/assets/icons/utility/Web3_logo.svg"
import { ReactComponent as MailLogo } from "@/assets/icons/utility/Mail_logo.svg"

import AuthButton from "./AuthButton"
import ActionButton from "./ActionButton"
import { AuthInput, AuthLabel } from "./AuthInput"

import { useRegisterMutation } from "@/redux/api/core"

const Register = () => {
  const [isMailMode, setIsMailMode] = useState(false)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")

  const [register, { isLoading, isSuccess, error }] = useRegisterMutation()

  const onSubmit = async () => {
    register({ email, username })
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
          <div className="group flex flex-col gap-1">
            <AuthLabel htmlFor="username">Имя пользователя</AuthLabel>
            <AuthInput
              id="username"
              type="text"
              placeholder="Введите ваше имя пользователя"
              value={username}
              onChange={(evt) => setUsername(evt.currentTarget.value)}
            />
          </div>
          <p className="text-xs w-full">
            Создавая учетную запись, я соглашаюсь с{" "}
            <a
              href="#"
              className="text-res-bot-blue cursor-pointer hover:underline underline-offset-2 font-medium"
            >
              Политикой конфиденциальности
            </a>
          </p>
          <ActionButton onClick={onSubmit} isLoading={isLoading}>
            Зарегистрироваться
          </ActionButton>
          {isSuccess && (
            <span className="text-success text-xs font-medium tracking-wide">
              Вы успешно зарегистрированны! Перейдите по ссылке, которую мы
              отправили вам на почту
            </span>
          )}
          {error && (
            <span className="text-error text-xs font-medium tracking-wide">
              {/* @ts-expect-error No-Error-Types */}
              {error.message}
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
