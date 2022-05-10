import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  playbackMode: false,
  isPlaying: false,
  playbackSpeed: 1000,
};
export const playBackSlice = createSlice({
  name: "infiniteGrid",
  initialState,
  reducers: {
    togglePlayback: (state, { payload }) => {
      state.playbackMode = payload;
    },
    togglePlayPause: (state, { payload }) => {
      console.log(payload);
      state.isPlaying = payload;
    },
    setPlaybackSpeed: (state, { payload }) => {
      console.log(payload);
      state.playbackSpeed = payload;
    },
  },
});

export const { togglePlayback, togglePlayPause, setPlaybackSpeed } =
  playBackSlice.actions;
export default playBackSlice.reducer;
