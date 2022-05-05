import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import generationsSlice from "../features/Infinite/generations/generationsSlice";

export const store = configureStore({
  reducer: {
    generations: generationsSlice,
    // This is where we add reducers.
    // Since we don't have any yet, leave this empty
  },
});
