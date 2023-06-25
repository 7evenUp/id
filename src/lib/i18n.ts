import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import { store } from "@/redux/store"

import enTranslate from "@/assets/locales/en/translation.json"
import ruTranslate from "@/assets/locales/ru/translation.json"

import enProfile from "@/assets/locales/en/profile.json"
import ruProfile from "@/assets/locales/ru/profile.json"

import enModals from "@/assets/locales/en/modals.json"
import ruModals from "@/assets/locales/ru/modals.json"

import enProducts from "@/assets/locales/en/products.json"
import ruProducts from "@/assets/locales/ru/products.json"

import enAuth from "@/assets/locales/en/auth.json"
import ruAuth from "@/assets/locales/ru/auth.json"

import enSchema from "@/assets/locales/en/schema.json"
import ruSchema from "@/assets/locales/ru/schema.json"

import enReqResponses from "@/assets/locales/en/reqResponses.json"
import ruReqResponses from "@/assets/locales/ru/reqResponses.json"

export const resources = {
  en: {
    translation: { ...enTranslate },
    profile: { ...enProfile },
    modals: { ...enModals },
    products: { ...enProducts },
    auth: { ...enAuth },
    schema: { ...enSchema },
    reqResponses: { ...enReqResponses },
  },
  ru: {
    translation: { ...ruTranslate },
    profile: { ...ruProfile },
    modals: { ...ruModals },
    products: { ...ruProducts },
    auth: { ...ruAuth },
    schema: { ...ruSchema },
    reqResponses: { ...ruReqResponses },
  },
} as const

store.subscribe(() => {
  i18n.use(initReactI18next).init({
    lng: store.getState().language.value,
    resources,
    ns: [
      "translation",
      "profile",
      "modals",
      "products",
      "auth",
      "schema",
      "reqResponses",
    ],
    fallbackLng: "ru",
  })
})

export default i18n
