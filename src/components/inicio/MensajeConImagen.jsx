import { Card, CardContent } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { Acordion } from "../Acordion";
import { ImagenCampo } from "../forms/ImagenCampo";
import { MensajeCampo } from "../forms/MensajeCampo";
import { BotonAceptarMensaje } from "./BotonAceptarMensaje";

export function MensajeConImagen({
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
                    titulo="Imagen">
                    Aquí puedes subir una imagen al buzon.
                </Acordion>

                <Row className="mx-3">
                    <ImagenCampo
                        mensaje={mensaje}
                        setMensaje={setMensaje}
                        disabled={!isNewMensaje}
                    />
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
                            initialStateMensaje={initialStateMensaje}
                        />
                    </Col>
                </Row>

            </CardContent>
        </Card>
    )
}