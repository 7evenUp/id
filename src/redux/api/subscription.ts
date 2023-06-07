import { api } from "./core"

import { SubscriptionsResponse } from "@/types/subscriptions"

const subscriptionApi = api.injectEndpoints({
  endpoints: (build) => ({
    subscriptions: build.query<SubscriptionsResponse, void>({
      query: () => ({
        url: "subscriptions/",
        method: "GET",
      }),
    }),
    buy: build.mutation<void, { id: number; promocode: string }>({
      query: ({ id, promocode }) => ({
        url: `subscriptions/${id}/buy/`,
        method: "POST",
        body: { id, promocode },
      }),
      invalidatesTags: ["UserProfile", "TxHistory"],
    }),
  }),
  overrideExisting: false,
})

export const { useSubscriptionsQuery, useBuyMutation } = subscriptionApi
