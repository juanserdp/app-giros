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
import "./assets/styles/scroll.css";

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


          {/* TODOS LOS GIROS */}
          <Route path="/giros" element={
            <PrivatizarPorRol rolAccess="USUARIO">
              <Giros />
            </PrivatizarPorRol>} />
          {/* TODOS LOS GIROS POR USUARIO*/}
          <Route path="/giros/:usuario" element={
            <PrivatizarPorRol rolAccess="USUARIO">
              <Giros />
            </PrivatizarPorRol>} />
          {/* GIROS POR USUARIO Y POR ID DE GIRO PARA MODIFICAR */}
          <Route path="/giros/:usuario/editar/:id" element={
            <PrivatizarPorRol rolAccess="ASESOR">
              <Giros />
            </PrivatizarPorRol>} />
          {/* GIROS POR USUARIO Y POR ID DE GIRO PARA MODIFICAR */}
          <Route path="/enviar-giro" element={
            <PrivatizarPorRol rolAccess="USUARIO">
              <EnviarGiro />
            </PrivatizarPorRol>
          } />

          {/* GIROS POR USUARIO Y POR ID DE GIRO PARA MODIFICAR */}
          <Route path="/enviar-giro/:id/:valorGiro/:tasaCompra" element={
            <PrivatizarPorRol rolAccess="USUARIO">
              <EnviarGiro />
            </PrivatizarPorRol>
          } />



          {/* TODOS LOS USUARIOS */}
          <Route path="/usuarios" element={
            <PrivatizarPorRol rolAccess="ASESOR">
              <Usuarios />
            </PrivatizarPorRol>
          } />
          {/* USUARIOS POR ASESOR */}
          <Route path="/usuarios/:asesor" element={
            <PrivatizarPorRol rolAccess="ASESOR">
              <Usuarios />
            </PrivatizarPorRol>
          } />
          {/* USUARIOS POR ASESOR Y POR ID DE USUARIO PARA MODIFICAR */}
          <Route path="/usuarios/:asesor/editar/:id" element={
            <PrivatizarPorRol rolAccess="ASESOR">
              <Usuarios />
            </PrivatizarPorRol>
          } />
          {/* USUARIOS POR ASESOR Y PARA CREAR UN USUARIO POR ASESOR */}
          <Route path="/usuarios/:asesor/crear" element={
            <PrivatizarPorRol rolAccess="ASESOR">
              <Usuarios />
            </PrivatizarPorRol>
          } />



          {/* TODOS LOS ASESORES */}
          <Route path="/asesores" element={
            <PrivatizarPorRol rolAccess="ADMINISTRADOR">
              <Asesores />
            </PrivatizarPorRol>
          } />
          {/* TODOS LOS ASESORES Y CREAR UN ASESOR */}
          <Route path="/asesores/crear" element={
            <PrivatizarPorRol rolAccess="ADMINISTRADOR">
              <Asesores />
            </PrivatizarPorRol>
          } />
          {/* TODOS LOS ASESORES Y EDITAR UN ASESOR CON SU ID*/}
          <Route path="/asesores/editar/:id" element={
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
