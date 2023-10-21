import { api } from "./core"

import { LinksResponse } from "@/types/channels"

interface ChannelLinksParams {
  channels?: number[]
  chat_id?: number
  lang?: "ru" | "en"
}

interface JoinChannelParams {
  id: number
  link: string
  telegram_id: number
}

const channelsApi = api.injectEndpoints({
  endpoints: (build) => ({
    links: build.query<LinksResponse[], ChannelLinksParams>({
      query: ({ channels, chat_id, lang }) => ({
        url: "channels/get-links-for-user/",
        method: "GET",
        params: { channels, chat_id, lang },
      }),
      providesTags: ["LinksAndChannels"],
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
      }),
    }),
    joinChannel: build.mutation<void, JoinChannelParams>({
      query: ({ id, ...body }) => ({
        url: `channels/${id}/join/`,
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLinksQuery, useJoinChannelMutation } = channelsApi
