import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generations: {},
};
export const generationsSlice = createSlice({
  name: "generations",
  initialState,
  reducers: {
    updateGenerations(state, { payload }) {
      state.generations[payload.id] = payload;
    },
  },
});

export const { updateGenerations } = generationsSlice.actions;
export default generationsSlice.reducer;
