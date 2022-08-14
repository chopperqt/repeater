import { Col, Row } from "antd"

import { Word } from "services/game/game"

import styles from './CompleteStatus.module.scss'
import Status from "./partials/Status"

interface CompleteStatusProps {
  words: Word[]
}
const CompleteStatus = ({
  words,
}: CompleteStatusProps) => {
  if (!words.length) {
    return null
  }

  return (
    <Row justify="center">
      <Col className={styles.wrap}>
        {words.map(({ status }) => (
          <Status
            status={status}
          />
        ))}
      </Col>
    </Row>
  )
}

export default CompleteStatus