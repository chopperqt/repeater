import { StatusTranslate } from "services/game/game";

export const checkTranslate = (word: string, translate: string): StatusTranslate => {
  const formattedWord = word
    .replaceAll(' ', '')
    .toLowerCase()

  const formattedTranslate = word
    .replaceAll(' ', '')
    .toLowerCase()

  if (formattedWord === formattedTranslate) {
    return 'COMPLETE'
  }

  return 'ERROR'
}