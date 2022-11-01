import { Form } from "react-bootstrap";

export function Clave({ value, onChange }) {
    return <Form.Group className="mb-3" controlId="label_clave">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
            onChange={event => onChange(event, "clave")}
            value={value}
            type="password"
            placeholder="Ingrese la contraseña" />
    </Form.Group>
}