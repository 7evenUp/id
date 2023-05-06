import { HiOutlineArrowNarrowLeft } from "react-icons/hi"

import ThemeToggle from "./ThemeToggle"

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
      <div className="flex items-center gap-3">
        <span>изменить язык</span>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header
