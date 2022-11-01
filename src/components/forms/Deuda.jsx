import { Col, Form } from "react-bootstrap";
import { currencyFormatter } from "../../util/currencyFormatter";
import { parseNumberFormatToNumber } from "../../util/parseNumberFormatToNumber";
import { FeedBack } from "../Feedback";

export function Deuda({ value, onChange, md }) {
    return <Form.Group as={Col} className="mb-3" controlId="label_deuda" md={md}>
        <Form.Label>Deuda</Form.Label>
        <Form.Control
            required
            name="deuda"
            onChange={event => {
                const valor = parseNumberFormatToNumber(event.target.value);
                onChange({ target: { value: valor, name: "deuda" } });
            }}
            value={(value == "") ? "" : currencyFormatter.format(value)}
            type="text"
            placeholder="Ingrese el valor..." />
        <FeedBack />
    </Form.Group>
};
