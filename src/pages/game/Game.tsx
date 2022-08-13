import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import {
  Row,
  Col,
  Input,
  Typography,
} from 'antd'
import { RootState } from 'services/store'
import { setSettings, SettingsStore } from 'services/settings/settings'

import styles from './Game.module.scss'
import { TRANSLATE_TEXT } from './constants'

const { Text } = Typography

const Game = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    words,
    mode,
  } = useSelector((state: RootState) => state.settings)
  const {
    currentWords,
  } = useSelector((state: RootState) => state.game)

  const redirect = () => {
    navigate('/', { replace: true })
  }

  useEffect(() => {
    const gameOptionsFromStorage = localStorage.getItem('settings')

    if (words.length && mode) {
      return
    }

    if (!gameOptionsFromStorage) {
      redirect()

      return
    }

    const parseGameOptions = JSON.parse(gameOptionsFromStorage)

    if (!parseGameOptions?.mode || !parseGameOptions?.words?.length) {
      console.log(!!parseGameOptions?.mode)

      redirect()

      return
    }

    dispatch(setSettings(parseGameOptions))
  }, [])

  return (
    <Row
      className={styles.container}
      justify='center'
      align='middle'
    >
      <Col span={10}>
        <Text>{TRANSLATE_TEXT} {words[currentWords].english}</Text>
        <Input />
      </Col>
    </Row>
  )
}

export default Game