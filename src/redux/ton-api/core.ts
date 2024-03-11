import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const tonApi = createApi({
  reducerPath: "ton-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tonapi.io/v2",
  }),
  tagTypes: [],
  endpoints: () => ({}),
})
