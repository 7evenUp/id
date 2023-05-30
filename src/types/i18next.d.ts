import "i18next"
// import all namespaces (for the default language, only)
import enTranslate from "@/assets/locales/en/translation.json"
import enProfile from "@/assets/locales/en/profile.json"

declare module "i18next" {
  interface CustomTypeOptions {
    // custom resources type
    resources: {
      translate: typeof enTranslate
      profile: typeof enProfile
    }
  }
}
