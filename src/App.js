import { Routes, Route, BrowserRouter } from "react-router-dom";
import Asesores from "./pages/Asesores";
import Cuenta from "./pages/Cuenta";
import EnviarGiro from "./pages/EnviarGiro";
import Giros from "./pages/Giros";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Usuarios from "./pages/Usuarios";
import { PrivatizarPorRol } from "./routes/PrivatizarPorRol";
import "./assets/styles/fonts.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={
            <PrivatizarPorRol rolAccess="USUARIO">
              <Inicio />
            </PrivatizarPorRol>} />
          <Route path="/enviar-giro" element={
            <PrivatizarPorRol rolAccess="USUARIO">
              <EnviarGiro />
            </PrivatizarPorRol>
          } />
          <Route path="/giros" element={
            <PrivatizarPorRol rolAccess="USUARIO">
              <Giros />
            </PrivatizarPorRol>} />
            <Route path="/giros/:id" element={
            <PrivatizarPorRol rolAccess="USUARIO">
              <Giros />
            </PrivatizarPorRol>} />
          <Route path="/usuarios/:id" element={
            <PrivatizarPorRol rolAccess="ASESOR">
              <Usuarios />
            </PrivatizarPorRol>
          } />
          <Route path="/usuarios" element={
            <PrivatizarPorRol rolAccess="ASESOR">
              <Usuarios />
            </PrivatizarPorRol>
          } />
          <Route path="/asesores" element={
            <PrivatizarPorRol rolAccess="ADMINISTRADOR">
              <Asesores />
            </PrivatizarPorRol>
          } />
          <Route path="/asesores/:id" element={
            <PrivatizarPorRol rolAccess="ADMINISTRADOR">
              <Asesores />
            </PrivatizarPorRol>
          } />
          <Route path="/cuenta" element={
            <PrivatizarPorRol rolAccess="USUARIO">
              <Cuenta />
            </PrivatizarPorRol>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
