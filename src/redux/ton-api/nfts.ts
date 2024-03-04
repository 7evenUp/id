import { tonApi as api } from "./core"

import { NFTItems } from "@/types/ton-nfts"

export const nftsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getNFTs: build.query<
      NFTItems,
      { account_address: string; collection_address: string }
    >({
      query: ({ account_address, collection_address }) => ({
        url: `accounts/${account_address}/nfts`,
        method: "GET",
        params: {
          collection: collection_address,
          limit: 1000,
          offset: 0,
          indirect_ownership: false,
        },
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetNFTsQuery } = nftsApi
