
import {
  Steps,
  Row,
  Col,
} from 'antd';

import './App.scss'

import Game from 'pages/game';
import { useSelector } from 'react-redux';
import { RootState } from 'services/store';
import {
  Mode,
  WordsList,
} from 'pages';

const { Step } = Steps

const steps = [
  {
    title: 'Список слов',
    content: <WordsList />
  },
  {
    title: 'Мод',
    content: <Mode />
  },
  {
    title: 'Проверка',
    content: <Game />,
  },
  {
    title: 'Результат',
    content: <>Резульатт</>
  }
]

function App() {
  const currentStep = useSelector((state: RootState) => state.settings.step)

  return (
    <div className="App">
      <Row
        justify='center'
        align='middle'
      >
        <Col>
          <div className="container">
            {steps[currentStep].content}
          </div>
          <div className="container">
            <div className='steps'>
              <Steps>
                {steps.map(({ title }) => (
                  <Step
                    key={title}
                    title={title}
                  />
                ))}
              </Steps>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
