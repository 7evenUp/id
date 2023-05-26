import { useState } from "react"

import ResearchAuthImage from "@/assets/images/auth_research.png"

import Login from "./components/Login"
import Register from "./components/Register"
import ToggleMode from "./components/ToggleMode"

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true)

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode)
  }

  const headingText = isLoginMode
    ? "Вход в Личный Кабинет"
    : "Добро пожаловать в Личный Кабинет Crypton!"

  return (
    <div className="flex border border-gray-1 rounded-xl w-full mobile:w-auto ms-auto me-auto">
      <div className="flex flex-col justify-between gap-6 py-8 px-9 bg-white rounded-xl md:rounded-none md:rounded-l-xl text-gray-1 w-full mobile:w-[370px] min-h-[340px]">
        <div className="flex flex-col">
          <h2 className="text-lg font-medium text-black mb-10 max-w-[260px]">
            {headingText}
          </h2>
          {isLoginMode ? <Login /> : <Register />}
        </div>

        <ToggleMode isLoginMode={isLoginMode} toggleMode={toggleMode} />
      </div>
      <div className="hidden md:block w-[350px] border-l border-gray-1">
        <img
          src={ResearchAuthImage}
          alt="research auth intro"
          className="w-[350px] min-h-[400px] h-full object-cover rounded-r-xl"
        />
      </div>
    </div>
  )
}

export default Auth
