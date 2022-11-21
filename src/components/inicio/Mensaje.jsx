import { Card, CardContent } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Acordion } from "../Acordion";
import { ImagenCampo } from "../forms/ImagenCampo";
import { MensajeCampo } from "../forms/MensajeCampo";
import { BotonAceptarMensaje } from "./BotonAceptarMensaje";
import UploadFileIcon from '@mui/icons-material/UploadFile';
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

    // MANEJADORES
    const handleChange = (e) => setMensaje({ ...mensaje, mensaje: e.target.value });
    const style = {
        borderRadius: "0px",
        width: "100%"
    };

    const [inputFile, setInputFile] = useState({});

    useEffect(() => {
        setInputFile(document.querySelector("#inputFile"));
    })
    const subirImagen = () => {
        inputFile.click();
    };

    return (
        <Card className="card-container-saldo rounded">
            <CardContent className="p-0">

                <Acordion
                    titulo="Mensaje">
                    Aquí puedes crear un nuevo mensaje y tambien puedes
                    editar un mensaje del buzon.
                </Acordion>

                <Row className="mx-3">
                    {(mensaje.imagen) ? (
                        (inputFile?.files) ? <img src={URL.createObjectURL(inputFile.files[0])} style={{ height: "150px" }} /> : "null"
                    ) : (
                        <MensajeCampo
                            value={mensaje.mensaje}
                            onChange={handleChange}
                            isNewMensaje={isNewMensaje}
                            autoFocusMensaje={autoFocusMensaje} />
                    )}
                    <ImagenCampo
                        mensaje={mensaje}
                        setMensaje={setMensaje}
                        disabled={!isNewMensaje} />
                </Row>

                <Row>
                    <Col md="6 p-0">
                        <Button style={style} onClick={() => subirImagen()}>
                            <UploadFileIcon/>
                            Imagen
                            </Button>
                    </Col>
                    <Col md="6 p-0">
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