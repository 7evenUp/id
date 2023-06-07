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
      providesTags: ["TxHistory"]
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
    }),
    updateDiscord: build.mutation<User, Pick<User, "discordUsername">>({
      query: (body) => ({
        url: "users/change-discord/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updateTelegram: build.mutation<User, Pick<User, "telegramId">>({
      query: (body) => ({
        url: "users/change-telegram/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
  overrideExisting: false,
})

export const {
  useLazyUserProfileQuery,
  useUserProfileQuery,
  useTransactionHistoryQuery,
  useUpdateNicknameMutation,
  useUpdateEmailMutation,
  useUpdateWalletMutation,
  useUpdateDiscordMutation,
  useUpdateTelegramMutation,
} = profileApi
