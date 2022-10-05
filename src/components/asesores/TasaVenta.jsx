import { Card, CardContent, Skeleton } from "@mui/material";
import { Button, Col, Row } from "react-bootstrap";

const textStyleH2 = {
    fontWeight: "500",
    fontSize: "1.5rem",
    fontFamily: "'Roboto Slab', serif",
    color: "white",
    backgroundColor: "#0d6efd",
};
const textStyleH3 = {
    fontWeight: "400",
    fontSize: "2rem",
    fontFamily: "'Roboto Slab', serif",
    color: "white",
    verticalAlign: "center"
};

const buttonStyle = {
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
    width: "100%"
};

const cardStyle = {
    // height: "220px"
};

export function TasaVenta({
    tasa,
    handleEditarTasa,
    loading,
    rol
}) {
    return (
        <Card className="card-container-tasa mb-3 rounded" style={cardStyle}>
            <CardContent className="p-0">
                <h2
                    className="mb-4 py-2"
                    style={textStyleH2} >
                    Tasa de Venta
                </h2>
                <br />
                {(loading) ? (
                    <Skeleton height="60px" />
                ) : (<h3
                    className="mb-4"
                    style={textStyleH3} >
                    {tasa || 0}
                </h3>
                )}
                {(rol === "ASESOR") ? (
                    <Row >
                        <Col md="12">
                            <Button style={buttonStyle} onClick={handleEditarTasa}>Editar</Button>
                        </Col>
                    </Row>
                ) : null}
            </CardContent>
        </Card>
    )
}