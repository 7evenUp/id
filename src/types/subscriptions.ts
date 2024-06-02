export interface Subscription {
  id: number
  createdDatetime: string
  duration: {
    id: number
    label: string
  }
  name: string
  individualPrice: number | null
  price: number
  isActive: boolean
  kindId: 1 | 2 // 1 - Prime | 2 - Calendar
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
  referralDiscountAmount: number | null
  referralDiscountKind: "MONEY" | "PERCENT" | null
  subReferralDiscounts: Array<{
    subscriptionId: number
    discountAmount: number
    referralDiscount: {
      discountKind: "PERCENT" | "MONEY"
    }
  }>
}
