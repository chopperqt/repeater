import {
  Form,
  Input,
  Col,
  Row,
  Button,
} from 'antd'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import {
  FastForwardOutlined,
  StepForwardOutlined,
  CloseOutlined,
} from '@ant-design/icons'

import {
  RequiredText,
} from 'helpers/validateMessages'
import { nextWords, setWord } from 'services/game/game'
import { RootState } from 'services/store'
import {
  END_TEXT,
  NEXT_TEXT,
  SKIP_TEXT,
  TRANSLATE_INPUT_TEXT,
  TRANSLATE_TEXT,
} from 'language/ru'
import { GameForm } from 'models/game'
import { checkTranslate } from '../helpers/checkTransalate'

import styles from './WordForm.module.scss'
import normalizeWord from 'helpers/normalizeWord'

const WordForm = () => {
  const dispatch = useDispatch()
  const currentWord = useSelector((state: RootState) => state.game.currentWord)
  const words = useSelector((state: RootState) => state.game.words)
  const mode = useSelector((state: RootState) => state.settings.mode)
  const [form] = Form.useForm()

  let word = words[currentWord]?.english

  if (mode === 'rusToEng') {
    word = words[currentWord]?.russia
  }

  const normalizedWord = normalizeWord(word)

  const handleSubmit = (value: GameForm) => {
    const {
      russia,
      english,
    } = words[currentWord]
    let word = russia

    if (mode === 'rusToEng') {
      word = english
    }

    const status = checkTranslate(word, value.word)

    dispatch(setWord({
      ...words[currentWord],
      status,
      enteredWord: value.word,
    }))

    form.resetFields()

    dispatch(nextWords())
  }

  const handleSkip = () => {
    const word = words[currentWord]
    dispatch(setWord({
      ...word,
      status: 'ERROR',
    }))

    form.resetFields()

    dispatch(nextWords())
  }

  if (!words) {
    return null
  }

  return (
    <Col span={24}>
      <Row>
        <div className={styles.text}>
          {TRANSLATE_TEXT}&nbsp;
          <span className={styles.word}>
            {normalizedWord}
          </span>
        </div>
      </Row>
      <Col className={styles.form}>
        <Form
          form={form}
          onFinish={handleSubmit}
        >
          <Col span={24}>
            <Form.Item
              name="word"
              rules={[
                {
                  required: true,
                  message: RequiredText,
                }
              ]}
            >
              <Input
                placeholder={TRANSLATE_INPUT_TEXT}
                size="large"
              />
            </Form.Item>
          </Col>
          <Row
            gutter={[12, 12]}
            justify="center"
          >
            <Col>
              <Button
                danger={true}
                type="primary"
                size="large"
                icon={<CloseOutlined />}
              >
                {END_TEXT}
              </Button>
            </Col>
            <Col>
              <Button
                onClick={handleSkip}
                size="large"
                icon={<FastForwardOutlined />}
              >
                {SKIP_TEXT}
              </Button>
            </Col>
            <Col>
              <Button
                icon={<StepForwardOutlined />}
                htmlType="submit"
                size="large"
                type="primary"
              >
                {NEXT_TEXT}
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Col>
  )
}

export default WordForm