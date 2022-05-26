import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  preSelectedGrid: null,
};
export const createGameSlice = createSlice({
  name: "createGame",
  initialState,
  reducers: {
    updateGridSelection: (state, action) => {
      state.preSelectedGrid = action.payload;
    },
  },
});

export const { updateGridSelection } = createGameSlice.actions;
export default createGameSlice.reducer;

/* 
  1. user chooses a grid pattern - store this state on each selection
  2. user clicks start game - use stored grid state to populate the create new game function call 
  3. Trigger wallet interaction 
  4. if successful change route to 




   */
