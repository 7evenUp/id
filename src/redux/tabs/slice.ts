import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export type TabsValuesType =
  | "research"
  | "prime"
  | "tools"
  | "calendar"
  | "academy"
  | "inventory"
  | "nutcracker"

export const TABS_VALUES: Record<TabsValuesType, TabsValuesType> = {
  research: "research",
  prime: "prime",
  tools: "tools",
  calendar: "calendar",
  academy: "academy",
  inventory: "inventory",
  nutcracker: "nutcracker",
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
