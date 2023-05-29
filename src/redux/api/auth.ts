import { api } from "./core"

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<void, { email: string; redirect_url: string }>({
      query: ({ email, redirect_url }) => ({
        url: "users/login/",
        method: "POST",
        body: { email, redirect_url },
      }),
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
      }),
    }),
    register: build.mutation<void, { email: string; username: string }>({
      query: ({ email, username }) => ({
        url: "users/register-web/",
        method: "POST",
        body: { email, username },
      }),
      transformErrorResponse: (response) => ({
        // @ts-expect-error No-Error-Types
        message: response.data.detail,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLoginMutation, useRegisterMutation } = authApi
