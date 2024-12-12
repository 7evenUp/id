import { api } from "./core"

const nutsfarmApi = api.injectEndpoints({
  endpoints: (build) => ({
    checkRetrodrop: build.query<void, { telegramId: number }>({
      query: ({ telegramId }) => ({
        url: "nutsfarm/retro-drop/check/?telegramId=" + telegramId,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useCheckRetrodropQuery } = nutsfarmApi
