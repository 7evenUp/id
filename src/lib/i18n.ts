import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import enTranslate from "@/assets/locales/en/translation.json"
import ruTranslate from "@/assets/locales/ru/translation.json"

import enProfile from "@/assets/locales/en/profile.json"
import ruProfile from "@/assets/locales/ru/profile.json"

import enModals from "@/assets/locales/en/modals.json"
import ruModals from "@/assets/locales/ru/modals.json"

export const resources = {
  en: {
    translation: { ...enTranslate },
    profile: { ...enProfile },
    modals: { ...enModals }
  },
  ru: {
    translation: { ...ruTranslate },
    profile: { ...ruProfile },
    modals: { ...ruModals }
  }
} as const

i18n.use(initReactI18next).init({
  lng: "ru",
  resources,
  ns: ["translation", "profile", "modals"],
  fallbackLng: "ru",
})

export default i18n
