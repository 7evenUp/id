import { createSlice } from "@reduxjs/toolkit"

export interface IntroState {
  isShown: boolean
}

const initialState: IntroState = {
  isShown: false,
}

export const introSlice = createSlice({
  name: "intro",
  initialState,
  reducers: {
    setHasShown: (state) => {
      state.isShown = true
    },
  },
})

export const { setHasShown } = introSlice.actions

export default introSlice.reducer
