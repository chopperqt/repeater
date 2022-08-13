import {
  Col,
  Row,
} from 'antd'

import List from './list/List'

import styles from './Main.module.scss'

const Main = () => {
  return (
    <div className={styles.container}>
      <Row justify='center'>
        <Col
          xs={23}
          lg={16}
          md={20}
          sm={20}
          span={20}
        >
          <List />
        </Col>
      </Row >
    </div>
  )
}

export default Main