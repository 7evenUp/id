import { api } from "./core"

import {
  ContainersResponse,
  OpenContainerResponse,
} from "@/types/crypton-events"

interface OpenContainerArgs {
  user_id: number
  containerId: number
}

const cryptonEventsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getContainers: build.query<ContainersResponse, void>({
      query: () => ({
        url: "crypton-events/containers/",
        method: "GET",
      }),
    }),
    openContainer: build.mutation<OpenContainerResponse, OpenContainerArgs>({
      query: ({ user_id, containerId }) => ({
        url:
          "crypton-events/containers/open/?user_id=" +
          user_id +
          "&containerId=" +
          containerId,
        method: "POST",
      }),
    }),
    lastContainerOpenResults: build.query<void, void>({
      query: () => ({
        url: "crypton-events/last-opened-containers/",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetContainersQuery,
  useOpenContainerMutation,
  useLastContainerOpenResultsQuery,
} = cryptonEventsApi
