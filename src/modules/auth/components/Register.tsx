import { useState } from "react"
import { HiOutlineArrowNarrowLeft } from "react-icons/hi"

import { ReactComponent as Web3Logo } from "@/assets/icons/utility/Web3_logo.svg"
import { ReactComponent as MailLogo } from "@/assets/icons/utility/Mail_logo.svg"

import AuthButton from "./AuthButton"
import ActionButton from "./ActionButton"

const Register = () => {
  const [isMailMode, setIsMailMode] = useState(false)

  if (isMailMode)
    return (
      <>
        <button
          className="typography-btn-big flex items-center gap-2 hover:text-gray-3 mb-6 w-fit"
          onClick={() => setIsMailMode(false)}
        >
          <HiOutlineArrowNarrowLeft />
          Другой метод регистрации
        </button>
        <div className="flex flex-col gap-3">
          <div className="group flex flex-col gap-1">
            <label
              htmlFor="email"
              className="group-focus-within:text-res-bot-blue text-sm"
            >
              Почта
            </label>
            <input
              id="email"
              type="email"
              className="bg-transparent border border-gray-1 rounded-md py-2 px-3 outline-none focus:border-res-bot-blue"
              placeholder="Введите вашу почту"
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
          <ActionButton>Зарегистрироваться</ActionButton>
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
