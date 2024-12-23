import { api } from "./core"

import { Promocode } from "@/types/promocode"

interface ReqParameters {
  promocode: string
  subscription?: number
}

const promocodeApi = api.injectEndpoints({
  endpoints: (build) => ({
    validatePromocode: build.mutation<Promocode, ReqParameters>({
      query: (body) => ({
        url: "promo-codes/validate/",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useValidatePromocodeMutation } = promocodeApi
