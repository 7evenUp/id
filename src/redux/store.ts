import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"

import tabsReducer from "./tabs/slice"
import themeReducer from "./theme/slice"
import languageReducer from "./language/slice"
import scaleReducer from "./scale/slice"
import referrerReducer from "./referrer/slice"

import { api } from "./api/core"
import { tonApi } from "./ton-api/core"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [api.reducerPath, tonApi.reducerPath],
}

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [tonApi.reducerPath]: tonApi.reducer,
  tabs: tabsReducer,
  theme: themeReducer,
  language: languageReducer,
  scale: scaleReducer,
  referrer: referrerReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(api.middleware)
      .concat(tonApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
