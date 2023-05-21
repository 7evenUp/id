import { useState } from "react"

import ResearchAuthImage from "@/assets/images/auth_research.png"

import Login from "./components/Login"
import Register from "./components/Register"

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true)

  const toggleLoginMode = () => {
    setIsLoginMode(!isLoginMode)
  }

  const headingText = isLoginMode
    ? "Вход в Личный Кабинет"
    : "Добро пожаловать в Личный Кабинет Crypton!"

  return (
    <div className="flex border border-gray-1 rounded-xl ms-auto me-auto">
      <div className="flex flex-col justify-between gap-6 py-8 px-9 bg-white rounded-l-xl text-gray-1 w-[370px]">
        <div className="flex flex-col">
          <h2 className="text-lg font-medium text-black mb-10 max-w-[260px]">
            {headingText}
          </h2>

          {isLoginMode ? <Login /> : <Register />}
        </div>

        {isLoginMode ? (
          <button
            className="typography-text-0 font-medium w-fit text-res-bot-blue hover:underline underline-offset-2"
            onClick={toggleLoginMode}
          >
            Создать аккаунт
          </button>
        ) : (
          <div className="flex items-center gap-1 typography-text-0">
            <span className="tracking-wider">Уже есть аккаунт?</span>
            <button
              className="typography-text-0 font-medium w-fit text-res-bot-blue hover:underline underline-offset-2"
              onClick={toggleLoginMode}
            >
              Войти
            </button>
          </div>
        )}
      </div>
      <div className="w-[350px] border-l border-gray-1">
        <img
          src={ResearchAuthImage}
          alt="research auth intro"
          className="w-[350px] min-h-[400px] h-full object-cover rounded-br-xl"
        />
      </div>
    </div>
  )
}

export default Auth
