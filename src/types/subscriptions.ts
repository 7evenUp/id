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
  benefits: Array<{
    file: null | string
    id: number
    translations: {
      ru: {
        name: string
      }
    }
  }>
  subReferralDiscounts: Array<{
    subscriptionId: number
    discountAmount: number
    referralDiscount: {
      discountKind: "PERCENT" | "MONEY"
    }
  }>
}
