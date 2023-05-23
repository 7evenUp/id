import { useEffect, useState } from "react"
import * as Switch from "@radix-ui/react-switch"

import { ReactComponent as SunIcon } from "@/assets/icons/theme/Sun.svg"
import { ReactComponent as MoonIcon } from "@/assets/icons/theme/Moon.svg"

const ThemeToggle = () => {
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
    <Switch.Root
      checked={theme === "dark" ? true : false}
      onCheckedChange={toggleTheme}
      className="group w-[36px] h-[18px] bg-transparent rounded-full relative border border-gray-1 dark:border-gray-5 data-[state=checked]:bg-black outline-none cursor-pointer"
    >
      <Switch.Thumb className="absolute left-0 top-[2px] block w-3 h-3 bg-gray-1 dark:bg-gray-5 rounded-full transition-transform duration-100 will-change-transform data-[state=unchecked]:translate-x-[2px] data-[state=checked]:translate-x-[20px]" />
      <SunIcon className="w-3 h-3 absolute top-[2px] right-[3px] rotate-0 scale-100 group-data-[state=checked]:scale-0 group-data-[state=checked]:rotate-180 will-change-transform transition-transform" />
      <MoonIcon className="w-3 h-3 absolute top-[2px] left-[3px] -rotate-180 scale-0 group-data-[state=checked]:scale-100 group-data-[state=checked]:rotate-0 will-change-transform transition-transform" />
    </Switch.Root>
  )
}

export default ThemeToggle
