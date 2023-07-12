export interface Channel {
  id: number
  createdDatetime: string
  channelId: number
  kind: string | null
  mainLink: string | null
  name: string
  lang: string
}

export interface ChannelsResponse {
  count: number
  pageCount: number
  next: string | null
  previous: string | null
  results: Channel[]
}

export interface LinksResponse {
  chatId: number
  createdDatetime: string
  id: number
  link: {
    channel: Channel
    createdDatetime: string
    id: number
    isUnlimited: boolean
    remainingUsages: number
    url: string
  }
}
