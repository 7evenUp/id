import { api } from "./core"

type ReqResponse = string

interface ReqParams {
  amount: number
  is_receipt_need: boolean
  payment_type: "crypto" | "card"
  network?: "BSC" | "TRON" | "ETH" | "BTC"
  currency?: "BTC" | "BUSD" | "USDT" | "USDC" | "RUB" | "USD" | "KZT"
}

const balanceApi = api.injectEndpoints({
  endpoints: (build) => ({
    topUpBalance: build.mutation<ReqResponse, ReqParams>({
      query: (body) => ({
        url: "top-up-balance/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TxHistory"],
      transformResponse: (response: { paymentUrl: ReqResponse }) => {
        return response.paymentUrl
      },
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useTopUpBalanceMutation } = balanceApi
