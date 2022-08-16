import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
} from 'services/settings/settings'
import CompleteStatus from './complete-status/CompleteStatus'
import { setWords } from 'services/game/game'
import WordForm from './word-form/WordForm'

import styles from './Game.module.scss'
import Result from './result/Result'

const Game = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    words,
    currentWord,
  } = useSelector((state: RootState) => state.game)
  const activeOptions = useSelector(getActiveOptions)

  const redirect = () => {
    navigate('/', { replace: true })
  }

  useEffect(() => {
    if (!activeOptions.length) {
      redirect()
    }

    dispatch(setWords(activeOptions))
  }, [])

  if (currentWord > words.length - 1) {
    return (
      <Result />
    )
  }

  return (
    <Row
      className={styles.container}
      justify='center'
      align='middle'
    >
      <Col
        className={styles.wrap}
        span={7}
        lg={7}
        md={12}
        xs={23}
        sm={23}
      >
        <WordForm />
        <CompleteStatus words={words} />
      </Col>
    </Row>
  )
}

export default Game