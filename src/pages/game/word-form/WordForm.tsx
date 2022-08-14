import {
  Form,
  Input,
  Col,
  Row,
  Button,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import {
  RequiredText,
} from 'helpers/validateMessages'
import { nextWords, setWord } from 'services/game/game'
import { RootState } from 'services/store'
import { TRANSLATE_INPUT_TEXT } from '../constants'
import { GameForm } from 'models/game'
import { checkTranslate } from '../helpers/checkTransalate'

const WordForm = () => {
  const dispatch = useDispatch()
  const currentWord = useSelector((state: RootState) => state.game.currentWord)
  const words = useSelector((state: RootState) => state.game.words)
  const mode = useSelector((state: RootState) => state.settings.mode)

  let word = words[currentWord]?.english

  if (mode === 'rusToEng') {
    word = words[currentWord]?.russia
  }

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
    }))

    dispatch(nextWords())
  }

  const handleSkip = () => {
    const word = words[currentWord]
    dispatch(setWord({
      ...word,
      status: 'ERROR',
    }))

    dispatch(nextWords())
  }

  if (!words) {
    return null
  }

  return (
    <Row>
      <div>{word}</div>
      <Form
        onFinish={handleSubmit}
      >
        <Col>
          <Form.Item
            name="word"
            rules={[
              {
                required: true,
                message: RequiredText,
              }
            ]}
          >
            <Input placeholder={TRANSLATE_INPUT_TEXT} />
          </Form.Item>
        </Col>
        <Row gutter={[12, 12]}>
          <Col>
            <Button>
              Завершить
            </Button>
          </Col>
          <Col>
            <Button onClick={handleSkip}>
              Пропусить
            </Button>
          </Col>
          <Col>
            <Button htmlType="submit">
              Далее
            </Button>
          </Col>
        </Row>
      </Form>
    </Row>
  )
}

export default WordForm