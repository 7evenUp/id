export interface User {
  avatars: Avatar[]
  balance: number
  capital: number | null
  discordUsername: string
  email: string
  id: number
  investFundBalance: number
  investFundClosestBurnings: Array<{ burningDate: string; amount: number }>
  isBanned: boolean
  isDarkTheme: boolean
  isPaid: boolean
  isPrimeInstructionShown: boolean
  isReferralDiscountAvailable: boolean
  knowledge: string
  languageCode: string
  nutcrackerCount: number
  points: number
  profileUsername: string
  promoBoxAvailableOpensNumber: number
  referralInfo: ReferralInfo
  subscriptionInfo: SubscriptionInfo
  subscriptions: ActiveUserSubscription[]
  telegramId: number
  telegramUsername: string
  timezone: string
  tonWallet: string | null
  totalOpenedPromoBox: number
  wallet: string | null
  waxWallet: string | null
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
  subscriptionBoughtDaysAgo: number
  currentBalance: number
  remainingDays: number | null
  status: "ACTIVE" | "FROZEN" | "EXPIRED" | null
  subscriptionType: "Prime" | "Calendar" | null
  subscriptionActiveTillDate: Date | null
  isFreezeAllowed: boolean
}

export interface ActiveUserSubscription {
  fromDatetime: string
  tillDatetime: string
  status: "ACTIVE" | "UPCOMING" | "FROZEN"
  durationDays: number
  kindName: "Prime" | "Calendar"
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
