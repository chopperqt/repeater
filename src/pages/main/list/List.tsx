import {
  useNavigate,
} from 'react-router-dom'
import {
  Form,
  Input,
  Button,
  Col,
  Row,
  Checkbox,
  Typography,
  Radio,
  Switch,
} from 'antd'
import {
  PlusOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'

import {
  ENGLISH_TEXT,
  RUSSIA_TEXT,
  RulesRussiaField,
  RulesEnglishField,
  STEP_FIRST_TEXT,
  ADD_BUTTON_TEXT,
  MODE_TEXT,
  MODE_FIRST_TEXT,
  MODE_SECOND_TEXT,
  START_BUTTON_TEXT,
} from '../constants'

import styles from '../Main.module.scss'
import {
  WordsForm,
  WordsValues,
} from 'models/main'
import { useDispatch } from 'react-redux'
import { setSettings } from 'services/settings/settings'

const { Title } = Typography
const defaultValue = {
  words: [],
  mode: ''
}

const List = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const values = localStorage.getItem('settings')
  const formValueFromStorage = values
    ? JSON.parse(values)
    : defaultValue


  const handleChange = (value: WordsValues, allValues: WordsForm) => {
    const normalizedValues = allValues.words
      .map((item) => {
        if (!item) {
          return null
        }

        const {
          english,
          russia,
        } = item

        if (!english && !russia) {
          return null
        }

        return item
      })
      .filter(Boolean)
    const valuesToJSON = JSON.stringify({
      words: normalizedValues
    })

    localStorage.setItem('settings', valuesToJSON)
  }

  const handleFinish = (values: WordsForm) => {
    const valuesToJSON = JSON.stringify(values)

    dispatch(setSettings(values))

    localStorage.setItem('settings', valuesToJSON)

    navigate('/game', { replace: true })
  }

  return (
    <Form
      onValuesChange={handleChange}
      initialValues={formValueFromStorage}
      onFinish={handleFinish}
    >
      <Title
        level={3}
        className={styles.title}
      >
        <span className={styles.circle}>
          1
        </span>
        {STEP_FIRST_TEXT}
      </Title>
      <Form.List name="words">
        {(fields, { add, remove }) => (
          <Col span={15}>
            {fields.map(({
              key,
              name,
              ...resetField
            }) => (
              <Row
                key={key}
                gutter={[12, 12]}
              >
                <Col>
                  <Form.Item
                    {...resetField}
                    name={[name, 'isActive']}
                    valuePropName="checked"
                    initialValue={true}
                  >
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    {...resetField}
                    name={[name, 'english']}
                    rules={RulesEnglishField}
                  >
                    <Input
                      size="large"
                      placeholder={ENGLISH_TEXT}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    {...resetField}
                    name={[name, 'russia']}
                    rules={RulesRussiaField}
                  >
                    <Input
                      placeholder={RUSSIA_TEXT}
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Button
                    danger={true}
                    block={true}
                    onClick={() => remove(name)}
                    size="large"
                  >
                    <DeleteOutlined />
                  </Button>
                </Col>
              </Row>
            ))}
            <Row>
              <Col span={21}>
                <Button
                  onClick={() => add()}
                  type="dashed"
                  block={true}
                >
                  <PlusOutlined />
                  {ADD_BUTTON_TEXT}
                </Button>
              </Col>
            </Row>
          </Col>
        )}
      </Form.List>
      <Row>
        <Title
          level={3}
          className={styles.title}
        >
          <span className={styles.circle}>2</span>
          {MODE_TEXT}
        </Title>
      </Row>
      <Row>
        <Col>
          <Form.Item
            name="mode"
            initialValue="engToRus"
          >
            <Radio.Group defaultValue="engToRus">
              <Radio
                defaultChecked={true}
                value="engToRus"
              >
                {MODE_FIRST_TEXT}
              </Radio>
              <Radio value="rusToEng">
                {MODE_SECOND_TEXT}
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Col span={13}>
        <Row justify='center'>
          <Form.Item>
            <Button
              size="large"
              type='primary'
              htmlType='submit'
              icon={<PlayCircleOutlined />}
            >
              {START_BUTTON_TEXT}
            </Button>
          </Form.Item>
        </Row>
      </Col>
    </Form >
  )
}

export default List