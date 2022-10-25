import { Form } from "react-bootstrap";

export function NumeroDocumento({ value, onChange }) {
    return <Form.Group className="mb-3" controlId="label_numeroDocumento">
        <Form.Label>Numero de Documento</Form.Label>
        <Form.Control
            onChange={event => onChange(event, "numeroDocumento")}
            value={value} type="text" placeholder="Ingrese el numero" />
    </Form.Group>
}