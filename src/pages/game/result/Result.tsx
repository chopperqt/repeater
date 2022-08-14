import {
  Row,
  Col,
} from 'antd'
import { useSelector } from 'react-redux'

import { getAmountOfCompleteWords, getAmountOfErrorWords } from 'services/game/game'

import styles from './Result.module.scss'

const Result = () => {
  const amountOfCompleteWords = useSelector(getAmountOfCompleteWords)
  const amountOfErrorWords = useSelector(getAmountOfErrorWords)

  return (
    <Row
      className={styles.layout}
      justify="center"
      align="middle"
    >
      <Col>
        {amountOfCompleteWords}
      </Col>
    </Row>
  )
}

export default Result