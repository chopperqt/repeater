import { StatusTranslate } from "services/game/game";

export const checkTranslate = (word: string, translate: string): StatusTranslate => {
  if (word.toLocaleLowerCase() === translate.toLocaleLowerCase()) {
    return 'COMPLETE'
  }

  return 'ERROR'
}