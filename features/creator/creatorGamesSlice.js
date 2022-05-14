import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  games: {},
  gameStates: {},
};
export const creatorGamesSlice = createSlice({
  name: "creatorGameSlice",
  initialState,
  reducers: {
    updateCreatorGames: (state, { payload }) => {
      // console.log("payload", payload);
      // console.log("payload index", payload.game_index);
      state.games[payload.game_index] = payload;
    },
    updateGameState: (state, { payload }) => {
      // console.log("payload", payload);
      // console.log("payload index", payload.game_index);
      state.gameStates[payload.game_index] = payload;
    },
  },
});

export const { updateCreatorGames, updateGameState } =
  creatorGamesSlice.actions;
export default creatorGamesSlice.reducer;
