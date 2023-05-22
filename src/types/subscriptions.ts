export interface SubscriptionsResponse {
  count: number
  pageCount: number
  next: string
  previous: string
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
  price: number
  isActive: boolean
  kind: number
  baseDiscount: number
}