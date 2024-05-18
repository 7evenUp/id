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
    hidePrimeInstruction: build.mutation<void, void>({
      query: () => ({
        url: "user/setters/disable-prime-instruction/",
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetSharesHistoryQuery, useHidePrimeInstructionMutation } =
  userApi
