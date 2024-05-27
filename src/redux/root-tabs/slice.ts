import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export type RootTabsValuesType = "products" | "inventory"

export const ROOT_TABS_VALUES: Record<RootTabsValuesType, RootTabsValuesType> =
  {
    products: "products",
    inventory: "inventory",
  }

export interface RootTabsState {
  value: RootTabsValuesType
}

const initialState: RootTabsState = {
  value: "products",
}

export const rootTabsSlice = createSlice({
  name: "root-tabs",
  initialState,
  reducers: {
    changeRootTab: (state, action: PayloadAction<RootTabsValuesType>) => {
      state.value = action.payload
    },
  },
})

export const { changeRootTab } = rootTabsSlice.actions

export default rootTabsSlice.reducer
