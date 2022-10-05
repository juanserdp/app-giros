import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

export function FormClave({
    clave,
    setClave
}) {
    const [form, setForm] = useState(clave);
    const handleInputChange = (event, name) => {
        setForm({ ...form, [name]: event.target.value });
        setClave({ ...form, [name]: event.target.value });
    }
    return (
        <Form>
            <Row className="m-3">
                <Form.Group as={Col} md="6" controlId="clave">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        required
                        onChange={(e) => handleInputChange(e, "clave")}
                        value={form.clave}
                        type="text"
                        placeholder="Edite su contraseña aquí">
                    </Form.Control>
                </Form.Group>
            </Row>
        </Form>
    )
};