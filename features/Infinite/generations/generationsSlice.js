import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generations: {},
  latest_generation: null,
  selected_generation: null,
};
export const generationsSlice = createSlice({
  name: "generations",
  initialState,
  reducers: {
    updateGenerations(state, { payload }) {
      // console.log(state, payload);
      state.generations[payload.id] = payload.data;
    },
    updateLatestGeneration(state, { payload }) {
      // console.log(state, payload);

      state.latest_generation = parseInt(payload);
    },
    updateSelectedGeneration(state, { payload }) {
      // console.log(state, payload);

      state.selected_generation = parseInt(payload);
    },
  },
});

export const {
  updateGenerations,
  updateSelectedGeneration,
  updateLatestGeneration,
} = generationsSlice.actions;
export default generationsSlice.reducer;
