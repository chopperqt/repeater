import { useMemo } from 'react'
import {
  Form,
  Input,
  Button,
  Col,
  Row,
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
  ADD_BUTTON_TEXT,
  START_BUTTON_TEXT,
} from 'language/ru'
import {
  RulesRussiaField,
  RulesEnglishField,
} from './constants'

import {
  WordsForm,
  WordsValues,
} from 'models/main'
import { useDispatch, useSelector } from 'react-redux'
import { nextStep, setSettings } from 'services/settings/settings'

import styles from './WordsList.module.scss'
import { RootState } from 'services/store'
import { useEffect } from 'react'

const defaultValue = {
  words: [],
}

const List = () => {
  const dispatch = useDispatch()
  const values = localStorage.getItem('settings')
  const words = useSelector((state: RootState) => state.settings.words)
    .filter(Boolean)
    .length
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

    dispatch(setSettings(allValues))

    localStorage.setItem('settings', valuesToJSON)
  }

  const handleFinish = (values: WordsForm) => {
    const valuesToJSON = JSON.stringify(values)

    dispatch(setSettings(values))

    localStorage.setItem('settings', valuesToJSON)
  }

  const handleClickNext = () => {
    dispatch(nextStep())
  }

  const hasDisabled = useMemo(() => {
    if (!words) {
      return true
    }

    return false
  }, [words])

  useEffect(() => {
    dispatch(setSettings(formValueFromStorage))
  }, [])

  return (
    <Row
      justify='center'
      align='middle'
      className={styles.layout}
    >
      <Col span={24}>
        <Form
          onValuesChange={handleChange}
          initialValues={formValueFromStorage}
          onFinish={handleFinish}
        >
          <Form.List name="words">
            {(fields, { add, remove }) => (
              <Col span={24}>
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
                    <Col
                      span={9}
                      lg={9}
                    >
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
                    <Col span={9}>
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
                  <Col span={23}>
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
        </Form >
        <Col span={24}>
          <Row justify='center'>
            <Form.Item>
              <Button
                onClick={handleClickNext}
                size="large"
                type='primary'
                className={styles.button}
                disabled={hasDisabled}
                icon={<PlayCircleOutlined />}
              >
                {START_BUTTON_TEXT}
              </Button>
            </Form.Item>
          </Row>
        </Col>

      </Col>
    </Row>
  )
}

export default List