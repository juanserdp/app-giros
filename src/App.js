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
import { Configuracion } from "./pages/Configuracion";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*
          ///////////////////
          /////USUARIOS////// 
          ///////////////////
           */}
          <Route path="/" element={<Login />} />
          <Route
            path="/inicio"
            element={
              <PrivatizarPorRol rolAccess="USUARIO">
                <Inicio />
              </PrivatizarPorRol>
            }
          />
          {/* TODOS LOS GIROS */}
          <Route
            path="/giros"
            element={
              <PrivatizarPorRol rolAccess="OPERARIO">
                <Giros />
              </PrivatizarPorRol>
            }
          />
          {/* TODOS LOS GIROS POR USUARIO*/}
          <Route
            path="/giros/usuario/:usuario"
            element={
              <PrivatizarPorRol rolAccess="USUARIO">
                <Giros />
              </PrivatizarPorRol>
            }
          />

          {/* GIROS POR USUARIO Y POR ID DE GIRO PARA MODIFICAR */}
          <Route
            path="/enviar-giro"
            element={
              <PrivatizarPorRol rolAccess="USUARIO">
                <EnviarGiro />
              </PrivatizarPorRol>
            }
          />

          {/* GIROS POR USUARIO Y POR ID DE GIRO PARA MODIFICAR */}
          <Route
            path="/enviar-giro/:id/:valorGiro"
            element={
              <PrivatizarPorRol rolAccess="USUARIO">
                <EnviarGiro />
              </PrivatizarPorRol>
            }
          />
          <Route
            path="/cuenta"
            element={
              <PrivatizarPorRol rolAccess="USUARIO">
                <Cuenta />
              </PrivatizarPorRol>
            }
          />
          {/*
          ///////////////////
          /////ASESORES////// 
          ///////////////////
           */}
          {/* TODOS LOS GIROS POR ASESOR*/}
          <Route
            path="/giros/asesor/:asesor"
            element={
              <PrivatizarPorRol rolAccess="OPERARIO">
                <Giros />
              </PrivatizarPorRol>
            }
          />
          {/* GIROS POR USUARIO Y POR ID DE GIRO PARA MODIFICAR */}
          <Route
            path="/giros/usuario/:usuario/editar/:id"
            element={
              <PrivatizarPorRol rolAccess="USUARIO">
                <Giros />
              </PrivatizarPorRol>
            }
          />
          {/* USUARIOS POR ASESOR */}
          <Route
            path="/usuarios/:asesor"
            element={
              <PrivatizarPorRol rolAccess="ASESOR">
                <Usuarios />
              </PrivatizarPorRol>
            }
          />
          {/* USUARIOS POR ASESOR Y POR ID DE USUARIO PARA MODIFICAR */}
          <Route
            path="/usuarios/:asesor/editar/:id"
            element={
              <PrivatizarPorRol rolAccess="ASESOR">
                <Usuarios />
              </PrivatizarPorRol>
            }
          />
          {/* USUARIOS POR ASESOR Y PARA CREAR UN USUARIO POR ASESOR */}
          <Route
            path="/usuarios/:asesor/crear"
            element={
              <PrivatizarPorRol rolAccess="ASESOR">
                <Usuarios />
              </PrivatizarPorRol>
            }
          />
          {/*
          ///////////////////
          //ADMINISTRADORES// 
          ///////////////////
           */}

          {/* TODOS LOS USUARIOS */}
          <Route
            path="/usuarios"
            element={
              <PrivatizarPorRol rolAccess="ADMINISTRADOR">
                <Usuarios />
              </PrivatizarPorRol>
            }
          />
          {/* TODOS LOS ASESORES */}
          <Route
            path="/asesores"
            element={
              <PrivatizarPorRol rolAccess="ADMINISTRADOR">
                <Asesores />
              </PrivatizarPorRol>
            }
          />
          {/* TODOS LOS ASESORES Y CREAR UN ASESOR */}
          <Route
            path="/asesores/crear"
            element={
              <PrivatizarPorRol rolAccess="ADMINISTRADOR">
                <Asesores />
              </PrivatizarPorRol>
            }
          />
          {/* TODOS LOS ASESORES Y EDITAR UN ASESOR CON SU ID*/}
          <Route
            path="/asesores/editar/:id"
            element={
              <PrivatizarPorRol rolAccess="ADMINISTRADOR">
                <Asesores />
              </PrivatizarPorRol>
            }
          />
          <Route
            path="/configuracion"
            element={
              <PrivatizarPorRol rolAccess="ADMINISTRADOR">
                <Configuracion />
              </PrivatizarPorRol>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;