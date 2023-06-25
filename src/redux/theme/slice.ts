import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface ThemeState {
  value: "light" | "dark" | null
}

const initialState: ThemeState = {
  value: null,
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.value = action.payload
    },
  },
})

export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer
