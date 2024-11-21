import { api } from "./core"

import {
  ContainersResponse,
  OpenContainerResponse,
} from "@/types/crypton-events"

interface OpenContainerArgs {
  user_id: number
  containerId: number
}

const DELAY_AFTER_SUCCESSFUL_OPEN_IN_MS = 8000

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
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled
        setTimeout(() => {
          dispatch(
            api.util.invalidateTags([
              "UserProfile",
              "LastOpenedContainers",
              "Inventory",
            ])
          )
        }, DELAY_AFTER_SUCCESSFUL_OPEN_IN_MS)
      },
    }),
    lastContainerOpenResults: build.query<
      {
        prizeImageUrl: string
        prizeTitle: string
        userProfileName: string
      }[],
      void
    >({
      query: () => ({
        url: "crypton-events/last-opened-containers/",
        method: "GET",
      }),
      providesTags: ["LastOpenedContainers"],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetContainersQuery,
  useOpenContainerMutation,
  useLastContainerOpenResultsQuery,
} = cryptonEventsApi
