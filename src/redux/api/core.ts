import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    // baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: [
    "UserProfile",
    "TxHistory",
    "LinksAndChannels",
    "Inventory",
    "Points",
  ],
  endpoints: () => ({}),
})
