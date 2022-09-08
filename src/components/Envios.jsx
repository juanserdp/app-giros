import { Button, Col, Form, Row } from "react-bootstrap";

export function Envios() {
    return (
        <>
            <Form className="my-3 p-0">
                <p className="mb-3 mx-5">Aqui puedes configurar los valores minimos para hacer giros y para hacer recargas</p>

                <Form.Group
                    as={Col}
                    md="4"
                    className="mb-3 mx-5"
                >
                    <Form.Label>Giros</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Valor minimo para hacer giros..."
                        autoFocus
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group
                    as={Col}
                    md="4"
                    className="mb-3 mx-5"
                >
                    <Form.Label>Recargas</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Valor minimo para hacer recargar..."
                        autoFocus
                    >
                    </Form.Control>
                </Form.Group>
                <Row className="mb-3 mx-5">
                    <Col md="12">
                        <Button>Editar</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}