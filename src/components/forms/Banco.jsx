import { Col, Form } from "react-bootstrap";
import { bancos } from "../../assets/constants/bancos";
import { FeedBack } from "../Feedback";

export function Banco({ value, onChange, md, disabled }) {
    return <Form.Group style={{ fontFamily: "'Roboto', sans-serif" }} as={Col} className="mb-3" controlId="label_banco" md={md}>
        <Form.Label>Banco</Form.Label>
        <Form.Select
            required
            name="banco"
            onChange={event => onChange(event)}
            value={value}
            disabled={disabled ? true : false} >
            <option value="">Elige el banco...</option>
            {bancos.map((banco, indice) => {
                return <option key={indice} value={banco}>
                    {banco}
                </option>
            })}
        </Form.Select>
        <FeedBack />
    </Form.Group>
};