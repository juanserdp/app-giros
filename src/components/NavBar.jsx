import Container from 'react-bootstrap/Container';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from 'react-router-dom';

export function NavBar() {
    return (
        <Navbar sticky="top" className="bg-white shadow-sm mb-3">
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

                <Nav className="me-auto">
                    <Nav.Link to={"/inicio"} as={NavLink}>Inicio</Nav.Link>
                    <Nav.Link to={"/enviar-giro"} as={NavLink}>Enviar Giro</Nav.Link>
                    <Nav.Link to={"/reportes"} as={NavLink}>Reportes</Nav.Link>

                    <Nav.Link to={"/usuarios"} as={NavLink}>Usuarios</Nav.Link>
                    <Nav.Link to={"/asesores"} as={NavLink}>Asesores</Nav.Link>
                    <Nav.Link to={"/giros"} as={NavLink}>Giros</Nav.Link>

                    <Nav.Link to={"/"} as={NavLink}>Salir</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}