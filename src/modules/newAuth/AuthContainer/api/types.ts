export interface WalletReqParams {
  address: string
  signature: string
  message: string
  email?: string
  profile_username?: string
  referral_code?: string
  redirect_url?: string
  advertising_consent: boolean
  use_verification_code: boolean
}

export interface MailRegParams {
  email: string
  profile_username: string
  referral_code?: string
  redirect_url: string
  advertising_consent: boolean
  use_verification_code: boolean
}

export interface LoginResponse {
  email: string | null
  tgUsername: string | null
  redirectUrl: string | null
  tgLoginAvailable: boolean
  oauth: "GOOGLE" | null
  oauthRedirectTo: string | null
  loginBlockedTill: number | null
}

export interface LoginRequest {
  email?: string
  redirect_url: string
  oauth?: "GOOGLE"
  use_verification_code?: boolean
}
