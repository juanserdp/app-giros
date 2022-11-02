import { Col, Form } from "react-bootstrap";
import { currencyFormatter } from "../../util/currencyFormatter";
import { parseNumberFormatToNumber } from "../../util/parseNumberFormatToNumber";
import { FeedBack } from "../Feedback";

export function ValorGiro({ value, onChange, md, disabled }) {
    return <Form.Group as={Col} className="mb-3" controlId="label_valorGiro" md={md}>
        <Form.Label style={{ textAlign: "initial", width: "100%" }}>Valor Giro</Form.Label>
        <Form.Control
            required
            name="valorGiro"
            onChange={event => {
                const valor = parseNumberFormatToNumber(event.target.value);
                onChange({ target: { value: valor, name: "valorGiro" } });
            }}
            value={(value == "") ? "" : currencyFormatter.format(value)}
            type="text"
            placeholder="Ingrese el valor..."
            disabled={disabled ? true : false} />
        <FeedBack />
    </Form.Group>
};
