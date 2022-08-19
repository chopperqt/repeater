import {
  Row,
  Col,
  Typography,
  Table,
  Button,
} from 'antd'
import { ALL_WORDS_TEXT, REPEAT_TEXT, RESET_TEXT, RESULT_TITLE } from 'language/ru'
import { useDispatch, useSelector } from 'react-redux'
import {
  RollbackOutlined,
  UndoOutlined,
} from '@ant-design/icons'

import {
  getAmountOfCompleteWords,
  getAmountOfErrorWords,
  getEnglishErrorWords,
  getRussiaErrorWords,
  repeatGame,
  resetGame,
  Word,
} from 'services/game/game'
import {
  COMPLETE_TEXT,
  ERROR_TEXT,
} from 'language/ru'
import { Columns } from './constants'
import {
  repeatSettings,
  resetSettings,
} from 'services/settings/settings'

import styles from './Result.module.scss'
import { RootState } from 'services/store'

const {
  Title,
  Text,
} = Typography

const Result = () => {
  const dispatch = useDispatch()
  const mode = useSelector((state: RootState) => state.settings.mode)
  const amountOfWords = useSelector((state: RootState) => state.game.words).length
  const amountOfCompleteWords = useSelector(getAmountOfCompleteWords)
  const amountOfErrorWords = useSelector(getAmountOfErrorWords)

  const selectedErrorMode = mode === 'engToRus'
    ? getRussiaErrorWords
    : getEnglishErrorWords

  const errorWords = useSelector(selectedErrorMode) as []

  const handleReset = () => {
    dispatch(resetSettings())
    dispatch(resetGame())
  }

  const handleRepeat = () => {
    dispatch(repeatSettings())
    dispatch(repeatGame())
  }

  return (
    <Row
      className={styles.layout}
      justify="center"
      align="middle"
    >
      <Col className="container">
        <Row justify='center'>
          <Title>{RESULT_TITLE}</Title>
        </Row>
        <Text className={styles.description}>
          {COMPLETE_TEXT}{amountOfCompleteWords}
        </Text>
        <Text className={styles.description}>
          {ERROR_TEXT}{amountOfErrorWords}
        </Text>
        <Text className={styles.description}>
          {ALL_WORDS_TEXT}{amountOfWords}
        </Text>
        {!!errorWords.length && (
          <Row>
            <Col span={24}>
              <Table
                className={styles.table}
                dataSource={errorWords}
                columns={Columns}
                pagination={false}
              />
            </Col>
          </Row>
        )}
        <Row
          justify="center"
          className={styles.action}
        >
          <Button
            size="large"
            type="primary"
            danger={true}
            icon={<RollbackOutlined />}
            onClick={handleReset}
          >
            {RESET_TEXT}
          </Button>
          <Button
            size="large"
            type="primary"
            icon={<UndoOutlined />}
            onClick={handleRepeat}
          >
            {REPEAT_TEXT}
          </Button>
        </Row>
      </Col>
    </Row >
  )
}

export default Result