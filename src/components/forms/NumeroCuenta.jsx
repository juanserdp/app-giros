import { Col, Form } from "react-bootstrap";
import { FeedBack } from "../Feedback";

export function NumeroCuenta({ value, onChange, md, disabled }) {
    return <Form.Group style={{ fontFamily: "'Roboto', sans-serif" }} as={Col} className="mb-3" controlId="label_numeroCuenta" md={md}>
        <Form.Label >Numero de Cuenta</Form.Label>
        <Form.Control
            required
            maxLength="20"
            name="numeroCuenta"
            onChange={event => onChange(event)}
            value={value}
            type="text"
            placeholder="Ingrese el numero..."
            disabled={disabled ? true : false} />
        <FeedBack />
    </Form.Group>
};