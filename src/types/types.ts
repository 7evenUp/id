export interface User {
  id: number
  firstName: string
  lastName: string
  username: string
  wallet: string
  telegramId: number
  discordUsername: string
  email: string
  file?: string
  referralInfo: ReferralInfo
}

export interface Transaction {
  description: string
  date: string
  price: string
  status: "в процессе" | "успешно" | "отклонено"
  id: string
}

export interface ReferralInfo {
  allTimePaidReferralCount: number
  allTimeReferralCount: number
  currentMonthPaidReferralCount: number
  currentMonthReferralCount: number
  refBalance: number
  refCashBack: number
  refCode: string
  refLink: string
  refProgramLevel: number
  toNextLevelRemained: number
  totalProfit: number
  totalWithdrawAmount: number
}
