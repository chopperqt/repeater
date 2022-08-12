import React, { useState } from 'react'
import {
  Button,
  Col,
  Row,
  Typography,
} from 'antd'

const {
  Title,
  Paragraph,
} = Typography

const Main = () => {
  return (
    <Row justify='center'>
      <Col span={12}>
        <Title level={3}>Заполните список слов</Title>
        <Title level={3}>Выберите язык</Title>
        <Button>
          Начать
        </Button>
      </Col>
    </Row >
  )
}

export default Main