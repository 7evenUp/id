import { TabsValuesType } from "@/redux/tabs/slice"

// Возвращает tailwindCSS цвет, который отвечает за соответствующий продукт
export const productToColor: Record<TabsValuesType, string> = {
  "research-bot": "res-bot-blue",
  prime: "prime-pink",
}
