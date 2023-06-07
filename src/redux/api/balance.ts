import { api } from "./core"

type Response = string

const balanceApi = api.injectEndpoints({
  endpoints: (build) => ({
    topUpBalance: build.mutation<Response, { amount: number }>({
      query: (body) => ({
        url: "top-up-balance/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TxHistory"],
      transformResponse: (response: { paymentUrl: Response }) => {
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
