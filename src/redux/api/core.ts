import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["UserProfile", "TxHistory"],
  endpoints: () => ({}),
})
