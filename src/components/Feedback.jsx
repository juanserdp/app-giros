import { Form } from "react-bootstrap";

export function FeedBack() {
    return (
        <>
            <Form.Control.Feedback type="invalid">
                Este campo es obligatorio
            </Form.Control.Feedback>
            <Form.Control.Feedback>Okey!</Form.Control.Feedback>
        </>
    )
}