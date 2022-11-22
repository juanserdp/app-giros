import { Card, CardContent } from "@mui/material";
import { currencyFormatter } from "../../util/currencyFormatter";

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
    height: "220px"
};

export function GananciaMonto({ valor, tasaVenta, tasaCompra }) {

    const ganancia = (tasaVenta - tasaCompra) / tasaVenta;

    return (
        <Card className="mb-3 card-container-saldo rounded" style={cardStyle}>
            <CardContent className="p-0 ">
                <h2 className="mb-3 py-2" style={textStyleH2}>Ganancia</h2>
                <br />
                <h3 style={textStyleH3} >{currencyFormatter.format(valor * ganancia) } COP</h3>
                <h3 style={textStyleH3} >({currencyFormatter.format(valor / tasaVenta * ganancia)} VES)</h3>
            </CardContent>
        </Card>
    )
}