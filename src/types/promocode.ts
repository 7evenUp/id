export interface Promocode {
  code: string
  discountAmount: number
  discountKind: { id: "MONEY" | "PERCENT"; label: "Money" | "%" }
  discounts: Array<{
    subscriptionId: number
    discountAmount: number
  }>
  invalidForSubscriptions: number[]
  isReferralCode: boolean
  validForSubscriptions: number[]
}
