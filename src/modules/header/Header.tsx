import { HiOutlineArrowNarrowLeft } from "react-icons/hi"

import ThemeToggle from "./components/ThemeToggle"
import LanguageToggle from "./components/LanguageToggle"
import AvatarMobile from "./components/AvatarMobile"

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-10">
      <a
        className="typography-btn-big dark:text-gray-5 flex items-center gap-2 hover:text-gray-3 dark:hover:text-gray-3"
        href="#"
      >
        <HiOutlineArrowNarrowLeft />
        Назад к сайту
      </a>

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
