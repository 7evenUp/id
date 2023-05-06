import ThemeToggle from "./ThemeToggle"

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-10">
      <a className="typography-btn-big dark:text-gray-5" href="#">
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
