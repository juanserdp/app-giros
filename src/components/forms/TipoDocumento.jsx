import { Col, Form } from "react-bootstrap";
import { FeedBack } from "../Feedback";

export function TipoDocumento({ value, onChange, md, disabled }) {
    return <Form.Group as={Col} className="mb-3" controlId="label_tipoDocumento" md={md}>
        <Form.Label>Tipo Documento</Form.Label>
        <Form.Select
            required
            name="tipoDocumento"
            onChange={event => onChange(event)}
            value={value}
            disabled={disabled ? true : false} >
            <option value="">Elige el tipo de documento...</option>
            <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
            <option value="Cedula de Ciudadania">Cédula de Ciudadanía</option>
        </Form.Select>
        <FeedBack />
    </Form.Group>
};
