import { Col, Form } from "react-bootstrap";
import { currencyFormatter } from "../../util/currencyFormatter";
import { parseNumberFormatToNumber } from "../../util/parseNumberFormatToNumber";
import { FeedBack } from "../Feedback";

export function MontoBolivares({ value, onChange, md }) {
    return <Form.Group as={Col} className="mb-3" controlId="label_montoBolivares" md={md}>
        <Form.Label style={{ textAlign: "initial", width: "100%" }}>Monto Bolivares</Form.Label>
        <Form.Control
            required
            name="montoBolivares"
            value={(value == "") ? "" : currencyFormatter.format(value)}
            type="text"
            disabled={true}
            placeholder="Ingrese el valor..." />
        <FeedBack />
    </Form.Group>
};