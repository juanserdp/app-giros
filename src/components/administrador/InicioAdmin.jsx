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
import { Col, Container, Row } from "react-bootstrap";

export function InicioAdmin() {

    // CONSTANTES
    const initialStateMensaje = {
        mensaje: ""
    };
    const initialStateMensajes = {
        mensajes: []
    };
    const containerProps = {
        className: "my-4",
        style: { textAlign: "center" }
    };

    // HOOKS
    const [recargarAsesor] = useMutation(RECARGAR_ASESOR);
    const [mensaje, setMensaje] = useState(initialStateMensaje);
    const [isNewMensaje, setIsNewMensaje] = useState(true);
    const [autoFocusMensaje, setAutoFocusMensaje] = useState(false);
    const { loading, data, error, refetch } = useQuery(OBTENER_MENSAJES);
    const [idMensajeEditar, setIdMensajeEditar] = useState("");

    const mensajes = data?.mensajes || initialStateMensajes.mensajes;

    return (
        <React.Fragment>
            <Container {...containerProps}>
                <Row className="mb-3 justify-content-center">
                    <Col md="4">
                        <FormRecargar recargar={recargarAsesor} />
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
                            loading={loading}
                            error={error}
                            refetch={refetch}
                            setIdMensajeEditar={setIdMensajeEditar}
                            initialStateMensaje={initialStateMensaje} />
                    </Col>
                </Row>

                <hr />

                <Row className="justify-content-center mb-3">
                    <Col md="4">
                        <Mensaje
                            autoFocusMensaje={autoFocusMensaje}
                            setAutoFocusMensaje={setAutoFocusMensaje}
                            initialStateMensaje={initialStateMensaje}
                            mensaje={mensaje}
                            setMensaje={setMensaje}
                            refetch={refetch}
                            isNewMensaje={isNewMensaje}
                            setIsNewMensaje={setIsNewMensaje}
                            idMensajeEditar={idMensajeEditar} />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}