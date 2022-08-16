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
          xs={24}
          lg={7}
          md={20}
          sm={20}
          span={12}
        >
          <List />
        </Col>
      </Row >
    </div>
  )
}

export default Main