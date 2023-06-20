import { api } from "./core"

import { Subscription } from "@/types/subscriptions"

const subscriptionApi = api.injectEndpoints({
  endpoints: (build) => ({
    subscriptions: build.query<Subscription[], void>({
      query: () => ({
        url: "subscriptions/",
        method: "GET",
      }),
      transformResponse: (response: { results: Subscription[] }) => {
        return response.results.sort((a, b) => a.duration.id - b.duration.id)
      },
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
