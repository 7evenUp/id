import { api } from "./core"

import { Inventory } from "@/types/ny-inventory"

interface ClaimResponse {
  instruction: string | null
  prize_code: string | null
  help_text: string | null
  claim_url: string | null
}

const inventoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    inventory: build.query<Inventory, void>({
      query: () => ({
        url: "users/ny/inventory",
        method: "GET",
      }),
      providesTags: ["Inventory"],
      transformResponse: (baseQueryReturnValue: Inventory) => {
        const sorted = baseQueryReturnValue.items.sort(
          (a, b) => +a.isUsed - +b.isUsed
        )
        return {
          itemsCount: baseQueryReturnValue.itemsCount,
          items: sorted,
        }
      },
    }),
    claim: build.mutation<ClaimResponse, { inventoryPrizeId: number }>({
      query: (body) => ({
        url: "users/inventory/claim/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Inventory"],
    }),
  }),
  overrideExisting: false,
})

export const { useInventoryQuery, useClaimMutation } = inventoryApi
