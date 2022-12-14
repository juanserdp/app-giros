import { Col, Form } from "react-bootstrap";
import { FeedBack } from "../Feedback";

export function Apellidos({ value, onChange, md, disabled }) {
    return <Form.Group style={{ fontFamily: "'Roboto', sans-serif" }} as={Col} className="mb-3" controlId="label_apellidos" md={md}>
        <Form.Label>Apellidos</Form.Label>
        <Form.Control
            required
            maxLength="25"
            name="apellidos"
            onChange={event => onChange(event)}
            value={value}
            type="text"
            placeholder="Ingrese el apellido..."
            disabled={disabled ? true : false} />
        <FeedBack />
    </Form.Group>
};
