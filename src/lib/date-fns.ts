import { format } from "date-fns"
import { ru, enUS } from "date-fns/locale"

export const formatDate = (date: string, locale: "ru" | "en") => {
  return format(new Date(date), "PP", { locale: locale === "ru" ? ru : enUS })
}
