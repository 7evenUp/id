import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
  baseQuery: fetchBaseQuery({
    // baseUrl: import.meta.env.VITE_API_BASE_URL,
    baseUrl: "https://union-api.crypton.xyz/api/v1/",
    credentials: "include",
    // prepareHeaders: (headers) => {
    //   headers.set(
    //     "authorization",
    //     `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
    //   )
    // },
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["UserProfile", "TxHistory"],
  endpoints: () => ({}),
})
