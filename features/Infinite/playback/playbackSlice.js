import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playbackMode: false,
};
export const playBackSlice = createSlice({
  name: "infiniteGrid",
  initialState,
  reducers: {
    togglePlayback: (state, { payload }) => {
      state.playbackMode = payload;
    },
  },
});

export const { togglePlayback } = playBackSlice.actions;
export default playBackSlice.reducer;
