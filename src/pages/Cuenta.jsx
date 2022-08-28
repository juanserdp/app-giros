import { useQuery } from "@apollo/client";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { NavBar } from "../components/NavBar";
import { useCargarDataForm } from "../hooks/useCargarDataForm";
import { OBTENER_ASESOR_POR_ID } from "../services/apollo/gql/asesor/obtenerAsesorPorId";
import { OBTENER_USUARIO_POR_ID } from "../services/apollo/gql/usuario/obtenerUsuarioPorId";
import { Sesion } from "../util/Sesion";
import { Metricas } from "../components/Metricas";
export default function Cuenta() {
    const sesion = new Sesion();
    const id = sesion.getUid();
    const rol = sesion.getRol();
    const { loading, data, error, refetch } = useQuery((rol === "USUARIO") ? OBTENER_USUARIO_POR_ID : OBTENER_ASESOR_POR_ID, { variables: { id } });

    const [validated, setValidated] = useState(false);
    const initialState = {
        nombres: "",
        apellidos: "",
        tipoDocumento: "",
        numeroDocumento: "",
        clave: "",
        saldo: "",
        deuda: "",
        capacidadPrestamo: "",
        estado: "",
        usuarios: []
    };
    const [form, setForm] = useCargarDataForm(initialState, data);
    const handleInputChange = (event, name) => {
        setForm({ ...form, [name]: event.target.value });
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (id) {
            alert();
        }
    };
    const nombreUsuario = () => {
        switch (rol) {
            case "USUARIO":
                return (
                    <h5>Usuario:</h5>
                );
            case "ASESOR":
                return (
                    <h5>Asesor:</h5>
                );
            case "ADMINISTRADOR":
                return (
                    <h5>Administrador:</h5>
                );
            default:
                return "";
        }
    }
    if (error) return (
        `Error! ${error}`
    );
    return (
        <>
            <NavBar />
            <Container className="my-3" >
                <Row className="mb-3">
                    <Col md="3" className="" >
                        <Row className="my-3 justify-content-center">
                            <Avatar style={{ width: "150px", height: "150px", borderRadius: "100%" }}>{
                                (form.apellidos) ? (form.nombres["0"].toUpperCase() + form.apellidos["0"].toUpperCase()) : ""
                            }</Avatar>
                        </Row>
                        <Row className="mb-3 text-center">
                            {nombreUsuario()}
                        </Row>
                        <Row className="mb-3 text-center">
                            <p>{(form.apellidos) ? (form.nombres + " " + form.apellidos) : ""}</p>
                        </Row>
                        <Row className="mb-3 text-center">
                            <h5>Metricas:</h5>
                        </Row>
                            <Metricas
                            form={form}
                            rol={rol}
                            />
                        
                    </Col>
                    <Col md="9">
                        <Form style={{ border: "2px solid gray" }} noValidate validated={validated} onSubmit={handleSubmit} >
                            <Row className="m-3">
                                <Form.Group as={Col} md="6" controlId="validationNombres">
                                    <Form.Label>Nombres</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Edite su nombre..."
                                        value={form.nombres}
                                        onChange={(e) => handleInputChange(e, "nombres")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Este campo es obligatorio
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationNombres">
                                    <Form.Label>Apellidos</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Edite su apellido..."
                                        value={form.apellidos}
                                        onChange={(e) => handleInputChange(e, "apellidos")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Este campo es obligatorio
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="m-3">
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Tipo de Documento</Form.Label>
                                    <Form.Select
                                        required
                                        value={form.tipoDocumento}
                                        onChange={(e) => handleInputChange(e, "tipoDocumento")}
                                    >
                                        <option value="">Edite su tipo de documento</option>
                                        <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                                        <option value="Cedula de Ciudadania">Cédula de Ciudadanía</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Este campo es obligatorio
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Numero de Documento</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Edite su apellido..."
                                        value={form.numeroDocumento}
                                        onChange={(e) => handleInputChange(e, "numeroDocumento")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Este campo es obligatorio
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="m-3">
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Edite su clave..."
                                        value={form.clave}
                                        onChange={(e) => handleInputChange(e, "clave")}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Capacidad de Prestamo</Form.Label>
                                    <Form.Control
                                        required
                                        disabled={true}
                                        type="text"
                                        value={form.capacidadPrestamo}
                                    />
                                </Form.Group>

                            </Row>
                            {/* <Row className="m-3">
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Saldo</Form.Label>
                                    <Form.Control
                                        disabled={true}
                                        required
                                        type="number"
                                        value={form.saldo}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Deuda</Form.Label>
                                    <Form.Control
                                        required
                                        disabled={true}
                                        type="number"
                                        value={form.deuda}
                                    />
                                </Form.Group>
                            </Row> */}
                            <Row className="m-3">
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Select
                                        required
                                        type="text"
                                        disabled={true}
                                        value={form.estado}
                                    >
                                        <option value="">Elige el estado...</option>
                                        <option value="ACTIVO" >ACTIVO</option>
                                        <option value="INACTIVO">INACTIVO</option>
                                    </Form.Select>
                                </Form.Group >

                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}