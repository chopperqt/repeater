import {
  createSlice,
  createSelector,
} from '@reduxjs/toolkit'
import { WordsForm, WordsValues } from 'models/main'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'services/store'

export interface SettingsStore extends WordsForm {
  step: number,
}

const initialState: SettingsStore = {
  words: [],
  mode: '',
  step: 0,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<WordsForm>) => {
      const {
        mode,
        words
      } = action.payload

      state.mode = mode
      state.words = words
    },
    nextStep: (state) => {
      state.step += 1
    },
    setState: (state, action: PayloadAction<number>) => {
      state.step = action.payload
    }
  }
})

export const {
  setSettings,
  nextStep,
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