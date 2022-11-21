import { Col, Form } from "react-bootstrap";
import { currencyFormatter } from "../../util/currencyFormatter";
import { parseNumberFormatToNumber } from "../../util/parseNumberFormatToNumber";
import { FeedBack } from "../Feedback";

export function ValorRecarga({ value, onChange, md, disabled }) {
    return <Form.Group style={{ fontFamily: "'Roboto', sans-serif" }} as={Col} className="mb-3" controlId="label_valorRecarga" md={md}>
        <Form.Label style={{ textAlign: "initial", width: "100%" }}>Valor de la Recarga (COP)</Form.Label>
        <Form.Control
            required
            name="valorRecarga"
            onChange={event => {
                const valor = Number(parseNumberFormatToNumber(event.target.value));
                onChange({ target: { value: valor, name: "valorRecarga" } });
            }}
            value={(value === "") ? "" : currencyFormatter.format(value)}
            type="text"
            placeholder="Ingrese el valor..."
            disabled={disabled ? true : false} />
        <FeedBack />
    </Form.Group>
};
