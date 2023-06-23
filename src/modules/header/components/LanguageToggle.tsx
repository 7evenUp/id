import { useState } from "react"
import * as Switch from "@radix-ui/react-switch"
import { useTranslation } from "react-i18next"

const LanguageToggle = () => {
  const [language, setLanguage] = useState<"ru" | "en">("ru")
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    setLanguage(language === "ru" ? "en" : "ru")
    i18n.changeLanguage(language === "ru" ? "en" : "ru")
  }

  return (
    <Switch.Root
      checked={language === "en" ? true : false}
      onCheckedChange={toggleLanguage}
      className="group w-[40px] h-[18px] 2xl:w-[2.6vw] 2xl:h-[1.17vw] bg-transparent rounded-full relative border border-gray-1 dark:border-gray-5 outline-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <Switch.Thumb className="absolute left-0 top-[2px] 2xl:top-[0.13vw] block w-3 h-3 2xl:w-[0.78vw] 2xl:h-[0.78vw] bg-gray-1 dark:bg-gray-5 rounded-full transition-transform duration-100 will-change-transform data-[state=unchecked]:translate-x-[2px] 2xl:data-[state=unchecked]:translate-x-[0.13vw] data-[state=checked]:translate-x-[24px] 2xl:data-[state=checked]:translate-x-[1.56vw]" />
      <span className="absolute top-[2px] 2xl:top-[0.13vw] right-[3px] 2xl:right-[0.195vw] scale-100 group-data-[state=checked]:scale-0 will-change-transform transition-transform text-xs 2xl:text-[0.781vw] leading-none text-gray-1 dark:text-gray-5">
        RU
      </span>
      <span className="absolute top-[2px] 2xl:top-[0.13vw] left-[3px] 2xl:left-[0.195vw] scale-0 group-data-[state=checked]:scale-100 will-change-transform transition-transform text-xs 2xl:text-[0.781vw] leading-none text-gray-1 dark:text-gray-5">
        EN
      </span>
    </Switch.Root>
  )
}

export default LanguageToggle
