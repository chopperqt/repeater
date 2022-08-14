import {
  onlyLatinica,
  onlyCyrillic,
} from "helpers/patterns"
import {
  RequiredText,
  OnlyCyrillicText,
  OnlyLatinicaText,
} from "helpers/validateMessages"

export const ENGLISH_TEXT = 'Английский'
export const RUSSIA_TEXT = 'Русский'
export const STEP_FIRST_TEXT = 'Добавьте слова'
export const ADD_BUTTON_TEXT = 'Добавить слово'
export const MODE_TEXT = 'Выберите режим'
export const MODE_FIRST_TEXT = 'С Английского на Русский'
export const MODE_SECOND_TEXT = 'С Русского на Английский'
export const START_BUTTON_TEXT = 'Начать'

export const RulesEnglishField = [
  {
    required: true,
    message: RequiredText
  },
  {
    pattern: onlyLatinica,
    message: OnlyLatinicaText
  }
]

export const RulesRussiaField = [
  {
    required: true,
    message: RequiredText,
  },
  {
    pattern: onlyCyrillic,
    message: OnlyCyrillicText,
  }
]