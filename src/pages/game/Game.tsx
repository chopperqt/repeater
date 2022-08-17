import { useEffect } from 'react'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import {
  Row,
  Col,
} from 'antd'
import { RootState } from 'services/store'
import {
  getActiveOptions,
  nextStep,
} from 'services/settings/settings'
import CompleteStatus from './complete-status/CompleteStatus'
import { setWords } from 'services/game/game'
import WordForm from './word-form/WordForm'

import styles from './Game.module.scss'

const Game = () => {
  const dispatch = useDispatch()
  const {
    words,
    currentWord,
  } = useSelector((state: RootState) => state.game)
  const activeOptions = useSelector(getActiveOptions)

  useEffect(() => {
    if (currentWord < activeOptions.length) {
      return
    }

    dispatch(nextStep())
  }, [
    currentWord,
    activeOptions,
    dispatch,
  ])

  useEffect(() => {
    dispatch(setWords(activeOptions))
  }, [])

  return (
    <Row
      className={styles.container}
      justify='center'
      align='middle'
    >
      <Col className={styles.wrap}>
        {!!words.length && (
          <>
            <WordForm />
            <CompleteStatus words={words} />
          </>
        )}

      </Col>
    </Row>
  )
}

export default Game