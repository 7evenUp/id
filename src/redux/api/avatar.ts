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
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useChangeAvatarMutation } = avatarApi
