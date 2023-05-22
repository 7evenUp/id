import { User } from "@/types/user"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      // headers.set(
      //   "authorization",
      //   `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
      // )
    },
  }),
  tagTypes: ["UserProfile"],
  endpoints: (build) => ({
    userProfile: build.query<User, void>({
      query: () => ({
        url: "users/profile",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["UserProfile"],
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
    updateNickname: build.mutation<User, Pick<User, "id" | "username">>({
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
      Pick<User, "discordUsername">
    >({
      query: (body) => ({
        url: `users/change-discord/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    // updateDiscord: build.mutation<
    //   User,
    //   Pick<User, "id" | "username" | "discordUsername">
    // >({
    //   query: ({ id, ...patch }) => ({
    //     url: `users/${id}/`,
    //     method: "PATCH",
    //     body: patch,
    //   }),
    //   invalidatesTags: ["UserProfile"],
    // }),
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
  useLoginMutation,
  useRegisterMutation,
  useUpdateNicknameMutation,
  useUpdateEmailMutation,
  useUpdateWalletMutation,
  useUpdateDiscordMutation,
  useUpdateTelegramMutation,
} = api
