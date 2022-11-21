import { Col, FloatingLabel, Form } from "react-bootstrap";
import { FeedBack } from "../Feedback";

export function MensajeCampo({
    value,
    onChange,
    isNewMensaje,
    autoFocusMensaje
}) {

    const styleMensaje = {
        textAlign: "left",
        fontFamily: "'Roboto', sans-serif"
    };
    const labelTextArea = (isNewMensaje) ? "Nuevo Mensaje" : "Editar Mensaje";
    
    return (
        <Form.Group
        
            as={Col}
            className="mb-3"
            md="12"
            controlId="label_mensaje"
            style={styleMensaje}>
            <FloatingLabel
                controlId="label_textarea"
                label={labelTextArea}
                className="mb-3">
                <Form.Control
                    required
                    name="mensaje"
                    as="textarea"
                    autoFocus={autoFocusMensaje}
                    onChange={(e) => onChange(e)}
                    value={value} />
                <FeedBack />
            </FloatingLabel>
        </Form.Group>
    );
};