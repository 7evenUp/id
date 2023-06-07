export interface Transaction {
  description: string | null
  totalAmount: number | null
  status: "COMPLETED" | "PENDING" | null
  txId: string | null
  createdDatetime: string
}
