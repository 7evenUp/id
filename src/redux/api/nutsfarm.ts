import { api } from "./core"

const nutsfarmApi = api.injectEndpoints({
  endpoints: (build) => ({
    checkRetrodrop: build.query<void, { telegramId?: number; userId: number }>({
      query: (body) => ({
        url: "nutsfarm/retro-drop/check/",
        method: "GET",
        params: body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useCheckRetrodropQuery } = nutsfarmApi
