import { configureStore } from '@reduxjs/toolkit'


import settingsReducer from './settings/settings'
import gameReducer from './game/game'

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    game: gameReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch