import Container from 'react-bootstrap/Container';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from 'react-router-dom';
import { getToken } from '../util/getToken';

export function NavBar() {
    const {rol} = getToken();
    return (
        <Navbar style={{height: "60px"}} className="bg-white shadow-sm ">
            <Container>
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
                <Navbar.Brand style={{ userSelect: "none" }}>PANEL DE CONTROL</Navbar.Brand>

                <Nav className="me-auto" >
                    <Nav.Link to={"/inicio"} as={NavLink}>Inicio</Nav.Link>
                    {(rol === "USUARIO") ? <Nav.Link to={"/enviar-giro"} as={NavLink}>Enviar Giro</Nav.Link> : null}
                    <Nav.Link to={"/giros"} as={NavLink}>Giros</Nav.Link>
                    {(rol === "ASESOR" || rol === "ADMINISTRADOR") ? <Nav.Link to={"/usuarios"} as={NavLink}>Usuarios</Nav.Link> : null}
                    {(rol === "ADMINISTRADOR") ? <Nav.Link to={"/asesores"} as={NavLink}>Asesores</Nav.Link> : null}
                    <Nav.Link to={"/cuenta"} as={NavLink}>Cuenta</Nav.Link>
                    <Nav.Link to={"/"} as={NavLink} onClick={() => {
                        localStorage.removeItem("jwt");
                    }}>Salir</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}