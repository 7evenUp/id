import { api } from "./core"

export interface WalletReqParams {
  address: string
  signature: string
  message: string
  email?: string
  profile_username?: string
  referral_code?: string
  redirect_url?: string
  advertising_consent: boolean
  useVerificationCode: boolean
}

export interface MailRegParams {
  email: string
  profile_username: string
  referral_code?: string
  redirect_url: string
  advertising_consent: boolean
  useVerificationCode: boolean
}

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    authByCode: build.mutation<void, { code: string }>({
      query: ({ code }) => ({
        url: `users/authenticate/?code=${code}`,
        method: "GET",
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        // @ts-expect-error No-Error-Types
        message: response.data?.detail,
      }),
    }),
    authByWallet: build.mutation<void, WalletReqParams>({
      query: (body) => ({
        url: "users/authenticate-by-wallet/",
        method: "POST",
        body,
      }),
    }),
    registerByWallet: build.mutation<void, WalletReqParams>({
      query: (body) => {
        const { useVerificationCode, ...rest } = body
        let url = "users/register-web-wallet/"

        if (useVerificationCode) url += "?use_verification_code=true"

        return {
          url,
          method: "POST",
          body: rest,
        }
      },
      transformErrorResponse: (response) => ({
        status: response.status,
        // @ts-expect-error No-Error-Types
        code: response.data?.code,
      }),
    }),
    login: build.mutation<void, { email: string; redirect_url: string }>({
      query: (body) => ({
        url: "users/login/",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        // @ts-expect-error No-Error-Types
        message: response.data?.detail,
      }),
    }),
    loginMobile: build.mutation<void, { email: string; redirect_url: string }>({
      query: (body) => ({
        url: "users/login/?use_verification_code=true",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        // @ts-expect-error No-Error-Types
        message: response.data?.detail,
      }),
    }),
    register: build.mutation<void, MailRegParams>({
      query: (body) => {
        const { useVerificationCode, ...rest } = body
        let url = "users/register-web/"

        if (useVerificationCode) url += "?use_verification_code=true"

        return {
          url,
          method: "POST",
          body: rest,
        }
      },
      transformErrorResponse: (response) => ({
        status: response.status,
        // @ts-expect-error No-Error-Types
        message: response.data?.detail,
      }),
    }),
    logout: build.query<void, void>({
      query: () => ({
        url: "users/logout/",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useAuthByCodeMutation,
  useLoginMutation,
  useLoginMobileMutation,
  useRegisterMutation,
  useLazyLogoutQuery,
  useAuthByWalletMutation,
  useRegisterByWalletMutation,
} = authApi
