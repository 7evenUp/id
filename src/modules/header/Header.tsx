import { ReactComponent as MoveLeft } from "@/assets/icons/move-left.svg"

import ThemeToggle from "./components/ThemeToggle"
import LanguageToggle from "./components/LanguageToggle"
import AvatarMobile from "./components/AvatarMobile"

const Header = () => {
  return (
    <header className="flex justify-end items-center mb-10">
      {/* <a
        className="typography-btn-big dark:text-gray-5 flex items-center gap-2 hover:text-gray-3 dark:hover:text-gray-3"
        href="#"
      >
        <MoveLeft className="w-3.5 h-3.5" />
        Назад к сайту
      </a> */}

      <div className="hidden sm:flex items-center gap-3">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <div className="sm:hidden flex gap-6">
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <AvatarMobile />
      </div>
    </header>
  )
}

export default Header
