export interface Promocode {
  code: string
  discountAmount: number
  discountKind: { id: "MONEY" | "PERCENT"; label: "Money" | "%" }
  expirationDate: string
  invalidForSubscriptions: number[]
  invalidForUsers: {}
  isActive: boolean
  isReusable: boolean
  usageLimit: number
  validForSubscriptions: number[]
  validForUsers: {}
}
