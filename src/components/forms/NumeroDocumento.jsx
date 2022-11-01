import { Col, Form } from "react-bootstrap";
import { FeedBack } from "../Feedback";

export function NumeroDocumento({ value, onChange, md }) {
    return <Form.Group as={Col} className="mb-3" controlId="label_numeroDocumento" md={md}>
        <Form.Label>Numero de Documento</Form.Label>
        <Form.Control
            required
            name="numeroDocumento"
            onChange={event => onChange(event, "numeroDocumento")}
            value={value}
            type="text"
            placeholder="Ingrese el numero" />
        <FeedBack />
    </Form.Group>
}