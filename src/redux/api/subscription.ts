import { api } from "./core"

import { Subscription } from "@/types/subscriptions"

const DELAY_AFTER_SUCCESSFUL_BUY_IN_MS = 600

const subscriptionApi = api.injectEndpoints({
  endpoints: (build) => ({
    subscriptions: build.query<Subscription[], void>({
      query: () => ({
        url: "subscriptions/get-active/",
        method: "GET",
      }),
      transformResponse: (response: Subscription[]) => {
        return response.sort((a, b) => a.duration.id - b.duration.id)
      },
    }),
    buy: build.mutation<void, { id: number; promocode: string }>({
      query: ({ id, promocode }) => ({
        url: `subscriptions/${id}/buy/`,
        method: "POST",
        body: { id, promocode },
      }),
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
        // @ts-expect-error No-Error-Types
        errorCode: response.data.code,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled
        setTimeout(() => {
          dispatch(
            api.util.invalidateTags([
              "UserProfile",
              "TxHistory",
              "SharesHistory",
              "LinksAndChannels",
            ])
          )
        }, DELAY_AFTER_SUCCESSFUL_BUY_IN_MS)
      },
    }),
  }),
  overrideExisting: false,
})

export const { useSubscriptionsQuery, useBuyMutation } = subscriptionApi
