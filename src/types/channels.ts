export interface ChannelsResponse {
  count: number
  pageCount: number
  next: string | null
  previous: string | null
  results: Channel[]
}

export interface Channel {
  id: number
  createdDatetime: string
  channelId: number
  mainLink: string | null
  name: string
  lang: string
}