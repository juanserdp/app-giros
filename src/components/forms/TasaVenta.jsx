import { Col, Form } from "react-bootstrap";
import { FeedBack } from "../Feedback";

export function TasaVenta({ value, onChange, md, disabled }) {
    return <Form.Group style={{ fontFamily: "'Roboto', sans-serif" }} as={Col} className="mb-3" controlId="label_tasaVenta" md={md}>
        <Form.Label>Tasa Venta</Form.Label>
        <Form.Control
            required
            name="tasaVenta"
            onChange={event => {
                const valor = Number(event.target.value);
                onChange({ target: { value: valor, name: "tasaVenta" } });
            }}
            value={value}
            type="number"
            placeholder="Ingrese el valor..."
            disabled={disabled ? true : false} />
        <FeedBack />
    </Form.Group>
};