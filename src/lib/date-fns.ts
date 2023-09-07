import { format } from "date-fns"
import { ru, enUS } from "date-fns/locale"

export const formatDate = (
  date: string,
  locale: "ru" | "en",
  isFull?: boolean
) => {
  return format(new Date(date), isFull ? "PPpp" : "PP", {
    locale: locale === "ru" ? ru : enUS,
  })
}
