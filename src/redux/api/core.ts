import { User } from '@/types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0NDEzNjg2LCJpYXQiOjE2ODM1NDk2ODYsImp0aSI6ImYzODcwNjgzODUwNTQ1NThhYzE3ODcwZDJmMmMxZjVhIiwidXNlcl9pZCI6NH0.plgg6TjknEbePrMJJRms8F3HhdtTzPlERhdSDnsstpo'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://union-api.crypton.xyz/api/v1/',
    prepareHeaders: (headers, api) => {
      headers.set('authorization', `Bearer ${accessToken}`)
    },
  }),
  endpoints: (build) => ({
    me: build.query<User, void>({
      query: () => ({
        url: 'users/me',
        method: 'GET'
      })
    }),
    updateNickname: build.mutation<User, User>({
      query: ({id, ...patch}) => ({
        url: `users/${id}/`,
        method: 'PATCH',
        body: patch
      })
    })
  }),
})

export const { useMeQuery, useUpdateNicknameMutation } = api