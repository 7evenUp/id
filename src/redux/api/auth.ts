import { api } from "./core"

interface WalletReqParams {
  address: string
  signature: string
  message: string
  email?: string
}

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    authByWallet: build.mutation<void, WalletReqParams>({
      query: (body) => ({
        url: "users/authenticate-by-wallet/",
        method: "POST",
        body,
      })
    }),
    registerByWallet: build.mutation<void, WalletReqParams>({
      query: (body) => ({
        url: "users/register-web-wallet/",
        method: "POST",
        body
      }),
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
      }),
    }),
    login: build.mutation<void, { email: string; redirect_url: string }>({
      query: ({ email, redirect_url }) => ({
        url: "users/login/",
        method: "POST",
        body: { email, redirect_url },
      }),
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
      }),
    }),
    register: build.mutation<void, { email: string; username: string }>({
      query: ({ email, username }) => ({
        url: "users/register-web/",
        method: "POST",
        body: { email, username },
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
  useRegisterByWalletMutation
} = authApi
