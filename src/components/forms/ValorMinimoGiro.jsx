import { Col, Form } from "react-bootstrap";
import { currencyFormatter } from "../../util/currencyFormatter";
import { parseNumberFormatToNumber } from "../../util/parseNumberFormatToNumber";
import { FeedBack } from "../Feedback";

export function ValorMinimoGiro({ value, onChange, md, disabled }) {
    return <Form.Group as={Col} className="mb-3" controlId="label_valorMinimoGiro" md={md}>
        <Form.Label>Valor Minimo Giro</Form.Label>
        <Form.Control
            required
            name="valorMinimoGiro"
            onChange={event => {
                const valor = parseNumberFormatToNumber(event.target.value);
                onChange({ target: { value: valor, name: "valorMinimoGiro" } });
            }}
            value={(value == "") ? "" : currencyFormatter.format(value)}
            type="text"
            placeholder="Ingrese el valor..."
            disabled={disabled ? true : false} />
        <FeedBack />
    </Form.Group>
};



