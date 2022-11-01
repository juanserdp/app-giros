import { useEffect, useState } from "react";
import { Accordion, Button, Col, Container, Form, Row } from "react-bootstrap";
import { currencyFormatter } from "../../util/currencyFormatter";
import { modificarInputValue } from "../../util/modificarInputValue";
import { Buzon } from "../inicio/Buzon";
import { CardContent, Card } from "@mui/material";
import { OBTENER_USUARIO_POR_ID } from "../../services/apollo/gql/usuario/obtenerUsuarioPorId";
import { useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { validarCamposNotNull } from "../../util/validarCamposNotNull";
import { OBTENER_BUZON } from "../../services/apollo/gql/buzon/obtenerBuzon";
import { useCargarDataForm } from "../../hooks/useCargarDataForm";
import { Deuda } from "../inicio/Deuda";
import { Saldo } from "../inicio/Saldo";
import { TasaVenta } from "../inicio/TasaVenta";
import { accordionCollapsed } from "../../util/accordionCollapsed";
import { CircularProgressAnimation } from "../CircularProgressAnimation";
import { ErrorFetch } from "../errors/ErrorFetch";
import { useContext } from "react";
import { context } from "../../App";
import { useSesionContext } from "../../providers/SesionProvider";
import { FeedBack } from "../Feedback";

export function InicioUsuario() {
    // INSTANCIAS
    const navigate = useNavigate();

    const initialState = {
        valorGiro: "",
    };
    const initialStateUsuario = {
        usuario: {
            saldo: 0,
            deuda: 0,
            tasaVenta: 0
        }
    };
    const textStyleH2 = {
        fontWeight: "500",
        fontSize: "1.5rem",
        fontFamily: "'Roboto Slab', serif",
        color: "white",
        backgroundColor: "#0d6efd",
    };
    const accordionStyle = {
        fontWeight: "300",
        fontFamily: "'Roboto Slab', serif",
        textAlign: "left"
    };
    const bottonStyle = {
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        width: "100%"
    };

    // HOOKS
    useEffect(() => accordionCollapsed());
    const { id } = useSesionContext();
    const buzon = useQuery(OBTENER_BUZON);
    const { loading, data, error } = useQuery(OBTENER_USUARIO_POR_ID, {
        variables: { id },
    });
    const usuario = data || initialStateUsuario;
    const [configuracion] = useCargarDataForm({ buzon: [] }, buzon.data);
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState(initialState);

    // MANEJADORES
    const handleInputChange = (event, name) => setForm({ ...form, [name]: event.target.value });

    const handleEnviar = (event) => {
        if (validarCamposNotNull(form)) {
            if (form.valorGiro < usuario.usuario.asesor.valorMinimoGiro) swal("Error!", "No puede hacer un giro con ese valor!", "error");
            else {
                setValidated(false);
                navigate(`/enviar-giro/${id}/${form.valorGiro}`);
            }
        }
        else setValidated(true);
    }

    if (loading) return <CircularProgressAnimation />;

    if (error) return <ErrorFetch error={error} />

    return (
        <Container className="my-4" style={{ textAlign: "center" }}>
            <Row className="mb-3 justify-content-center">
                <Col md="4">
                    <Card className="card-container-inicio mb-3 rounded">
                        <CardContent className="p-0">
                            <h2
                                className="pt-3 mb-0"
                                style={textStyleH2} >
                                Enviar Giro
                            </h2>

                            <Accordion className="mb-3">
                                <Accordion.Item style={{ border: "0px" }} eventKey="0" >
                                    <Accordion.Header >
                                    </Accordion.Header>
                                    <Accordion.Body style={accordionStyle}>
                                        Aquí puedes enviar giros a las personas.
                                        Ingrese el valor del monto que va a enviar
                                        <br />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                            <Row
                                as={Form}
                                validated={validated}
                                className="mb-3 px-3 justify-content-center"
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
                                        value={(form.valorGiro) ? currencyFormatter.format(form.valorGiro) : ""} />
                                    <FeedBack />
                                </Form.Group>
                            </Row>

                            <Row className="mb-4 px-3 justify-content-center">
                                <Form.Group as={Col} md="10" controlId="validationSaldo">
                                    <Form.Control
                                        type="text"
                                        placeholder="Monto en bolivares"
                                        value={(form.valorGiro) ? currencyFormatter.format(form.valorGiro * (1 / usuario.usuario.tasaVenta)) : ""}
                                        disabled={true} />
                                </Form.Group>
                            </Row>

                            <Row>
                                <Col md="12">
                                    <Button
                                        className="btn btn-primary px-3"
                                        onClick={handleEnviar}
                                        style={bottonStyle}>
                                        Enviar
                                    </Button>
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
                    <Saldo saldo={usuario.usuario.saldo} />
                </Col>

                <Col md="4">
                    <Deuda deuda={usuario.usuario.deuda} />
                </Col>
            </Row>
        </Container>
    );
}