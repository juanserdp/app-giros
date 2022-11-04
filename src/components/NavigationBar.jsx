import React, { useEffect, useState } from "react";
// STYLES

import "../assets/styles/navbar.css";
// ICONS
import GroupIcon from "@mui/icons-material/Group";
import ReplyIcon from "@mui/icons-material/Reply";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// COMPONENTES
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// HOOKS
import { NavLink, useNavigate } from "react-router-dom";
// UTIL
import { Sesion } from "../util/Sesion";
// ASSETS
import logotipo from "../assets/images/logotipo_navbar.jpg";
import { NOMBRE_EMPRESA } from "../assets/constants/empresa";
import { useSesionContext } from "../providers/SesionProvider";


export function NavigationBar() {
  // INSTANCIAS
  const navigate = useNavigate();

  // CONSTANTES
  const imgStyle = {
    width: "100px",
    height: "45px",
  };

  // HOOKS
  const {
    sesionData: { id, rol },
    borrarCredenciales
  } = useSesionContext();

  return (
    <Navbar
      expand="lg"
      style={{ height: "60px" }}
      className="bg-white shadow-sm navbar-giros">
      <Container fluid>
        <Nav.Link
          id="menu-bar-icon"
          style={{ padding: "0px 20px 0px 0px" }}
          onClick={() => navigate("/inicio")}>
          <img
            alt="logotipo"
            style={imgStyle}
            src={logotipo} />
        </Nav.Link>
        <Navbar.Brand style={{ userSelect: "none" }}>{NOMBRE_EMPRESA}</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />

        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="end">

          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
              GIROS APP
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="me-auto">


              <Nav.Link
                to={"/inicio"}
                as={NavLink}>
                <HomeIcon />
                &nbsp;Inicio
              </Nav.Link>


              {rol === "USUARIO" ? (
                <Nav.Link
                  to={"/enviar-giro"}
                  as={NavLink}>
                  <ReplyIcon />
                  &nbsp;Enviar Giro
                </Nav.Link>
              ) : null}


              <Nav.Link
                to={rol === "ADMINISTRADOR" ?
                  "/giros" :
                  rol === "ASESOR" ?
                    `/giros/asesor/${id}` :
                    rol === "USUARIO" ?
                      `/giros/usuario/${id}` :
                      "/giros"}
                as={NavLink}>
                <ReplyIcon />
                &nbsp;Giros
              </Nav.Link>


              {rol === "ASESOR" ? (
                <Nav.Link to={`/usuarios/${id}`} as={NavLink}>
                  <GroupIcon />
                  &nbsp;Usuarios
                </Nav.Link>
              ) : null}


              {rol === "ADMINISTRADOR" ? (
                <React.Fragment>
                  <Nav.Link
                    to={"/usuarios"}
                    as={NavLink}>
                    <GroupIcon />
                    &nbsp;Usuarios
                  </Nav.Link>
                  <Nav.Link
                    to={"/asesores"}
                    as={NavLink}>
                    <SupervisorAccountIcon />
                    &nbsp;Asesores
                  </Nav.Link>
                  <Nav.Link
                    to={"/configuracion"}
                    as={NavLink}>
                    <SettingsIcon />
                    &nbsp;Configuracion
                  </Nav.Link>
                </React.Fragment>
              ) : null}


              {rol === "ASESOR" || rol === "USUARIO" ? (
                <Nav.Link
                  to={"/cuenta"}
                  as={NavLink}>
                  <ManageAccountsIcon />
                  &nbsp;Cuenta
                </Nav.Link>
              ) : null}


              <Nav.Link
                to={"/"}
                as={NavLink}
                onClick={() => {
                  Sesion.cerrarSesion();
                  borrarCredenciales();
                }}>
                <ExitToAppIcon />
                &nbsp;Salir
              </Nav.Link>


            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
