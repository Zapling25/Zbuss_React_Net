import {Routes, Route, BrowserRouter} from "react-router-dom";
import ListarUsuarios from './components/ListarUsuarios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListarUsuarios></ListarUsuarios>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
