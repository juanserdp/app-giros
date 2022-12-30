import { Col, Form } from "react-bootstrap";
// import { currencyFormatter, currencyFormatterWithDecimals } from "../../util/currencyFormatter";
// import { parseNumberFormatToNumber } from "../../util/parseNumberFormatToNumber";
import { FeedBack } from "../Feedback";


export function Saldo({ value, onChange, md, disabled }) {
    return <Form.Group style={{ fontFamily: "'Roboto', sans-serif" }} as={Col} className="mb-3" controlId="label_saldo" md={md}>
        <Form.Label>Saldo</Form.Label>
        <Form.Control
            required
            name="saldo"
            onChange={event => {
                const valor = Number(event.target.value);//const valor = Number(Number(event.target.value).toFixed(2)); //Number(parseNumberFormatToNumber(event.target.value));
                onChange({ target: { value: valor, name: "saldo" } });
            }}
            value={value}
            type="text"
            placeholder="Ingrese el valor..."
            disabled={disabled ? true : false} />
        <FeedBack />
    </Form.Group>
};
