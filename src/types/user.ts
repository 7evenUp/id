export interface User {
  avatars: Avatar[]
  balance: number
  capital: number | null
  discordUsername: string
  email: string
  id: number
  isBanned: boolean
  isDarkTheme: boolean
  isPaid: boolean
  isReferralDiscountAvailable: boolean
  knowledge: string
  languageCode: string
  nutcrackerCount: number
  points: number
  profileUsername: string
  referralInfo: ReferralInfo
  subscriptionInfo: SubscriptionInfo
  telegramUsername: string
  telegramId: number
  wallet: string | null
  waxWallet: string | null
  tonWallet: string | null
  utmData: string | null
  timezone: string
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
  isFreezeAllowed: boolean
  remainingDays: number | null
  status: "ACTIVE" | "FROZEN" | "EXPIRED" | null
  subscriptionActiveTillDate: Date | null
  subscriptionBoughtDaysAgo: number
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
