import { Col, Form } from "react-bootstrap";
import { FeedBack } from "../Feedback";

export function NombresRemitente({ value, onChange, md, disabled }) {
    return <Form.Group style={{ fontFamily: "'Roboto', sans-serif" }} as={Col} className="mb-3" controlId="label_nombres" md={md}>
        <Form.Label>Nombres</Form.Label>
        <Form.Control
            required
            maxLength="25"
            name="nombresRemitente"
            onChange={event => onChange(event)}
            value={value}
            type="text"
            placeholder="Ingrese el nombre..."
            disabled={disabled ? true : false} />
        <FeedBack />
    </Form.Group>
};
