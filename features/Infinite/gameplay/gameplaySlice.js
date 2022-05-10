import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recentGames: [],
};
export const gamePlaySlice = createSlice({
  name: "gameplay",
  initialState,
  reducers: {
    updateRecentGames: (state, action) => {
      state.recentGames.push(action.payload);
    },
    // updateSnapshots: (state, action) => {
    //   state.snapshots = action.payload;
    // },
    // updateTokenIds: (state, action) => {
    //   if (action.payload) {
    //     console.log("action is", action);
    //     // state.snapshots = action.payload;
    //     const activeTokens = action.payload.gave_life_at.filter(
    //       (token) => token.words[0] !== 0
    //     );
    //     state.activeTokenCount = state.tokenCount - activeTokens.length;
    //     const activeTokensList = action.payload.gave_life_at.filter(
    //       (token, index) => {
    //         if (token.words[0] === 0) {
    //           console.log(index);
    //           console.log(state.snapshots[index]);
    //           // state.activeTokens = [
    //           //   ...state.activeTokens,
    //           //   state.snapshots[index],
    //           // ];
    //         }
    //       }
    //     );
    //     // state.activeTokens = activeTokensList;
    //   }

    //   // state.activeTokens = activeTokens;
    // },
  },
});

export const { updateRecentGames } = gamePlaySlice.actions;
export default gamePlaySlice.reducer;
