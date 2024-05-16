export interface SharesTxRequestResponse {
  count: number
  next: null | number
  pageCount: number
  previous: null | number
  results: ShareTx[]
}

export interface ShareTx {
  amount: number
  balanceAfter: number
  balanceBefore: number
  comment: string | null
  kind: {
    id: "DEPOSIT" | "WITHDRAW"
    label: string
  }
}
