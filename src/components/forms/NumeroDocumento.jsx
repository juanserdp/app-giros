import { Col, Form } from "react-bootstrap";
import { FeedBack } from "../Feedback";

export function NumeroDocumento({ value, onChange, md, disabled }) {
    return <Form.Group style={{ fontFamily: "'Roboto', sans-serif" }} as={Col} className="mb-3" controlId="label_numeroDocumento" md={md}>
        <Form.Label style={{ textAlign: "initial", width: "100%" }}>Numero de Documento</Form.Label>
        <Form.Control
            required
            maxLength="20"
            name="numeroDocumento"
            onChange={event => onChange(event, "numeroDocumento")}
            value={value}
            type="text"
            placeholder="Ingrese el numero..."
            disabled={disabled ? true : false} />
        <FeedBack />
    </Form.Group>
};