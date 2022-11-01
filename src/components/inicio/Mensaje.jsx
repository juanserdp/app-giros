import { Card, CardContent, Skeleton } from "@mui/material";
import { Accordion, Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { Acordion } from "../Acordion";
import { FeedBack } from "../Feedback";
import { MensajeCampo } from "../forms/MensajeCampo";
import { BotonAceptarMensaje } from "./BotonAceptarMensaje";

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


export function Mensaje({
    autoFocusMensaje,
    setAutoFocusMensaje,
    initialStateMensaje,
    mensaje,
    setMensaje,
    refetch,
    isNewMensaje,
    setIsNewMensaje,
    idMensajeEditar
}) {

    const handleChange = (e) => setMensaje({ ...mensaje, mensaje: e.target.value });

    return (
        <Card className="card-container-saldo rounded">
            <CardContent className="p-0">

                <Acordion
                    titulo="Mensaje">
                    Aquí puedes crear un nuevo mensaje y tambien puedes
                    editar un mensaje del buzon.
                </Acordion>

                <Row className="mx-3">
                    <MensajeCampo
                        value={mensaje.mensaje}
                        onChange={handleChange}
                        isNewMensaje={isNewMensaje}
                        autoFocusMensaje={autoFocusMensaje} />
                </Row>

                <Row>
                    <Col md="12">
                        <BotonAceptarMensaje
                            id={idMensajeEditar}
                            mensaje={mensaje}
                            setAutoFocusMensaje={setAutoFocusMensaje}
                            setIsNewMensaje={setIsNewMensaje}
                            isNewMensaje={isNewMensaje}
                            refetch={refetch}
                            setMensaje={setMensaje}
                            initialStateMensaje={initialStateMensaje} />
                    </Col>
                </Row>

            </CardContent>
        </Card>
    )
};