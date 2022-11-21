import { Col, Form } from "react-bootstrap";
import { FeedBack } from "../Feedback";

export function EstadoGiro({ value, onChange, md, disabled }) {
    return <Form.Group style={{ fontFamily: "'Roboto', sans-serif" }} as={Col} className="mb-3" controlId="label_estadoGiro" md={md}>
        <Form.Label>Estado del Giro</Form.Label>
        <Form.Select
            required
            name="estadoGiro"
            onChange={event => onChange(event)}
            value={value}
            disabled={disabled ? true : false} >
            <option value="">Elige estado...</option>
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="EN PROCESO">EN PROCESO</option>
            <option value="COMPLETADO">COMPLETADO</option>
        </Form.Select>
        <FeedBack />
    </Form.Group>
};