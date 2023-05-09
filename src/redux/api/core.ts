import { User } from "@/types/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1MTYxOTU3LCJpYXQiOjE2ODM2MjU5NTcsImp0aSI6IjE5ZmU2NjY0MjcxMTRiY2NiODhhMjg2ZTA4ODI0YzIxIiwidXNlcl9pZCI6NH0.39-VO5mxxw4hflQCQpfEaQMBRdyrBNm9MsM6-zDaCKY"

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://union-api.crypton.xyz/api/v1/",
    prepareHeaders: (headers, api) => {
      headers.set("authorization", `Bearer ${accessToken}`)
    },
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
  }),
})

export const {
  useUserProfileQuery,
  useUpdateNicknameMutation,
  useUpdateEmailMutation,
} = api
