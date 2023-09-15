import { createSlice } from "@reduxjs/toolkit"

export interface ScaleState {
  value: boolean
}

const initialState: ScaleState = {
  value: false,
}

export const scaleSlice = createSlice({
  name: "scale",
  initialState,
  reducers: {
    changeScale: (state) => {
      state.value = !state.value
    },
  },
})

export const { changeScale } = scaleSlice.actions

export default scaleSlice.reducer
