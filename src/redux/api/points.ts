import { api } from "./core"

import { PointsBuyPrizeResponse, PointsPrize } from "@/types/points"

const pointsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPrizes: build.query<PointsPrize[], void>({
      query: () => ({
        url: "points-store/prizes/",
        method: "GET",
      }),
      providesTags: ["Points"],
    }),
    buyPrize: build.mutation<PointsBuyPrizeResponse, { prizeId: number }>({
      query: ({ prizeId }) => ({
        url: `points-store/prizes/buy/?prizeId=${prizeId}`,
        method: "POST",
      }),
      invalidatesTags: ["Points", "UserProfile", "Inventory"],
    }),
    getShares: build.query<PointsPrize[], void>({
      query: () => ({
        url: "points-store/shares/",
        method: "GET",
      }),
      providesTags: ["Shares"],
    }),
    claimShares: build.mutation<PointsBuyPrizeResponse, { prizeId: number }>({
      query: ({ prizeId }) => ({
        url: `points-store/shares/claim/?prizeId=${prizeId}`,
        method: "POST",
      }),
      invalidatesTags: ["Shares", "UserProfile", "Inventory"],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetPrizesQuery,
  useBuyPrizeMutation,
  useGetSharesQuery,
  useClaimSharesMutation,
} = pointsApi
