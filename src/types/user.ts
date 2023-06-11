export interface User {
  avatars: Avatar[]
  balance: number
  capital: number
  discordUsername: string
  email: string
  id: number
  isBanned: boolean
  isDarkTheme: boolean
  isPaid: boolean
  knowledge: string
  languageCode: string
  profileUsername: string
  referralInfo: ReferralInfo
  subscriptionInfo: SubscriptionInfo
  telegramUsername: string
  telegramId: number
  username: string
  wallet: string | null
}

export interface Avatar {
  createdDatetime: string
  file: string
  id: number
  isActive: boolean
  order: number
  user: number
}

export interface SubscriptionInfo {
  currentBalance: number
  remainingDays: number | null
  status: "FROZEN" | null
  subscriptionType: "Prime" | null
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
