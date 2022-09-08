import { Card, CardContent, Skeleton } from "@mui/material";
import { useEffect } from "react";
import { Accordion, Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";

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


export function Mensaje({ autoFocusMensaje, setAutoFocusMensaje, mensaje, setMensaje, isNewMensaje, handleMensaje }) {
    return (
        <Card className="card-container-saldo rounded " >
            <CardContent className="p-0">
                <h2
                    className="m-0 pt-2"
                    style={textStyleH2} >
                    Mensaje
                </h2>
                <Accordion className="mb-4">
                    <Accordion.Item style={{ border: "0px" }} eventKey="0" >
                        <Accordion.Header >

                        </Accordion.Header>
                        <Accordion.Body style={{
                            fontWeight: "300",
                            fontFamily: "'Roboto Slab', serif",
                            textAlign: "left"
                        }}>
                            Aquí puedes crear un nuevo mensaje y tambien puedes
                            editar un mensaje del buzon.
                            <br />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <Row className="mx-3">
                    <Form.Group
                        as={Col}
                        className="mb-3"
                        md="12"
                        controlId="validationSaldo"
                        style={{ textAlign: "left" }}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label={(isNewMensaje) ? "Nuevo Mensaje" : "Editar Mensaje"}
                            className="mb-3">
                            <Form.Control
                                required
                                placeholder=""
                                as="textarea"
                                autoFocus={autoFocusMensaje}
                                onChange={(e) => {
                                    setMensaje({ ...mensaje, contenido: e.target.value });
                                }}
                                value={mensaje.contenido}
                            />
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row className="">
                    <Col md="12">
                        <Button
                            onClick={() => {
                                handleMensaje();
                                setAutoFocusMensaje(false);
                            }}
                            style={{
                                borderRadius: "0px",
                                width: "100%"
                            }}
                            className="btn btn-primary m-0 px-3">Aceptar</Button>
                    </Col>
                </Row>
                <Row className="">
                    <Col md="12">

                    </Col>
                </Row>

            </CardContent>
        </Card>
    )
};

