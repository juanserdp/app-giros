import { Routes, Route, BrowserRouter } from "react-router-dom";
import Asesores from "./pages/Asesores";
import EnviarGiro from "./pages/EnviarGiro";
import Giros from "./pages/Giros";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Reportes from "./pages/Reportes";
import Usuarios from "./pages/Usuarios";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/enviar-giro" element={<EnviarGiro />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/asesores" element={<Asesores />} />
          <Route path="/giros" element={<Giros />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
