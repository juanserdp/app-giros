import { Col, Form } from "react-bootstrap";
import { FeedBack } from "../Feedback";

export function NumeroCuenta({ value, onChange, md, disabled }) {
    return <Form.Group as={Col} className="mb-3" controlId="label_numeroCuenta" md={md}>
        <Form.Label >Numero de Documento</Form.Label>
        <Form.Control
            required
            name="numeroCuenta"
            onChange={event => onChange(event)}
            value={value}
            type="number"
            placeholder="Ingrese el numero..."
            disabled={disabled ? true : false} />
        <FeedBack />
    </Form.Group>
};