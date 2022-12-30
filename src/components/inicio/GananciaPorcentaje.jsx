import { Card, CardContent } from "@mui/material";
import { Acordion } from "../Acordion";

const textStyleH3 = {
    fontWeight: "400",
    fontSize: "2rem",
    fontFamily: "'Roboto Slab', serif",
    color: "white",
    verticalAlign: "center"
};



export function GananciaPorcentaje({ tasaCompra, tasaVenta }) {

    const ganancia = (tasaVenta - tasaCompra) / tasaVenta * 100;

    return (
        <Card className="mb-3 card-container-saldo rounded" >
            <CardContent className="p-0 ">
                <Acordion titulo="Ganancia">
                    Aquí veras la ganancia que tendras en porcentaje segun la tasa actual de compra, tu tasa
                    actual de venta y el valor de la recarga.
                </Acordion>
                <h3 style={textStyleH3} >{Number(ganancia.toFixed(3))} %</h3>
                <br />
            </CardContent>
        </Card>
    )
}