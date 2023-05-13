import { useState } from "react"
import * as Switch from "@radix-ui/react-switch"

const LanguageToggle = () => {
  const [language, setLanguage] = useState<"ru" | "en">("ru")

  const toggleLanguage = () => {
    setLanguage(language === "ru" ? "en" : "ru")
  }

  return (
    <Switch.Root
      checked={language === "ru" ? true : false}
      onCheckedChange={toggleLanguage}
      className="group w-[40px] h-[18px] bg-transparent rounded-full relative border border-gray-1 dark:border-gray-5 outline-none cursor-default"
    >
      <Switch.Thumb className="absolute left-0 top-[2px] block w-3 h-3 bg-gray-1 dark:bg-gray-5 rounded-full transition-transform duration-100 will-change-transform data-[state=unchecked]:translate-x-[2px] data-[state=checked]:translate-x-[24px]" />
      <span className="absolute top-[2px] right-[3px] scale-100 group-data-[state=checked]:scale-0 will-change-transform transition-transform text-xs leading-none text-gray-1 dark:text-gray-5">
        RU
      </span>
      <span className="absolute top-[2px] left-[3px] scale-0 group-data-[state=checked]:scale-100 will-change-transform transition-transform text-xs leading-none text text-gray-1 dark:text-gray-5">
        EN
      </span>
    </Switch.Root>
  )
}

export default LanguageToggle
