import { User } from "@/types/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://union-api.crypton.xyz/api/v1/",
    prepareHeaders: (headers) => {
      headers.set(
        "authorization",
        `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
      )
    },
    // credentials: 'include'
  }),
  tagTypes: ["UserProfile"],
  endpoints: (build) => ({
    userProfile: build.query<User, void>({
      query: () => ({
        url: "users/profile",
        method: "GET",
      }),
      providesTags: ["UserProfile"],
    }),
    updateNickname: build.mutation<User, Pick<User, "id" | "username">>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}/`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updateEmail: build.mutation<User, Pick<User, "id" | "username" | "email">>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}/`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updateWallet: build.mutation<
      User,
      Pick<User, "id" | "username" | "wallet">
    >({
      query: ({ id, ...patch }) => ({
        url: `users/${id}/`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updateDiscord: build.mutation<
      User,
      Pick<User, "id" | "username" | "discordUsername">
    >({
      query: ({ id, ...patch }) => ({
        url: `users/${id}/`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updateTelegram: build.mutation<
      User,
      Pick<User, "id" | "username" | "telegramId">
    >({
      query: ({ id, ...patch }) => ({
        url: `users/${id}/`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
})

export const {
  useLazyUserProfileQuery,
  useUserProfileQuery,
  useUpdateNicknameMutation,
  useUpdateEmailMutation,
  useUpdateWalletMutation,
  useUpdateDiscordMutation,
  useUpdateTelegramMutation,
} = api
