import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export type TabsValuesType = "research-bot" | "prime"

export const TABS_VALUES: Record<string, TabsValuesType> = {
  RESEARCH_BOT: "research-bot",
  PRIME: "prime",
}

export interface TabsState {
  value: TabsValuesType
}

const initialState: TabsState = {
  value: "prime",
}

export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    change: (state, action: PayloadAction<TabsValuesType>) => {
      state.value = action.payload
    },
  },
})

export const { change } = tabsSlice.actions

export default tabsSlice.reducer
