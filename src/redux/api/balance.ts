import { api } from "./core"

const balanceApi = api.injectEndpoints({
  endpoints: (build) => ({
    topUpBalance: build.mutation<void, { amount: number }>({
      query: (body) => ({
        url: "top-up-balance/",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useTopUpBalanceMutation } = balanceApi
