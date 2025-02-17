import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v1",
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
