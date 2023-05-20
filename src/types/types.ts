export interface User {
  id: number
  firstName: string
  lastName: string
  username: string
  wallet: string
  telegramId: number
  discordUsername: string
  email: string
  avatars: string[]
  balance: number
  capital: number
  isBanned: boolean
  isDarkTheme: boolean
  isPaid: boolean
  knowledge: string
  languageCode: string
  referralInfo: ReferralInfo
  subscriptionInfo: SubscriptionInfo
}

export interface Transaction {
  description: string
  date: string
  price: string
  status: "в процессе" | "успешно" | "отклонено"
  id: string
}

export interface SubscriptionInfo {
  currentBalance: number
  remainingDays: number | null
  status: string | null
  subscriptionType: string | null
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
