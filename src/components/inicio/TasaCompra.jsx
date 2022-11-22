import { Card, CardContent } from "@mui/material";

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

const cardStyle = {
    // height: "220px"
};

export function TasaCompra({
    tasa
}) {
    return (
        <Card className="card-container-tasa mb-3 rounded" style={cardStyle}>
            <CardContent className="p-0">
                <h2 className="mb-4 py-2" style={textStyleH2}>Tasa de Compra</h2>
                <br />
                <h3 className="mb-4" style={textStyleH3}>{tasa}</h3>
            </CardContent>
        </Card>
    )
}