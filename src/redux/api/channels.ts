import { api } from "./core"

import { Channel } from "@/types/channels"

const balanceApi = api.injectEndpoints({
  endpoints: (build) => ({
    channels: build.query<Channel[], void>({
      query: () => ({
        url: "channels/",
        method: "GET",
      }),
      transformResponse: (response: { results: Channel[] }) => {
        return response.results
      },
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
      }),
    }),
    links: build.query<void, {channels: number[], chat_id: number, lang: 'ru' | 'en'}>({
      query: ({channels, chat_id, lang}) => ({
        url: "channels/get-links-for-user/",
        method: "GET",
        params: {channels, chat_id, lang}
      }),
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
      }),
    })
  }),
  overrideExisting: false,
})

export const { useChannelsQuery, useLinksQuery } = balanceApi
