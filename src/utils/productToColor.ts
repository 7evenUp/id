import { TabsValuesType } from "@/redux/tabs/slice"

// Возвращает tailwindCSS цвет, который отвечает за соответствующий продукт
export const productToColor: Record<TabsValuesType, string> = {
  "research": "res-bot-blue",
  prime: "prime-pink",
  tools: "tools-green",
  calendar: "calendar-red",
  inventory: "university-velvet",
  academy: "academy-gold",
}
