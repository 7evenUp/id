import { createSlice } from "@reduxjs/toolkit"

export interface CookieState {
  isShown: boolean
}

const initialState: CookieState = {
  isShown: false,
}

export const cookieSlice = createSlice({
  name: "cookie",
  initialState,
  reducers: {
    setHasShown: (state) => {
      state.isShown = true
    },
  },
})

export const { setHasShown } = cookieSlice.actions

export default cookieSlice.reducer
