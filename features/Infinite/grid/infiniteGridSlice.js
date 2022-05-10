import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCellRow: null,
  selectedCellColumn: null,
  pendingCellRow: null,
  pendingCellColumn: null,
};
export const infiniteGridSlice = createSlice({
  name: "infiniteGrid",
  initialState,
  reducers: {
    setSelectedCellRow: (state, action) => {
      state.selectedCellRow = action.payload;
    },
    setSelectedCellColumn: (state, action) => {
      state.selectedCellColumn = action.payload;
    },
    setPendingCellRow: (state, action) => {
      state.pendingCellRow = action.payload;
    },
    setPendingCellColumn: (state, action) => {
      state.pendingCellColumn = action.payload;
    },
  },
});

export const { setSelectedCellRow, setSelectedCellColumn } =
  infiniteGridSlice.actions;
export default infiniteGridSlice.reducer;
