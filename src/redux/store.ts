import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"

import tabsReducer from "./tabs/slice"
import { api } from "./api/core"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    tabs: tabsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
