import { Card, CardContent } from "@mui/material";
import { currencyFormatterWithDecimals } from "../../util/currencyFormatter";
import { Acordion } from "../Acordion";


const textStyleH3 = {
    fontWeight: "400",
    fontSize: "2rem",
    fontFamily: "'Roboto Slab', serif",
    color: "white",
    verticalAlign: "center"
};



export function GananciaMonto({ valor, tasaVenta, tasaCompra }) {

    const ganancia = (tasaVenta - tasaCompra) / tasaVenta;

    return (
        <Card className="mb-3 card-container-saldo rounded" >
            <CardContent className="p-0 ">
                <Acordion titulo="Ganancia">
                    Aquí veras la ganancia que tendras segun la tasa actual de compra, tu tasa 
                    actual de venta y el valor de la recarga.
                </Acordion>
              
                <h3 style={textStyleH3} >{currencyFormatterWithDecimals.format(valor * ganancia)} COP</h3>
                <h3 style={textStyleH3} >({currencyFormatterWithDecimals.format(valor / tasaVenta * ganancia)} VES)</h3>
                <br/>
            </CardContent>
        </Card>
    )
}