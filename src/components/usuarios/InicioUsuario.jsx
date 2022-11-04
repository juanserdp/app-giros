import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Buzon } from "../inicio/Buzon";
import { CardContent, Card } from "@mui/material";
import { OBTENER_USUARIO_POR_ID } from "../../services/apollo/gql/usuario/obtenerUsuarioPorId";
import { useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { validarCamposNotNull } from "../../util/validarCamposNotNull";
import { Deuda } from "../inicio/Deuda";
import { Saldo } from "../inicio/Saldo";
import { TasaVenta } from "../inicio/TasaVenta";
import { CircularProgressAnimation } from "../CircularProgressAnimation";
import { ErrorFetch } from "../errors/ErrorFetch";
import { useSesionContext } from "../../providers/SesionProvider";
import { OBTENER_MENSAJES } from "../../services/apollo/gql/mensaje/obtenerMensajes";
import { Acordion } from "../Acordion";
import { ValorGiro } from "../forms/ValorGiro";
import { MontoBolivares } from "../forms/MontoBolivares";
import { currencyFormatter } from "../../util/currencyFormatter";

export function InicioUsuario() {
    // INSTANCIAS
    const navigate = useNavigate();

    // CONSTANTES
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
    const bottonStyle = {
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        width: "100%"
    };
    const initialStateMensajes = {
        mensajes: []
    };

    // HOOKS
    const { sesionData: { id } } = useSesionContext();

    const buzon = useQuery(OBTENER_MENSAJES);

    const mensajes = buzon.data?.mensajes || initialStateMensajes.mensajes;

    const { loading, data, error } = useQuery(OBTENER_USUARIO_POR_ID, {
        variables: { id },
    });

    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState(initialState);

    const usuario = data || initialStateUsuario;

    // MANEJADORES
    const handleInputChange = ({ target: { name, value } }) => setForm({ ...form, [name]: value });

    const handleEnviar = (event) => {
        event.preventDefault();

        const valorMinimo = usuario.usuario?.asesor?.valorMinimoGiro;

        if (validarCamposNotNull(form)) {
            if (form.valorGiro >= valorMinimo) {
                setValidated(false);
                navigate(`/enviar-giro/${id}/${form.valorGiro}`);
            }
            else swal("Error!", `El valor minimo para hacer un giro es: ${currencyFormatter.format(valorMinimo)}`, "error");
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
                            <Acordion titulo="Enviar Giro">
                                Aquí puedes enviar giros a las personas.
                                Ingrese el valor del monto que va a enviar.
                            </Acordion>

                            <Row
                                as={Form}
                                validated={validated}
                                className="mb-1 px-3 justify-content-center"
                                onSubmit={handleEnviar} >
                                <ValorGiro
                                    onChange={(e) => handleInputChange(e)}
                                    value={form.valorGiro}
                                    md={10} />
                            </Row>

                            <Row className="mb-1 px-3 justify-content-center">
                                <MontoBolivares
                                    value={form.valorGiro * (1 / usuario.usuario.tasaVenta)}
                                    md={10} />
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
                    <Buzon mensajes={mensajes} />
                </Col>
            </Row>

            <hr />

            <Row className="mb-3">
                <Col md="4">
                    <TasaVenta
                        tasa={(usuario.usuario?.usarTasaDelAsesor) ? usuario.usuario?.asesor.tasaVenta : usuario.usuario?.tasaVenta}
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