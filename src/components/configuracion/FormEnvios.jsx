import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

export function FormEnvios({
    valorMinimoGiro,
    setValorMinimoGiro
}) {
    const [form, setForm] = useState(valorMinimoGiro);
    const handleInputChange = (event, name) => {
        setForm({ ...form, [name]: event.target.value });
        setValorMinimoGiro({ ...form, [name]: event.target.value });
    };
    return (
        <Form>
            <Row className="m-3">
                <Form.Group as={Col} md="6" controlId="envios">
                    <Form.Label>Valor Minimo para Enviar un Giro</Form.Label>
                    <Form.Control
                        required
                        onChange={(e) => handleInputChange(e, "valorMinimoGiro")}
                        value={form.valorMinimoGiro}
                        type="number"
                        placeholder="Edite el valor aquí">
                    </Form.Control>
                </Form.Group>
            </Row>
        </Form>
    )
}