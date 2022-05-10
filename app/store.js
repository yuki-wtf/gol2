import { configureStore } from "@reduxjs/toolkit";
import gamePlaySlice from "../features/Infinite/gameplay/gameplaySlice";
import generationsSlice from "../features/Infinite/generations/generationsSlice";
import infiniteGridSlice from "../features/Infinite/grid/infiniteGridSlice";
import playBackSlice from "../features/Infinite/playback/playbackSlice";
import userSlice from "../features/Infinite/user/userSlice";

export const store = configureStore({
  reducer: {
    generations: generationsSlice,
    infiniteGrid: infiniteGridSlice,
    user: userSlice,
    gameplay: gamePlaySlice,
    playback: playBackSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
