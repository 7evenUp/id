import { api } from "./core"

import { SharesTxRequestResponse } from "@/types/shares"

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSharesHistory: build.query<SharesTxRequestResponse, void>({
      query: () => ({
        url: "user/info/invest-fund-transactions/",
        method: "GET",
      }),
      providesTags: ["SharesHistory"],
    }),
  }),
  overrideExisting: false,
})

export const { useGetSharesHistoryQuery } = userApi
