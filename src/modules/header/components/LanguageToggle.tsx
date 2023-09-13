import { useEffect } from "react"
import * as Switch from "@radix-ui/react-switch"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { changeLang } from "@/redux/language/slice"

import { cn } from "@/lib/classNames"

const LanguageToggle = () => {
  const scale = useAppSelector((state) => state.scale.value)
  const language = useAppSelector((state) => state.language.value)
  const dispatch = useAppDispatch()

  const { i18n } = useTranslation()

  useEffect(() => {
    if (language !== null) {
      i18n.changeLanguage(language === "ru" ? "ru" : "en")
      return
    }

    const lang = window.navigator.language
    const langFistTwo = lang.substring(0, 2)

    if (langFistTwo !== "ru") {
      dispatch(changeLang("en"))
      i18n.changeLanguage("en")
    } else {
      dispatch(changeLang("ru"))
      i18n.changeLanguage("ru")
    }
  }, [])

  const toggleLanguage = () => {
    dispatch(changeLang(language === "ru" ? "en" : "ru"))
    i18n.changeLanguage(language === "ru" ? "en" : "ru")
  }

  return (
    <Switch.Root
      checked={language === "en" ? true : false}
      onCheckedChange={toggleLanguage}
      className={cn(
        "group w-[40px] h-[18px] bg-transparent rounded-full relative border border-gray-1 dark:border-gray-5 outline-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        scale && "3xl:w-[2.6vw] 3xl:h-[1.17vw]"
      )}
    >
      <Switch.Thumb
        className={cn(
          "absolute left-0 top-[2px] block w-3 h-3 bg-gray-1 dark:bg-gray-5 rounded-full transition-transform duration-100 will-change-transform data-[state=unchecked]:translate-x-[2px] data-[state=checked]:translate-x-[24px]",
          scale &&
            "3xl:top-[0.13vw] 3xl:w-[0.78vw] 3xl:h-[0.78vw] 3xl:data-[state=unchecked]:translate-x-[0.13vw] 3xl:data-[state=checked]:translate-x-[1.56vw]"
        )}
      />
      <span
        className={cn(
          "absolute top-[2px] right-[3px] scale-100 group-data-[state=checked]:scale-0 will-change-transform transition-transform text-xs leading-none text-gray-1 dark:text-gray-5",
          scale && "3xl:top-[0.13vw] 3xl:right-[0.195vw] 3xl:text-[0.781vw]"
        )}
      >
        RU
      </span>
      <span
        className={cn(
          "absolute top-[2px] left-[3px] scale-0 group-data-[state=checked]:scale-100 will-change-transform transition-transform text-xs leading-none text-gray-1 dark:text-gray-5",
          scale && "3xl:top-[0.13vw] 3xl:left-[0.195vw] 3xl:text-[0.781vw]"
        )}
      >
        EN
      </span>
    </Switch.Root>
  )
}

export default LanguageToggle
