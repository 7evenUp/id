export interface Subscription {
  id: number
  createdDatetime: string
  duration: {
    id: number
    label: string
  }
  name: string
  individualPrice?: number | null
  price: number
  isActive: boolean
  isPromotionalModeActive: boolean
  kindId: 1 | 2 // 1 - Prime | 2 - Calendar
  baseDiscount: number | null
  baseDiscountAmount: number | null
  benefits: SubscriptionBenefit[]
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

export interface SubscriptionBenefit {
  file: null | string
  id: number
  remainingCount: number | null
  translations: {
    ru: {
      name: string
      description: string | null
    }
  }
}
