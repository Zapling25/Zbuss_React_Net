import {Routes, Route, BrowserRouter} from "react-router-dom";
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import ListarUsuarios from './components/ListarUsuarios';
import ListarBuses from "./components/ListarBuses";
import Navbar from "./navegacion/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio></Inicio>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/bus" element={<ListarBuses></ListarBuses>}></Route>
        <Route path="/usuario" element={<ListarUsuarios></ListarUsuarios>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
