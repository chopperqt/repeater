
import {
  Routes,
  Route
} from 'react-router-dom'

import Game from 'pages/game';
import Main from "./pages/main";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path='/'
          element={<Main />}
        />
        <Route
          path='/game'
          element={<Game />}
        />
      </Routes>
    </div>
  );
}

export default App;
