import { configureStore } from '@reduxjs/toolkit'
import createGameSlice from './features/creator/create/CreateGameSlice'
import creatorGamesSlice from './features/creator/creatorGamesSlice'
import gamePlaySlice from './features/Infinite/gameplay/gameplaySlice'
import generationsSlice from './features/Infinite/generations/generationsSlice'
import infiniteGridSlice from './features/Infinite/grid/infiniteGridSlice'
import playBackSlice from './features/Infinite/playback/playbackSlice'
import userSlice from './features/Infinite/user/userSlice'

export const store = configureStore({
  reducer: {
    generations: generationsSlice,
    infiniteGrid: infiniteGridSlice,
    user: userSlice,
    gameplay: gamePlaySlice,
    playback: playBackSlice,
    creatorGames: creatorGamesSlice,
    createGame: createGameSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
