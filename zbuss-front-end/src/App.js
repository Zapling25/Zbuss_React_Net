import { useState, useEffect } from "react";
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import ListarUsuarios from './components/ListarUsuarios';
import ListarBuses from "./components/ListarBuses";
import ListarAsientos from "./components/ListarAsientos";
import Navbar from "./navegacion/Navbar";

function App() {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : "";
  });

  useEffect(() => {
    // Almacena el usuario en el almacenamiento local cada vez que cambia
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const PrivateRoute = ({ component: Component, }) => {
    return (
      <>{ user ? Component : <Navigate to="/login" /> }</>
    );
  };

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Inicio></Inicio>}></Route>
        <Route path="/login" element={<Login setUser={setUser} ></Login>}></Route>
        <Route path="/bus" element={<PrivateRoute component={<ListarBuses />}></PrivateRoute>}></Route>
        <Route path="/usuario" element={<PrivateRoute component={<ListarUsuarios />}></PrivateRoute>}></Route>
        <Route path="/asientos/:id" element={<PrivateRoute component={<ListarAsientos />}></PrivateRoute>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
