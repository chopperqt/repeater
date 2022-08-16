import {
  Row,
  Col,
} from 'antd'
import { useSelector } from 'react-redux'

import {
  getAmountOfCompleteWords,
  getAmountOfErrorWords,
  getErrorWords,
  Word,
} from 'services/game/game'
import { RootState } from 'services/store'
import { COMPLETE_TEXT, ERROR_TEXT } from '../constants'

import styles from './Result.module.scss'

const Result = () => {
  const amountOfCompleteWords = useSelector(getAmountOfCompleteWords)
  const amountOfErrorWords = useSelector(getAmountOfErrorWords)
  const errorWords = useSelector(getErrorWords) as Word[]
  const mode = useSelector((state: RootState) => state.settings.mode)

  return (
    <Row
      className={styles.layout}
      justify="center"
      align="middle"
    >
      <Col>
        <Row>
          {COMPLETE_TEXT}{amountOfCompleteWords}
        </Row>
        <Row>
          {ERROR_TEXT}{amountOfErrorWords}
        </Row>
        <Row>
          {errorWords?.length && errorWords.map(({
            russia,
            english,
            enteredWord,
          }) => {
            let word = english
            let translateWord = russia

            if (mode === 'rusToEng') {
              word = russia
              translateWord = english
            }

            return (
              <div>
                Слово: {word}, перевод: {translateWord}, вы ввели {enteredWord}
              </div>
            )
          })}
        </Row>
      </Col>
    </Row>
  )
}

export default Result