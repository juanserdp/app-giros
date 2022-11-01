import { Button, Col, Form, InputGroup } from "react-bootstrap";
import { FeedBack } from "../Feedback";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

export function Clave({ value, onChange, md }) {

    const [visibilidad, setVisibilidad] = useState(false);

    return <Form.Group as={Col} md={md} className="mb-3" controlId="label_clave">
        <Form.Label>Contraseña</Form.Label>
        <InputGroup >
            <Form.Control
                required
                name="clave"
                onChange={event => onChange(event, "clave")}
                value={value}
                type={visibilidad ? "text" : "password"}
                placeholder="Ingrese la contraseña" />
            <Button
                id="button-addon2"
                onClick={() => setVisibilidad(!visibilidad)}>
                {(visibilidad) ? (<VisibilityOffIcon color="light" />) : (<VisibilityIcon color="light" />)}
            </Button>
            <FeedBack />
        </InputGroup>
    </Form.Group>
};