import { Transaction } from "@/types/types"
import { api } from "./core"

import { User } from "@/types/user"

const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    userProfile: build.query<User, void>({
      query: () => ({
        url: "users/profile",
        method: "GET",
      }),
      providesTags: ["UserProfile"],
    }),
    transactionHistory: build.query<Transaction[], void>({
      query: () => ({
        url: "users/transaction-history/",
        method: "GET",
      }),
      providesTags: ["TxHistory"],
    }),
    freezeSubs: build.mutation<void, void>({
      query: () => ({
        url: "users/freeze-subscription/",
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
      invalidatesTags: ["UserProfile"],
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
      }),
    }),
    updateDiscord: build.mutation<User, Pick<User, "discordUsername">>({
      query: (body) => ({
        url: "users/change-discord/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updateTelegram: build.mutation<User, { telegram: string }>({
      query: (body) => ({
        url: "users/change-telegram/",
        method: "POST",
        body,
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
  }),
  overrideExisting: false,
})

export const {
  useUserProfileQuery,
  useTransactionHistoryQuery,
  useFreezeSubsMutation,
  useDeactivateMutation,
  useUpdateNicknameMutation,
  useUpdateEmailMutation,
  useUpdateWalletMutation,
  useUpdateDiscordMutation,
  useUpdateTelegramMutation,
  useVerifyTelegramMutation,
} = profileApi
