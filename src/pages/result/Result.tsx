import {
  Row,
  Col,
  Typography,
  Table,
  Button,
} from 'antd'
import { RESULT_TITLE } from 'language/ru'
import { useDispatch, useSelector } from 'react-redux'
import {
  RollbackOutlined,
  UndoOutlined,
} from '@ant-design/icons'

import {
  getAmountOfCompleteWords,
  getAmountOfErrorWords,
  getErrorWords,
  resetGame,
  Word,
} from 'services/game/game'
import {
  COMPLETE_TEXT,
  ERROR_TEXT,
} from 'language/ru'
import { Columns } from './constants'

import styles from './Result.module.scss'
import { resetSettings } from 'services/settings/settings'

const {
  Title,
  Text,
} = Typography

const Result = () => {
  const dispatch = useDispatch()
  const amountOfCompleteWords = useSelector(getAmountOfCompleteWords)
  const amountOfErrorWords = useSelector(getAmountOfErrorWords)
  const errorWords = useSelector(getErrorWords) as Word[]

  const handleReset = () => {
    dispatch(resetSettings())
    dispatch(resetGame())
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
        {!!errorWords.length && (
          <Row>
            <Table
              className={styles.table}
              dataSource={errorWords}
              columns={Columns}
              pagination={false}
            />
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
            Завершить
          </Button>
          <Button
            size="large"
            type="primary"
            icon={<UndoOutlined />}
          >
            Повторить
          </Button>
        </Row>
      </Col>
    </Row >
  )
}

export default Result