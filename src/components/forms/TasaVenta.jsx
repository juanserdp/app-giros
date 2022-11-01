import { Col, Form } from "react-bootstrap";
import { FeedBack } from "../Feedback";

export function TasaVenta({ value, onChange, md }) {
    return <Form.Group as={Col} className="mb-3" controlId="label_tasaVenta" md={md}>
        <Form.Label>Tasa Venta</Form.Label>
        <Form.Control
            required
            name="tasaVenta"
            onChange={event => onChange(event)}
            value={value}
            type="number"
            placeholder="Ingrese el valor..." />
        <FeedBack />
    </Form.Group>
};