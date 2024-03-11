import { api } from "./core"

interface AvatarParams {
  file_base64: string
  user: number
  is_active: boolean
}

const avatarApi = api.injectEndpoints({
  endpoints: (build) => ({
    changeAvatar: build.mutation<void, AvatarParams>({
      query: (body) => ({
        url: "users/change-avatar/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserProfile"],
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
      }),
    }),
    activatePrevious: build.mutation<void, { avatar_id: number }>({
      query: ({ avatar_id }) => ({
        url: "users/activate-previous-avatar/",
        method: "GET",
        params: { avatar_id },
      }),
      invalidatesTags: ["UserProfile"],
    }),
    deleteAvatar: build.mutation<void, { avatar_id: number }>({
      query: ({ avatar_id }) => ({
        url: "users/delete-avatar/",
        method: "GET",
        params: { avatar_id },
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
  overrideExisting: false,
})

export const {
  useChangeAvatarMutation,
  useActivatePreviousMutation,
  useDeleteAvatarMutation,
} = avatarApi
