import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export type TabsValuesType =
  | "research-bot"
  | "prime"
  | "tools"
  | "calendar"
  | "academy"
  | "inventory"

export const TABS_VALUES: Record<TabsValuesType, TabsValuesType> = {
  "research-bot": "research-bot",
  prime: "prime",
  tools: "tools",
  calendar: "calendar",
  academy: "academy",
  inventory: "inventory",
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
