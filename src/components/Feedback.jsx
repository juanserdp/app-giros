import React from "react";
import { Form } from "react-bootstrap";

export function FeedBack() {
    return (
        <React.Fragment>
            <Form.Control.Feedback type="invalid">
                Este campo es obligatorio
            </Form.Control.Feedback>
            <Form.Control.Feedback>Okey!</Form.Control.Feedback>
        </React.Fragment>
    )
}