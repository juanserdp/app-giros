import React from "react";
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
import { SesionProvider } from "./providers/SesionProvider";
import { NavigationBar } from "./components/NavigationBar";
import { OBTENER_USUARIOS } from "./services/apollo/gql/usuario/obtenerUsuarios";
import { OBTENER_USUARIOS_POR_ID_ASESOR } from "./services/apollo/gql/usuario/obtenerUsuarioPorIdAsesor";
import { OBTENER_GIROS } from "./services/apollo/gql/giro/obtenerGiros";
import { OBTENER_GIROS_POR_ID_USUARIO } from "./services/apollo/gql/giro/obtenerGirosPorIdUsuario";
import { OBTENER_GIROS_POR_USUARIOS_POR_ID_ASESOR } from "./services/apollo/gql/giro/obtenerGirosPorUsuariosPorIdAsesor";

export const context = React.createContext();

export function App() {

  return (
    <SesionProvider>
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
                <NavigationBar />
                <Inicio />
              </PrivatizarPorRol>
            }
          />
          {/* TODOS LOS GIROS */}
          <Route
            path="/giros"
            element={
              <PrivatizarPorRol rolAccess="OPERARIO">
                <NavigationBar />
                <Giros
                consulta={OBTENER_GIROS} />
              </PrivatizarPorRol>
            }
          />

          {/* TODOS LOS GIROS POR USUARIO*/}
          <Route
            path="/giros/usuario/:usuario"
            element={
              <PrivatizarPorRol rolAccess="USUARIO">
                <NavigationBar />
                <Giros
                  consulta={OBTENER_GIROS_POR_ID_USUARIO} />
              </PrivatizarPorRol>
            }
          />

          {/* GIROS POR USUARIO Y POR ID DE GIRO PARA MODIFICAR */}
          <Route
            path="/enviar-giro"
            element={
              <PrivatizarPorRol rolAccess="USUARIO">
                <NavigationBar />
                <EnviarGiro />
              </PrivatizarPorRol>
            }
          />

          {/* GIROS POR USUARIO Y POR ID DE GIRO PARA MODIFICAR */}
          <Route
            path="/enviar-giro/:valorGiro"
            element={
              <PrivatizarPorRol rolAccess="USUARIO">
                <NavigationBar />
                <EnviarGiro />
              </PrivatizarPorRol>
            }
          />

          <Route
            path="/cuenta"
            element={
              <PrivatizarPorRol rolAccess="USUARIO">
                <NavigationBar />
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
                <NavigationBar />
                <Giros
                  consulta={OBTENER_GIROS_POR_USUARIOS_POR_ID_ASESOR} />
              </PrivatizarPorRol>
            }
          />

          {/* USUARIOS POR ASESOR */}
          <Route
            path="/usuarios/:asesor"
            element={
              <PrivatizarPorRol rolAccess="ASESOR">
                <NavigationBar />
                <Usuarios
                  consulta={OBTENER_USUARIOS_POR_ID_ASESOR} />
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
                <NavigationBar />
                <Usuarios
                  consulta={OBTENER_USUARIOS} />
              </PrivatizarPorRol>
            }
          />

          {/* TODOS LOS ASESORES */}
          <Route
            path="/asesores"
            element={
              <PrivatizarPorRol rolAccess="ADMINISTRADOR">
                <NavigationBar />
                <Asesores />
              </PrivatizarPorRol>
            } />

          <Route
            path="/configuracion"
            element={
              <PrivatizarPorRol rolAccess="ADMINISTRADOR">
                <NavigationBar />
                <Configuracion />
              </PrivatizarPorRol>
            }
          />

          <Route
            path="/*"
            element={
              <div>
                <h1>Pagina no encontrada</h1>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </SesionProvider>
  );
}

export default App;