import {
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { WordsValues } from "models/main";
import { RootState } from "services/store";

export interface Word extends WordsValues {
  status: StatusTranslate
  enteredWord?: string
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
        enteredWord,
      } = action.payload

      const wordIndex = state.words.findIndex((word) => word.english === english)

      state.words[wordIndex].status = status
      state.words[wordIndex].enteredWord = enteredWord
    }
  }
})

export const getAmountOfCompleteWords = createSelector(
  (state: RootState) => state.game.words,
  (words) => {
    return words
      .map(({ status }) => {
        if (status !== 'COMPLETE') {
          return null
        }

        return status
      })
      .filter(Boolean)
      .length
  }
)

export const getAmountOfErrorWords = createSelector(
  (state: RootState) => state.game.words,
  (words) => {
    return words
      .map(({ status }) => {
        if (status !== 'ERROR') {
          return null
        }

        return status
      })
      .filter(Boolean)
      .length
  }
)

export const getErrorWords = createSelector(
  (state: RootState) => state.game.words,
  (words) => {
    return words
      .map((word) => {
        if (word.status !== 'ERROR') {
          return null
        }

        return word
      })
      .filter(Boolean)
  }
)

export const {
  nextWords,
  setWord,
  setWords,
} = gameSlice.actions

export default gameSlice.reducer