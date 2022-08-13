import { createSlice } from '@reduxjs/toolkit'
import { WordsForm } from 'models/main'
import type { PayloadAction } from '@reduxjs/toolkit'

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

export default settingsSlice.reducer