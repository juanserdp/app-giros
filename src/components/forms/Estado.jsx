import { Col, Form } from "react-bootstrap";
import { FeedBack } from "../Feedback";

export function Estado({ value, onChange, md, disabled }) {
    return <Form.Group as={Col} className="mb-3" controlId="label_estado" md={md}>
        <Form.Label>Estado</Form.Label>
        <Form.Select
            required
            name="estado"
            onChange={event => onChange(event)}
            value={value}
            disabled={disabled ? true : false} >
            <option value="">Elige el estado...</option>
            <option value="ACTIVO" >ACTIVO</option>
            <option value="INACTIVO">INACTIVO</option>
        </Form.Select>
        <FeedBack />
    </Form.Group>
};
