import {
  createSlice,
  createSelector,
} from '@reduxjs/toolkit'
import { WordsForm, WordsValues } from 'models/main'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'services/store'

export type SettingsStore = WordsForm

const initialState: SettingsStore = {
  words: [],
  mode: '',
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<SettingsStore>) => {
      const {
        mode,
        words
      } = action.payload

      state.mode = mode
      state.words = words
    }
  }
})

export const {
  setSettings,
} = settingsSlice.actions

export const getActiveOptions = createSelector(
  (state: RootState) => state.settings.words,
  (words) => {
    return words
      .map((word) => {
        if (word.isActive) {
          return word
        }

        return null
      })
      .filter(Boolean) as WordsValues[]
  },
)

export default settingsSlice.reducer