import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface UI_State {
  minimiseSidebar: boolean;
  hideSidebar: boolean;
  showDrawer: boolean;
  loading: boolean;
}

const initialState: UI_State = {
  minimiseSidebar: true,
  hideSidebar: false,
  showDrawer: false,
  loading: true,
};

const UI_Slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSizeSideBar(state, action: PayloadAction<boolean>) {
      state.minimiseSidebar = action.payload;
    },
    setHideSideBar(state, action: PayloadAction<boolean>) {
      state.hideSidebar = action.payload;
    },
    setDrawer(state, action: PayloadAction<boolean>) {
      state.showDrawer = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setSizeSideBar, setHideSideBar, setDrawer, setLoading } = UI_Slice.actions;

export default UI_Slice.reducer;
