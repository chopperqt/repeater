import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  currentWords: 0,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {}
})

export default gameSlice.reducer