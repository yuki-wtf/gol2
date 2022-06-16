import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  tokenCount: 0,
  activeTokenCount: 0,
  activeTokenCountLoaded: false,
  activeTokens: [],
  snapshots: [],
  creatorCreditsCount: 0,
  creatorGamesOwnedCount: 0,
}
export const userSlice = createSlice({
  name: 'infiniteGrid',
  initialState,
  reducers: {
    updateCreatorCredits: (state, action) => {
      state.creatorCreditsCount = action.payload
    },
    updateCreatorGamesOwned: (state, action) => {
      state.creatorGamesOwnedCount = action.payload
    },
    updateTokenCount: (state, action) => {
      state.tokenCount = action.payload
    },
    updateSnapshots: (state, action) => {
      state.snapshots = action.payload
    },
    updateTokenIds: (state, action) => {
      if (action.payload) {
        // console.log("action is", action);
        // state.snapshots = action.payload;
        const activeTokens = action.payload.gave_life_at.filter((token) => token.words[0] !== 0)
        state.activeTokenCount = state.tokenCount - activeTokens.length
        state.activeTokenCountLoaded = true

        // const activeTokensList = action.payload.gave_life_at.filter((token, index) => {
        //   if (token.words[0] === 0) {
        //     // console.log(index);
        //     // console.log(state.snapshots[index]);
        //     // state.activeTokens = [
        //     //   ...state.activeTokens,
        //     //   state.snapshots[index],
        //     // ];
        //   }
        // }) // state.activeTokens = activeTokensList;
      } // state.activeTokens = activeTokens;
    },
  },
})
export const { updateTokenIds, updateTokenCount, updateSnapshots, updateCreatorCredits, updateCreatorGamesOwned } =
  userSlice.actions
export default userSlice.reducer
