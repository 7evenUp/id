// Стейт для хранения referrer (сайта, с которого перешли на id.crypton.xyz)

import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ReferrerState {
  productName: string,
  url: string
}

const initialState: ReferrerState = {
  productName: "",
  url: ""
}

export const referrerSlice = createSlice({
  name: "referrer",
  initialState,
  reducers: {
    changeProductName: (state, action: PayloadAction<{productName: string, url: string}>) => {
      state.productName = action.payload.productName
      state.url = action.payload.url
    },
  },
})

export const { changeProductName } = referrerSlice.actions

export default referrerSlice.reducer
