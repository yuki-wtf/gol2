import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokenCount: 0,
  activeTokenCount: 0,
  activeTokens: [],
  snapshots: [],
};
export const userSlice = createSlice({
  name: "infiniteGrid",
  initialState,
  reducers: {
    updateTokenCount: (state, action) => {
      state.tokenCount = action.payload;
    },
    updateSnapshots: (state, action) => {
      state.snapshots = action.payload;
    },
    updateTokenIds: (state, action) => {
      if (action.payload) {
        // console.log("action is", action);
        // state.snapshots = action.payload;
        const activeTokens = action.payload.gave_life_at.filter(
          (token) => token.words[0] !== 0
        );
        state.activeTokenCount = state.tokenCount - activeTokens.length;
        const activeTokensList = action.payload.gave_life_at.filter(
          (token, index) => {
            if (token.words[0] === 0) {
              // console.log(index);
              // console.log(state.snapshots[index]);
              // state.activeTokens = [
              //   ...state.activeTokens,
              //   state.snapshots[index],
              // ];
            }
          }
        );
        // state.activeTokens = activeTokensList;
      }

      // state.activeTokens = activeTokens;
    },
  },
});

export const { updateTokenIds, updateTokenCount, updateSnapshots } =
  userSlice.actions;
export default userSlice.reducer;
