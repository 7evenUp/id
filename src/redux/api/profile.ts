import { api } from "./core"

import { User } from "@/types/user"
import { Transaction } from "@/types/types"
import { Nutcrackers } from "@/types/nutcrackers"

interface VerifyTonPayload {
  address: string
  walletStateInit: string
  stateInit: {
    name: string
    proof: {
      timestamp: string
      signature: string
      payload: string
      domain: { lengthBytes: number; value: string }
    }
  }
}

const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    userProfile: build.query<User, void>({
      query: () => ({
        url: "users/profile/",
        method: "GET",
      }),
      providesTags: ["UserProfile"],
    }),
    transactionHistory: build.query<Transaction[], void>({
      query: () => ({
        url: "users/transaction-history/",
        method: "GET",
      }),
      transformResponse: (response: Transaction[]) => {
        return response.sort(
          (a, b) => +new Date(b.createdDatetime) - +new Date(a.createdDatetime)
        )
      },
      providesTags: ["TxHistory"],
    }),
    nutcrackers: build.query<Nutcrackers, void>({
      query: () => ({
        url: "users/nutcrackers/nutcrackers/",
        method: "GET",
      }),
    }),
    freezeSubs: build.mutation<void, void>({
      query: () => ({
        url: "users/freeze-subscription/",
        method: "GET",
      }),
      invalidatesTags: ["UserProfile"],
    }),
    unfreezeSubs: build.mutation<void, void>({
      query: () => ({
        url: "users/unfreeze-subscription/",
        method: "GET",
      }),
      invalidatesTags: ["UserProfile"],
    }),
    deactivate: build.mutation<void, Pick<User, "id">>({
      query: ({ id }) => ({
        url: `users/${id}/delete/`,
        method: "GET",
      }),
      invalidatesTags: ["UserProfile"],
    }),
    verifyDeactivation: build.mutation<
      void,
      Pick<User, "id"> & { code: number }
    >({
      query: ({ id, code }) => ({
        url: `users/${id}/verify-delete/`,
        method: "POST",
        body: { code },
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updateNickname: build.mutation<User, Pick<User, "id" | "profileUsername">>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}/`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updateEmail: build.mutation<User, Pick<User, "email">>({
      query: (body) => ({
        url: `users/change-email/`,
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
        // @ts-expect-error No-Error-Types
        errorCode: response.data.code,
      }),
    }),
    verifyEmail: build.mutation<User, { code: number }>({
      query: (body) => ({
        url: "users/verify-email/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updateWax: build.mutation<User, { wax_wallet: string }>({
      query: (body) => ({
        url: "users/set-wax-wallet/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserProfile"],
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
        // @ts-expect-error No-Error-Types
        errorCode: response.data.code,
      }),
    }),
    updateTon: build.mutation<User, { address: string }>({
      query: (body) => ({
        url: "users/set-ton-wallet/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserProfile"],
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
        // @ts-expect-error No-Error-Types
        errorCode: response.data.code,
      }),
    }),
    verifyTon: build.mutation<void, VerifyTonPayload>({
      query: (body) => ({
        url: "users/wallets/ton/verify/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserProfile"],
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
        // @ts-expect-error No-Error-Types
        errorCode: response.data.code,
      }),
    }),
    updateWallet: build.mutation<User, Pick<User, "wallet">>({
      query: (body) => ({
        url: "users/change-wallet/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserProfile"],
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
        // @ts-expect-error No-Error-Types
        errorCode: response.data.code,
      }),
    }),
    updateDiscord: build.mutation<User, Pick<User, "discordUsername">>({
      query: (body) => ({
        url: "users/change-discord/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserProfile"],
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
        // @ts-expect-error No-Error-Types
        errorCode: response.data.code,
      }),
    }),
    updateTelegram: build.mutation<User, { telegram: string }>({
      query: (body) => ({
        url: "users/change-telegram/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["LinksAndChannels"],
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
        // @ts-expect-error No-Error-Types
        errorCode: response.data.code,
      }),
    }),
    verifyTelegram: build.mutation<User, { code: number }>({
      query: (body) => ({
        url: "users/verify-telegram/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    changeLanguage: build.mutation<void, { language: "ru" | "en" }>({
      query: (body) => ({
        url: "users/switch-language/",
        method: "POST",
        body,
      }),
    }),
    setAdvertisingConsent: build.mutation<
      void,
      { advertising_consent: boolean }
    >({
      query: (body) => ({
        url: "users/advertising-consent/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
  overrideExisting: false,
})

export const {
  useUserProfileQuery,
  useLazyUserProfileQuery,
  useNutcrackersQuery,
  useTransactionHistoryQuery,
  useFreezeSubsMutation,
  useUnfreezeSubsMutation,
  useDeactivateMutation,
  useVerifyDeactivationMutation,
  useUpdateNicknameMutation,
  useUpdateEmailMutation,
  useVerifyEmailMutation,
  useUpdateWaxMutation,
  useUpdateTonMutation,
  useVerifyTonMutation,
  useUpdateWalletMutation,
  useUpdateDiscordMutation,
  useUpdateTelegramMutation,
  useVerifyTelegramMutation,
  useChangeLanguageMutation,
  useSetAdvertisingConsentMutation,
} = profileApi
