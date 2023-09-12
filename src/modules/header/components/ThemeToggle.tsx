import { useEffect } from "react"
import * as Switch from "@radix-ui/react-switch"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { changeTheme } from "@/redux/theme/slice"

import SunIcon from "@/assets/icons/theme/Sun.svg"
import MoonIcon from "@/assets/icons/theme/Moon.svg"

const ThemeToggle = () => {
  const theme = useAppSelector((state) => state.theme.value)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (theme !== null) return

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      dispatch(changeTheme("dark"))
    } else {
      dispatch(changeTheme("light"))
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
    dispatch(changeTheme(theme === "dark" ? "light" : "dark"))
  }

  return (
    <Switch.Root
      checked={theme === "dark" ? true : false}
      onCheckedChange={toggleTheme}
      className="group w-[36px] h-[18px] 3xl:w-[2.34vw] 3xl:h-[1.17vw] bg-transparent rounded-full relative border border-gray-1 dark:border-gray-5 data-[state=checked]:bg-black outline-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <Switch.Thumb className="absolute left-0 top-[2px] 3xl:top-[0.13vw] block w-3 h-3 3xl:w-[0.78vw] 3xl:h-[0.78vw] bg-gray-1 dark:bg-gray-5 rounded-full transition-transform duration-100 will-change-transform data-[state=unchecked]:translate-x-[2px] 3xl:data-[state=unchecked]:translate-x-[0.13vw] data-[state=checked]:translate-x-[20px] 3xl:data-[state=checked]:translate-x-[1.3vw]" />
      <img
        src={SunIcon}
        className="w-3 h-3 3xl:w-[0.78vw] 3xl:h-[0.78vw] absolute top-[2px] 3xl:top-[0.13vw] right-[3px] 3xl:right-[0.195vw] rotate-0 scale-100 group-data-[state=checked]:scale-0 group-data-[state=checked]:rotate-180 will-change-transform transition-transform"
      />
      <img
        src={MoonIcon}
        className="w-3 h-3 3xl:w-[0.78vw] 3xl:h-[0.78vw] absolute top-[3px] 3xl:top-[0.195vw] left-[3px] 3xl:left-[0.195vw] -rotate-180 scale-0 group-data-[state=checked]:scale-100 group-data-[state=checked]:rotate-0 will-change-transform transition-transform"
      />
    </Switch.Root>
  )
}

export default ThemeToggle
