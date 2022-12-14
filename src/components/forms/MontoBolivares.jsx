import { Col, Form } from "react-bootstrap";
import { currencyFormatter } from "../../util/currencyFormatter";

export function MontoBolivares({ value, md }) {
    return <Form.Group style={{ fontFamily: "'Roboto', sans-serif" }} as={Col} className="mb-3" controlId="label_montoBolivares" md={md}>
        <Form.Label style={{ textAlign: "initial", width: "100%" }}>Monto en Bolivares</Form.Label>
        <Form.Control
            required
            name="montoBolivares"
            value={(value === "") ? "" : currencyFormatter.format(value)}
            type="text"
            disabled={true}
            placeholder="Monto en bolivares..." />
    </Form.Group>
};