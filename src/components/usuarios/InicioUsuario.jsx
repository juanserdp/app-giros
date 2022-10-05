import { useEffect, useState } from "react";
import { Accordion, Button, Col, Container, Form, Row } from "react-bootstrap";
import { currencyFormatter } from "../../util/currencyFormatter";
import { modificarInputValue } from "../../util/modificarInputValue";
import { Buzon } from "../Buzon";
import { CardContent, Card, Backdrop, CircularProgress } from "@mui/material";
import { Sesion } from "../../util/Sesion";
import { OBTENER_USUARIO_POR_ID } from "../../services/apollo/gql/usuario/obtenerUsuarioPorId";
import { useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { validarCamposNotNull } from "../../util/validarCamposNotNull";
import { OBTENER_BUZON } from "../../services/apollo/gql/buzon/obtenerBuzon";
import { useCargarDataForm } from "../../hooks/useCargarDataForm";
import { Deuda } from "../Deuda";
import { Saldo } from "../Saldo";
import { TasaVenta } from "../asesores/TasaVenta";

const textStyleH2 = {
    fontWeight: "500",
    fontSize: "1.5rem",
    fontFamily: "'Roboto Slab', serif",
    color: "white",
    backgroundColor: "#0d6efd",
};

export function InicioUsuario() {
    // INSTANCIA USENAVIGATE
    const navigate = useNavigate();

    // ESTADO INICIAL DEL FORM
    const initialState = {
        valorGiro: "",
    };

    useEffect(() => {
        const botones = document.getElementsByClassName("accordion-button collapsed");
        for (let boton of botones) {
            boton.style.backgroundColor = "#0d6efd";
            boton.style.borderTopLeftRadius = "0px";
            boton.style.borderTopRightRadius = "0px";
            boton.style.border = "0px";
            boton.style.height = "20px";
            boton.style.outlineStyle = "none";
            boton.style.color = "white";
            boton.style.fontFamily = "'Roboto Slab', serif";
            boton.style.fontWeight = "500";
            boton.style.fontSize = "1.5rem";
            boton.style.padding = "5px";
            boton.style.textAlign = "center"
        }
    });

    // OBTENGO LO DATOS DE SESION DEL USUARIO
    const sesion = new Sesion();
    const id = sesion.getUid();

    // CONSULTAS
    const buzon = useQuery(OBTENER_BUZON);
    const { loading, data, error } = useQuery(OBTENER_USUARIO_POR_ID, {
        variables: { id },
    });

    const initialStateUsuario = {
        usuario: {
            saldo: 0,
            deuda: 0,
            tasaVenta: 0
        }
    };

    const usuario = data || initialStateUsuario;

    // ESTADOS
    const [configuracion] = useCargarDataForm({ buzon: [] }, buzon.data);
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState(initialState);


    // MANEJADORES
    const handleInputChange = (event, name) => {
        setForm({ ...form, [name]: event.target.value });
    }

    const handleEnviar = (event) => {
        const formReactBoot = event.currentTarget;
        if (formReactBoot.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

        }
        if (validarCamposNotNull(form)) {
            if (form.valorGiro < 1000) swal("Error!", "No puede hacer un giro con ese valor!", "error");
            else {
                setValidated(false);
                navigate(`/enviar-giro/${id}/${form.valorGiro}`);
            }
        }
        else setValidated(true);
    }
    // LO QUE MUESTRA CUANDO CARGA
    if (loading) return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
    // LO QUE MUESTRA EN CASO DE ERROR
    if (error) return (
        `Error! ${error}`
    );
    return (
        <>
            <Container className="my-4" style={{ textAlign: "center" }}>
                <Row className="mb-3 justify-content-center">
                    <Col md="4">
                        <Card className="card-container-inicio mb-3 rounded">
                            <CardContent className="p-0">
                                <h2 className="pt-3 mb-0 "
                                    style={textStyleH2} >
                                    Enviar Giro
                                </h2>

                                <Accordion className="mb-3">
                                    <Accordion.Item style={{ border: "0px" }} eventKey="0" >
                                        <Accordion.Header >
                                        </Accordion.Header>
                                        <Accordion.Body style={{
                                            fontWeight: "300",
                                            fontFamily: "'Roboto Slab', serif",
                                            textAlign: "left"
                                        }}>
                                            Aquí puedes enviar giros a las personas.
                                            Ingrese el valor del monto que va a enviar
                                            <br />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>


                                <Row
                                    as={Form}
                                    className="mb-3 px-3 justify-content-center"
                                    validated={validated}
                                    onSubmit={handleEnviar} >
                                    <Form.Group
                                        as={Col}
                                        md="10"
                                        controlId="validationValorGiro">
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Monto"
                                            onChange={(e) => {
                                                handleInputChange({
                                                    target: {
                                                        value: modificarInputValue(e.target.value)
                                                    }
                                                }, "valorGiro");
                                            }}
                                            value={(form.valorGiro) ? currencyFormatter.format(form.valorGiro) : ""}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es obligatorio
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row
                                    className="mb-4 px-3 justify-content-center"
                                    validated={validated}>
                                    <Form.Group as={Col} md="10" controlId="validationSaldo">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el saldo"
                                            value={(form.valorGiro) ? currencyFormatter.format(form.valorGiro * (1 / usuario.usuario.tasaVenta)) : ""}
                                            disabled={true}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="">
                                    <Col md="12">
                                        <Button onClick={handleEnviar}
                                            style={{
                                                borderTopLeftRadius: "0px",
                                                borderTopRightRadius: "0px",
                                                width: "100%"
                                            }} className="btn btn-primary  px-3">Enviar</Button>
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
                <hr />
                <Row className="mb-3">
                    <Col md="12">
                        <Buzon configuracion={configuracion} />
                    </Col>
                </Row>
                <hr />
                <Row className="mb-3">
                    <Col md="4">
                        <TasaVenta
                            tasa={usuario.usuario.tasaVenta}
                            loading={loading}
                            rol="USUARIO" />
                    </Col>
                    <Col md="4">
                        <Saldo
                            saldo={usuario.usuario.saldo}
                            loading={loading} />
                    </Col>
                    <Col md="4">
                        <Deuda
                            deuda={usuario.usuario.deuda}
                            loading={loading} />
                    </Col>
                </Row>
            </Container>

        </>
    );
}