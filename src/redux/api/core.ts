import { User } from '@/types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0MzE4OTc0LCJpYXQiOjE2ODM0NTQ5NzQsImp0aSI6IjcwYmU0M2NlODM3NDQ0NzNhNjFkN2JiYmVlMGQwMDU2IiwidXNlcl9pZCI6NH0.dacFcwWI0liZvnFh8O3q07WQNYaBCKpbocahd8qmaDE'

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
    })
  }),
})

export const { useMeQuery } = api