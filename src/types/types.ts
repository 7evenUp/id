export interface Transaction {
  description: string
  date: string
  price: string
  status: "в процессе" | "успешно" | "отклонено"
  id: string
}
