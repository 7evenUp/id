import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Преобразование параметра в виде массива в вид: параметр=значение1&параметр=значение2 и т.д.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const paramsSerializer = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams()

  for (const key in params) {
    const value = params[key]

    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(`${key}`, item)
      })
    } else {
      searchParams.append(key, value)
    }
  }

  return searchParams.toString()
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    // baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
    credentials: "include",
    paramsSerializer,
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: [
    "UserProfile",
    "TxHistory",
    "LinksAndChannels",
    "Inventory",
    "Points",
    "Shares",
    "SharesHistory",
    "LastOpenedContainers",
  ],
  endpoints: () => ({}),
})
