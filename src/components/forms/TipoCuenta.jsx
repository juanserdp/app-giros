import { Col, Form } from "react-bootstrap";
import { FeedBack } from "../Feedback";

export function TipoCuenta({ value, onChange, md, disabled }) {
    return <Form.Group style={{ fontFamily: "'Roboto', sans-serif" }} as={Col} className="mb-3" controlId="label_tipoCuenta" md={md}>
        <Form.Label>Tipo de Cuenta</Form.Label>
        <Form.Select
            required
            name="tipoCuenta"
            onChange={event => onChange(event)}
            value={value}
            disabled={disabled ? true : false} >
            <option value="">Elige el tipo de cuenta...</option>
            <option value="AHORROS">AHORROS</option>
            <option value="CORRIENTE">CORRIENTE</option>
        </Form.Select>
        <FeedBack />
    </Form.Group>
};