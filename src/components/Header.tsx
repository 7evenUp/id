import { useEffect, useState } from "react"

const Header = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }, [])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="flex justify-between items-center mb-10">
      <a className="typography-btn-big dark:text-gray-5" href="#">
        Назад к сайту
      </a>
      <div className="flex items-center gap-3">
        <span>изменить язык</span>
        <button onClick={toggleTheme}>изменить тему</button>
      </div>
    </header>
  )
}

export default Header
