import { useState } from "react";
import { Button, Carousel, Col, Container, Form, Row } from "react-bootstrap";
import { NavBar } from "../components/NavBar";
import { currencyFormatter } from "../util/currencyFormatter";
import { modificarInputValue } from "../util/modificarInputValue";
import { parseNumberFormatToNumber } from "../util/parseNumberFormatToNumber";
import { buzon } from "../assets/constants/buzon";
import { Buzon } from "../components/Buzon";
import { CardActions, CardContent, CardMedia, Typography, Card } from "@mui/material";
import "../assets/styles/inicio.css";
import { Sesion } from "../util/Sesion";
import { isNullableType } from "graphql";
import { OBTENER_ASESOR_POR_ID } from "../services/apollo/gql/asesor/obtenerAsesorPorId";
import { OBTENER_USUARIO_POR_ID } from "../services/apollo/gql/usuario/obtenerUsuarioPorId";
import { useQuery } from '@apollo/client';
import FormRange from "react-bootstrap/esm/FormRange";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { validarCamposNotNull } from "../util/validarCamposNotNull";
export default function Inicio() {
    const navigate = useNavigate();
    const sesion = new Sesion();
    const rol = sesion.getRol();
    const id = sesion.getUid();

    const queryPorRol = (id) => {
        switch (id) {
            case "ADMINISTRADOR":
                break;
            case "ASESOR":
                return OBTENER_ASESOR_POR_ID;
            case "USUARIO":
                return OBTENER_USUARIO_POR_ID;
            default:
                break;
        }
    };

    const { loading, data, error, refetch } = useQuery(OBTENER_USUARIO_POR_ID, {
        variables: { id }
    });
    const [validated, setValidated] = useState(false);
    const initialState = {
        valorGiro: ""
    }
    const [form, setForm] = useState(initialState);

    const handleInputChange = (event, name) => {
        setForm({ ...form, [name]: event.target.value });
    }

    const handleEnviar = (event) => {
        const formReactBoot = event.currentTarget;
        if (formReactBoot.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        if (validarCamposNotNull(form)) {
            if (form.valorGiro < 1000) swal("Error!", "No puede hacer un giro con ese valor!", "error");
            else navigate(`/enviar-giro/${id}/${form.valorGiro}/${0.02}`);
        }
        else swal("Error!", "Todos los campos son obligatorios!", "error");

    }
    if (error) return (
        `Error! ${error}`
    );
    return (
        <>
            <NavBar />
            <Container className="my-4" style={{ textAlign: "center" }}>

                <Row className="mb-3">
                    <Col md="12">
                        <Buzon />
                    </Col>
                </Row>


                <Row className="mb-3">
                    <Col md="12">
                        <Card className="card-container-inicio" style={{ borderRadius: "50px 50px 50px 5px" }}>
                            <CardContent>
                                <h2 className="mb-4" style={{ fontWeight: "700", fontSize: "1.5rem", fontStyle: "'Roboto Condensed', sans-serif" }} >
                                    ENVIAR GIRO
                                </h2>
                                <Row as={Form} className="mb-3" noValidate validated={validated} onSubmit={handleEnviar} >
                                    <Form.Group as={Col} md="6" controlId="validationSaldo">
                                        <Form.Label>Dinero a Enviar</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Ingrese el saldo"
                                            onChange={(e) => {
                                                handleInputChange({
                                                    target: {
                                                        value: modificarInputValue(e.target.value)
                                                    }
                                                }, "valorGiro");
                                            }}
                                            value={(form.valorGiro) ? currencyFormatter.format(form.valorGiro) : ""}
                                        // disabled={isNotAllowedChangeInput}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es obligatorio
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationSaldo">
                                        <Form.Label>Dinero en Bolivares</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Ingrese el saldo"
                                            value={178}
                                            disabled={true}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es obligatorio
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                                    </Form.Group>

                                </Row>
                                <Row className="mb-3">
                                    <Col md="12">
                                        <Button onClick={handleEnviar}>Enviar</Button>
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>




                <Row className="mb-3">
                    <Col md="4">
                        <Card className="card-container-tasa" style={{ borderRadius: "50px 5px 5px 5px" }}>
                            <CardContent>
                                <h2 className="mb-4" style={{ color: "white", fontWeight: "700", fontSize: "1.5rem", fontStyle: "'Roboto Condensed', sans-serif" }} >
                                    TASA DE COMPRA
                                </h2>
                                <h3 style={{ color: "white", fontWeight: "700", fontSize: "3rem", fontStyle: "'Roboto Condensed', sans-serif" }} >
                                    {(!loading) ? (data.obtenerUsuarioPorId.asesor.tasaVenta || "0.00") : "0.00"}
                                </h3>
                            </CardContent>
                            {
                                (rol === "ASESOR") ?
                                    <Button className="mb-3">Editar</Button> :
                                    null
                            }
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card className="card-container-saldo" style={{ borderRadius: "5px 5px 5px 5px" }}>
                            <CardContent>
                                <h2 className="mb-4" style={{ color: "white", fontWeight: "700", fontSize: "1.5rem", fontStyle: "'Roboto Condensed', sans-serif" }}>
                                    SALDO
                                </h2>
                                <h3 style={{ color: "white", fontWeight: "700", fontSize: "3rem", fontStyle: "'Roboto Condensed', sans-serif" }} >
                                    {(!loading) ? (currencyFormatter.format(data.obtenerUsuarioPorId.saldo)) : "$0.00"}
                                </h3>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card className="card-container-deuda" style={{ borderRadius: "5px 50px 50px 5px" }}>
                            <CardContent>
                                <h2 className="mb-4" style={{ color: "white", fontWeight: "700", fontSize: "1.5rem", fontStyle: "'Roboto Condensed', sans-serif" }} >
                                    DEUDA
                                </h2>
                                <h3 style={{ color: "white", fontWeight: "700", fontSize: "3rem", fontStyle: "'Roboto Condensed', sans-serif" }} >
                                    {(!loading) ? (currencyFormatter.format(data.obtenerUsuarioPorId.deuda)) : "$0.00"}
                                </h3>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>


            </Container>

        </>
    );
}