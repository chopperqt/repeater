import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { WordsValues } from "models/main";

export interface Word extends WordsValues {
  status: StatusTranslate
}
export interface GameStore {
  words: Word[]
  currentWord: 0
}

export type StatusTranslate =
  'ERROR' |
  'COMPLETE' |
  'NOT-COMPLETE'

const initialState: GameStore = {
  currentWord: 0,
  words: []
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    nextWords: (state) => {
      state.currentWord += 1
    },
    setWords: (state, action: PayloadAction<WordsValues[]>) => {
      const formattedWords: Word[] = action.payload.map((word) => ({
        ...word,
        status: 'NOT-COMPLETE',
      }))

      state.words = formattedWords
    },
    setWord: (state, action: PayloadAction<Word>) => {
      const {
        english,
        status,
      } = action.payload

      const wordIndex = state.words.findIndex((word) => word.english === english)

      state.words[wordIndex].status = status
    }
  }
})

export const {
  nextWords,
  setWord,
  setWords,
} = gameSlice.actions

export default gameSlice.reducer