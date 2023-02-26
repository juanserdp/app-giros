// HOOKS
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
// QUERIES
import { RECARGAR_ASESOR } from "../../services/apollo/gql/asesor/recargarAsesor";
import { OBTENER_MENSAJES } from "../../services/apollo/gql/mensaje/obtenerMensajes";
// COMPONENTES
import { Buzon } from "../inicio/Buzon";
import { Mensaje } from "../inicio/Mensaje";
import { FormRecargar } from "../forms/FormRecargar";
// COMPONENTES TERCEROS
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSesionContext } from "../../providers/SesionProvider";
import { OBTENER_ASESOR_POR_ID } from "../../services/apollo/gql/asesor/obtenerAsesorPorId";
import { TasaVenta } from "../inicio/TasaVenta";
import { EDITAR_ASESOR } from "../../services/apollo/gql/asesor/editarAsesor";
import swal from "sweetalert";
import { handleError } from "../../util/handleError";
import { ErrorFetch } from "../errors/ErrorFetch";
import { Saldo } from "../inicio/Saldo";
import { Card, CardContent } from "@mui/material";
import { GananciaPorcentaje } from "../inicio/GananciaPorcentaje";

const textStyleH2 = {
    fontWeight: "500",
    fontSize: "1.5rem",
    fontFamily: "'Roboto Slab', serif",
    color: "white",
    backgroundColor: "#0d6efd",
};
const textStyleH3 = {
    fontWeight: "400",
    fontSize: "2rem",
    fontFamily: "'Roboto Slab', serif",
    color: "white",
    verticalAlign: "center"
};

const buttonStyle = {
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
    width: "100%"
};

export function InicioAdmin() {

    // CONSTANTES
    const initialStateMensaje = {
        mensaje: "",
        imagen: ""
    };
    const initialStateMensajes = {
        mensajes: []
    };
    const containerProps = {
        className: "my-4",
        style: { textAlign: "center" }
    };

    // HOOKS
    const { sesionData: { id } } = useSesionContext();
    const [recargarAsesor, recargarMutation] = useMutation(RECARGAR_ASESOR);
    const [editarTasaVenta] = useMutation(EDITAR_ASESOR);
    const [mensaje, setMensaje] = useState(initialStateMensaje);
    const [isNewMensaje, setIsNewMensaje] = useState(true);
    const [autoFocusMensaje, setAutoFocusMensaje] = useState(false);
    const buzon = useQuery(OBTENER_MENSAJES);
    const [idMensajeEditar, setIdMensajeEditar] = useState("");
    const [valor, setValor] = useState(0);
    const { data, loading, error, refetch } = useQuery(OBTENER_ASESOR_POR_ID,
        { variables: { id } }
    );

    const mensajes = buzon.data?.mensajes || initialStateMensajes.mensajes;

    const handleEditarTasa = async () => {
        swal("Nueva tasa de venta:", {
            content: "input",
        }).then(async (value) => {
            if (value) {
                await editarTasaVenta({
                    variables: {
                        id,
                        asesor: {
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

    const handleEditarTasaCompra = async () => {
        swal("Nueva tasa de compra:", {
            content: "input",
        }).then(async (value) => {
            if (value) {
                await editarTasaVenta({
                    variables: {
                        id,
                        asesor: {
                            tasaPreferencial: Number(value)
                        }
                    },
                    onCompleted: () => {
                        swal("Editado!", "La tasa de compra ha sido editada con exito", "success");
                        refetch();
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                });
            }
            else swal("Error!", "Todos los campos son obligatorios!", "error");
        });
    };

    if (error) return <ErrorFetch />

    return (
        <React.Fragment>
            <Container {...containerProps}>
                <Row className="mb-3 ">
                    <Col md="4">
                        <Card className="card-container-tasa mb-3 rounded" >
                            <CardContent className="p-0">
                                <h2 className="mb-4 py-2" style={textStyleH2}>Tasa de Compra</h2>
                                <br />
                                <h3 className="mb-4" style={textStyleH3}>{data?.asesor.tasaPreferencial}</h3>
                                <Row >
                                    <Col md="12">
                                        <Button style={buttonStyle} onClick={handleEditarTasaCompra}>Editar</Button>
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col md="4">
                        <FormRecargar
                            recargar={recargarAsesor}
                            refetch={refetch}
                            recargarMutation={recargarMutation}
                            setValor={setValor}
                            tasa={data?.asesor.tasaVenta} />
                    </Col>
                    <Col md="4">
                        <GananciaPorcentaje tasaVenta={data?.asesor.tasaVenta} tasaCompra={data?.asesor.tasaPreferencial} />
                    </Col>
                </Row>

                <hr />

                <Row className="mb-3">
                    <Col md="12">
                        <Buzon
                            setIsNewMensaje={setIsNewMensaje}
                            setMensaje={setMensaje}
                            setAutoFocusMensaje={setAutoFocusMensaje}
                            mensajes={mensajes}
                            loading={buzon.loading}
                            error={buzon.error}
                            refetch={buzon.refetch}
                            setIdMensajeEditar={setIdMensajeEditar}
                            initialStateMensaje={initialStateMensaje} />
                    </Col>
                </Row>

                <hr />

                <Row className="justify-content-center mb-3">
                    <Col md="4">
                        <TasaVenta
                            tasa={data?.asesor.tasaVenta}
                            handleEditarTasa={handleEditarTasa}
                            loading={loading}
                            rol="ADMINISTRADOR" />
                    </Col>
                    <Col md="4 mb-3">
                        <Mensaje
                            autoFocusMensaje={autoFocusMensaje}
                            setAutoFocusMensaje={setAutoFocusMensaje}
                            initialStateMensaje={initialStateMensaje}
                            mensaje={mensaje}
                            setMensaje={setMensaje}
                            refetch={buzon.refetch}
                            isNewMensaje={isNewMensaje}
                            setIsNewMensaje={setIsNewMensaje}
                            idMensajeEditar={idMensajeEditar} />
                    </Col>
                    <Col md="4">
                        <Saldo
                            saldo={data?.asesor.saldo}
                            loading={loading}
                            tasa={data?.asesor.tasaVenta} />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
};