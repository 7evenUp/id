import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface LanguageState {
  value: "ru" | "en"
}

const initialState: LanguageState = {
  value: "ru",
}

export const languageSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeLang: (state, action: PayloadAction<"ru" | "en">) => {
      state.value = action.payload
    },
  },
})

export const { changeLang } = languageSlice.actions

export default languageSlice.reducer
