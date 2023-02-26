import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Buzon } from "../inicio/Buzon";
import { CardContent, Card } from "@mui/material";
import { OBTENER_USUARIO_POR_ID } from "../../services/apollo/gql/usuario/obtenerUsuarioPorId";
import { useMutation, useQuery } from '@apollo/client';
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
import { currencyFormatter } from "../../util/currencyFormatter";
import { TasaCompra } from "../inicio/TasaCompra";
import { EDITAR_USUARIO } from "../../services/apollo/gql/usuario/editarUsuario";
import { handleError } from "../../util/handleError";
import { GananciaPorcentaje } from "../inicio/GananciaPorcentaje";
import { OBTENER_TASA_ASESOR } from "../../services/apollo/gql/asesor/obtenerTasaAsesor";

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
        width: "100%",
        fontFamily: "'Roboto', sans-serif"
    };
    const initialStateMensajes = {
        mensajes: []
    };

    // HOOKS
    const { sesionData: { id } } = useSesionContext();

    const buzon = useQuery(OBTENER_MENSAJES);
    const [editarTasaVenta] = useMutation(EDITAR_USUARIO);
    const mensajes = buzon.data?.mensajes || initialStateMensajes.mensajes;

    const { loading, data, error, refetch } = useQuery(OBTENER_USUARIO_POR_ID, {
        variables: { id }
    });

    const [tasa, setTasa] = useState(null);

    const tasaAsesor = useQuery(OBTENER_TASA_ASESOR, {
        onCompleted: ({asesor}) => {
            setTasa(asesor.tasaVenta);
        }
    });

    tasaAsesor.startPolling(1000);



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
                navigate(`/enviar-giro/${form.valorGiro}`);
            }
            else swal("Error!", `El valor minimo para hacer un giro es: ${currencyFormatter.format(valorMinimo)}`, "error");
        }
        else setValidated(true);
    };

    const handleEditarTasa = async () => {
        swal("Nueva tasa de venta:", {
            content: "input",
        }).then(async (value) => {
            if (value) {
                await editarTasaVenta({
                    variables: {
                        id,
                        usuario: {
                            tasaVenta: Number(value)
                        }
                    },
                    onCompleted: () => {
                        swal("Editado!", "La tasa de Venta ha sido editada con exito", "success");
                        refetch();
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                });
            }
            else swal("Error!", "Todos los campos son obligatorios!", "error");
        });
    };

    if (loading) return <CircularProgressAnimation />;

    if (error) return <ErrorFetch error={error} />

    return (
        <Container className="my-4" style={{ textAlign: "center" }}>
            <Row className="mb-3 justify-content-center">
                <Col md="4">
                    <GananciaPorcentaje
                        tasaVenta={usuario.usuario?.tasaVenta}
                        tasaCompra={(usuario.usuario?.usarTasaPreferencial) ? usuario.usuario?.tasaPreferencial : tasaAsesor.data?.asesor.tasaVenta} />
                </Col>
                <Col md="4">
                    <Card className="card-container-inicio mb-3 rounded">
                        <CardContent className="p-0">
                            <Acordion titulo={<span style={{ fontFamily: "'Roboto', sans-serif", fontSize: "1.2rem" }}>Enviar Giro</span>}>
                                Aquí puedes poner el valor del giro que vas a enviar.
                            </Acordion>

                            <Row
                                as={Form}
                                validated={validated}
                                className="mb-1 px-3 justify-content-center"
                                onSubmit={handleEnviar} >
                                <ValorGiro
                                    onChange={(e) => handleInputChange(e)}
                                    value={form.valorGiro}
                                    md={10}
                                    titulo="Valor del Giro (COP)"
                                    tasa={usuario.usuario?.tasaVenta} />
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
                <Col md="4">
                    <TasaVenta
                        tasa={usuario.usuario?.tasaVenta}
                        handleEditarTasa={handleEditarTasa}
                        rol="USUARIO" />
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
                    <TasaCompra
                        tasa={(usuario.usuario?.usarTasaPreferencial) ? usuario.usuario?.tasaPreferencial : tasaAsesor.data?.asesor.tasaVenta}
                    />
                </Col>

                <Col md="4">
                    <Saldo saldo={usuario.usuario.saldo} tasa={usuario.usuario?.tasaVenta} />
                </Col>

                <Col md="4">
                    <Deuda deuda={usuario.usuario.deuda} />
                </Col>
            </Row>
        </Container>
    );
}