import { api } from "./core"

type Kinds = "TO_CRYPTON_BALANCE" | "TO_SHARES" | "TO_PERSONAL_WALLET"

interface ReqParameters {
  amount: number
  wallet_address: string
  kind: Kinds
}

const referralApi = api.injectEndpoints({
  endpoints: (build) => ({
    withdraw: build.mutation<void, ReqParameters>({
      query: (body) => ({
        url: "withdraw_requests/request/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserProfile", "TxHistory"],
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useWithdrawMutation } = referralApi
