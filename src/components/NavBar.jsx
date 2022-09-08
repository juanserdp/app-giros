import { Offcanvas } from 'react-bootstrap';
// REACT BOOTSTRAP
import Container from 'react-bootstrap/Container';
// MATERIAL UI ICONS
import GroupIcon from '@mui/icons-material/Group';
import ReplyIcon from '@mui/icons-material/Reply';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import SettingsIcon from '@mui/icons-material/Settings';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { NavLink } from 'react-router-dom';
import { Sesion } from '../util/Sesion';
import "../assets/styles/navbar.css";
export function NavBar() {
    const sesion = new Sesion();
    const rol = sesion.getRol();
    const id = sesion.getUid();
    return (
        <Navbar expand="lg" style={{ height: "60px" }} className="bg-white shadow-sm navbar-giros">
            <Container fluid>
                {/* <Nav.Link
                    id="menu-bar-icon"
                    style={{padding:"0px 20px 0px 0px"}}
                    onClick={handleOpenMenu}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            style={{ fill: "rgba(255,255, 255, 1)" }}><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
                    </Nav.Link> */}
                <Navbar.Brand style={{ userSelect: "none" }}>GIROS APP</Navbar.Brand>

                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-lg`} // DALE UN WIDTH!
                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                    placement="end">
                    <Offcanvas.Header closeButton>
                        
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                            GIROS APP
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>

                        <Nav className="me-auto" >
                    

                            <Nav.Link to={"/inicio"} as={NavLink}><HomeIcon />&nbsp;Inicio</Nav.Link>

                            {(rol === "USUARIO") ? <Nav.Link to={"/enviar-giro"} as={NavLink}>&nbsp;Enviar Giro</Nav.Link> : null}

                            
                            <Nav.Link to={(rol === "ASESOR" || rol === "ADMINISTRADOR")?"/giros":`/giros/${id}`} as={NavLink}><ReplyIcon />&nbsp;Giros</Nav.Link>

                            {(rol === "ASESOR") ? <Nav.Link to={`/usuarios/${id}`} as={NavLink}><GroupIcon />&nbsp;Usuarios</Nav.Link> : null}

                            {(rol === "ADMINISTRADOR") ? <Nav.Link to={"/usuarios"} as={NavLink}><GroupIcon />&nbsp;Usuarios</Nav.Link> : null}

                            {(rol === "ADMINISTRADOR") ? <Nav.Link to={"/asesores"} as={NavLink}><SupervisorAccountIcon />&nbsp;Asesores</Nav.Link> : null}

                            {(rol === "ADMINISTRADOR") ? <Nav.Link to={"/configuracion"} as={NavLink}><SettingsIcon />&nbsp;Configuracion</Nav.Link> : null}

                            {(rol === "ASESOR" || rol === "USUARIO") ? <Nav.Link to={"/cuenta"} as={NavLink}><ManageAccountsIcon />&nbsp;Cuenta</Nav.Link> : null}

                            <Nav.Link to={"/"} as={NavLink} onClick={() => {
                                sesion.cerrarSesion();
                            }}><ExitToAppIcon />&nbsp;Salir</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}