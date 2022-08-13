export interface WordsForm {
  words: WordsValues[]
  mode: string
}

export interface WordsValues {
  english: string,
  russia: string,
  isActive: boolean
}
