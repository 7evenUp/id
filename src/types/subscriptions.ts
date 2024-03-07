export interface SubscriptionsResponse {
  count: number
  pageCount: number
  next: string | null
  previous: string | null
  results: Subscription[]
}

export interface Subscription {
  id: number
  createdDatetime: string
  duration: {
    id: number
    label: string
  }
  name: string
  individualPrice?: number
  price: number
  isActive: boolean
  kind: 1 | 2 // 1 - Prime | 2 - Calendar
  baseDiscount: number | null
  baseDiscountAmount: number | null
}
