import { api } from "./core"

import { Banner } from "@/types/banners"

const bannersApi = api.injectEndpoints({
  endpoints: (build) => ({
    bannerById: build.query<Banner, { id: number }>({
      query: ({ id }) => ({
        url: `/banners/${id}/`,
        method: "GET",
      }),
    }),
    randomBanner: build.query<Banner, void>({
      query: () => ({
        url: "/banners/get-random/",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useBannerByIdQuery, useRandomBannerQuery } = bannersApi
