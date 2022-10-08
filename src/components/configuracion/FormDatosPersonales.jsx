import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

export function FormDatosPersonales({
    datosPersonales,
    setDatosPersonales,
}) {
    const [form, setForm] = useState(datosPersonales);
    const handleInputChange = (event, name) => {
        setForm({ ...form, [name]: event.target.value });
        setDatosPersonales({ ...form, [name]: event.target.value })
    };
    return (
        <Form noValidate  >
            <Row className="m-3">
                <Form.Group as={Col} md="6" controlId="nombres">
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Edite su nombre aquí..."
                        value={form.nombres}
                        onChange={(e) => handleInputChange(e, "nombres")} />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Okey!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="apellidos">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Edite su apellido aquí..."
                        value={form.apellidos}
                        onChange={(e) => handleInputChange(e, "apellidos")}
                    />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="m-3">
                <Form.Group as={Col} md="6" controlId="tipoDocumento">
                    <Form.Label>Tipo de Documento</Form.Label>
                    <Form.Select
                        required
                        value={form.tipoDocumento}
                        onChange={(e) => handleInputChange(e, "tipoDocumento")}
                    >
                        <option value="">Edite su tipo de documento aquí</option>
                        <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                        <option value="Cedula de Ciudadania">Cédula de Ciudadanía</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="numeroDocumento">
                    <Form.Label>Numero de Documento</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="Edite su numero de documento aquí..."
                        value={form.numeroDocumento}
                        onChange={(e) => handleInputChange(e, "numeroDocumento")}
                    />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

        </Form>
    )
}