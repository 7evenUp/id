// Стейт для хранения referrer (сайта, с которого перешли на id.crypton.xyz)

import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ReferrerState {
  productName: string
  url: string
  timestamp: string | null
}

const initialState: ReferrerState = {
  productName: "",
  url: "",
  timestamp: null,
}

export const referrerSlice = createSlice({
  name: "referrer",
  initialState,
  reducers: {
    changeProductName: (
      state,
      action: PayloadAction<{
        productName: string
        url: string
        timestamp: string | null
      }>
    ) => {
      state.productName = action.payload.productName
      state.url = action.payload.url
      state.timestamp = action.payload.timestamp
    },
  },
})

export const { changeProductName } = referrerSlice.actions

export default referrerSlice.reducer
