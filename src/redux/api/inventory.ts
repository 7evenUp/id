import { api } from "./core"

import { Inventory } from "@/types/ny-inventory"

// interface ClaimResponse {
//   instruction: string | null
//   prize_code: string | null
//   help_text: string | null
//   claim_url: string | null
// }

const inventoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    inventory: build.query<Inventory, void>({
      query: () => ({
        url: "users/ny/inventory",
        method: "GET",
      }),
    }),
    // claim: build.mutation<ClaimResponse, { inventory_prize_id: number }>({
    //   query: ({ inventory_prize_id }) => ({
    //     url: `api/me/inventory/${inventory_prize_id}/claim`,
    //     method: "POST",
    //   }),
    // }),
  }),
  overrideExisting: false,
})

export const { useInventoryQuery } = inventoryApi
