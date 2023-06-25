import { api } from "./core"

export interface WalletReqParams {
  address: string
  signature: string
  message: string
  email?: string
  profile_username?: string
  referral_code?: string
}

export interface MailRegParams {
  email: string
  profile_username: string
  referral_code?: string
}

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    authByWallet: build.mutation<void, WalletReqParams>({
      query: (body) => ({
        url: "users/authenticate-by-wallet/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    registerByWallet: build.mutation<void, WalletReqParams>({
      query: (body) => ({
        url: "users/register-web-wallet/",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
      }),
    }),
    login: build.mutation<void, { email: string; redirect_url: string }>({
      query: (body) => ({
        url: "users/login/",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
      }),
    }),
    register: build.mutation<void, MailRegParams>({
      query: (body) => ({
        url: "users/register-web/",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
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
  useLoginMutation,
  useRegisterMutation,
  useLazyLogoutQuery,
  useAuthByWalletMutation,
  useRegisterByWalletMutation,
} = authApi
