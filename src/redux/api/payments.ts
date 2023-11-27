import { api } from "./core"

import { PaymentsMethod } from "@/types/payments-methods"

const paymentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    availableMethods: build.query<PaymentsMethod[], void>({
      query: () => ({
        url: "payments/available/methods",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useAvailableMethodsQuery } = paymentsApi
