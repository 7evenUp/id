import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react"

const CORRECT_BASE_URL = import.meta.env.DEV
  ? "/api/v1"
  : import.meta.env.VITE_API_BASE_URL + "/api/v1"

const baseQuery = fetchBaseQuery({
  baseUrl: CORRECT_BASE_URL,
  credentials: "include",
})

const baseQueryWithInterceptors: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 502) {
    console.log("502 error!!! : ", result.error)
  }

  return result
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithInterceptors,
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
