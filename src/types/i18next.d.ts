import "i18next"
// import all namespaces (for the default language, only)
import enTranslate from "@/assets/locales/en/translation.json"
import enProfile from "@/assets/locales/en/profile.json"
import enModals from "@/assets/locales/en/modals.json"
import enProducts from "@/assets/locales/en/products.json"
import enAuth from "@/assets/locales/en/auth.json"
import enSchema from "@/assets/locales/en/schema.json"

declare module "i18next" {
  interface CustomTypeOptions {
    // custom resources type
    resources: {
      translate: typeof enTranslate
      profile: typeof enProfile
      modals: typeof enModals
      products: typeof enProducts
      auth: typeof enAuth
      schema: typeof enSchema
    }
  }
}
