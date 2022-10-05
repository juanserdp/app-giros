import { useQuery } from "@apollo/client";
import { Backdrop, Card, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { useCargarDataChart } from "../hooks/useCargarDataChart";
import { OBTENER_DATOS } from "../services/apollo/gql/obtenerDatos";
import { currencyFormatter } from "../util/currencyFormatter";


export function EstadisticasUsuarios() {

    // DEFINO EL ESTADO INICIAL PARA LOS DATOS
    const initialStateAsesorData = {
        asesores: [],
        usuarios: [],
        giros: [{
            valorGiro: 0,
            fechaEnvio: ""
        }]
    };
    const [hora, setHora] = useState((new Date()).toLocaleTimeString());

    // QUERYS
    const { loading, data, error } = useQuery(OBTENER_DATOS);

    // ESTADOS
    const [datos] = useCargarDataChart(initialStateAsesorData, data);

    // FUNCIONES
    const totalGirosPorMes = (giros) => {
        // VECTOR VACIO CON LOS DATOS DEL GRAFICO
        const dataChart = [
            ["Year", "Valor"],
            ["Ene", 0],
            ["Feb", 0],
            ["Mar", 0],
            ["Abr", 0],
            ["May", 0],
            ["Jun", 0],
            ["Jul", 0],
            ["Ago", 0],
            ["Sep", 0],
            ["Oct", 0],
            ["Nov", 0],
            ["Dic", 0],
        ];
        // RECORREMOS EL VECTOR
        for (let giro of giros) {
            // USAMOS LA FECHA PAR EXTRAER EL MES Y USAR EL AÑO ACTUAL
            giro.fechaEnvio.replace(/\b(\d+)\/(\d+)\/(\d+)\b/, (coincidencia, dia, mes, ano) => {
                // SI EL GIRO ESTA EN EL AÑO ACTUAL ENTONCES LO CONSIDERA
                if ((new Date()).getFullYear().toString() === ano) {
                    // EL VALOR DEL GIRO SE AGREGA AL NUMERO DEL MES DEL VECTOR DATACHART
                    dataChart[Number(mes)][1] += giro.valorGiro;
                }
            });
        }
        return dataChart;
    }

    const enviosHoy = () => {
        // CREAMOS UN VARIABLE QUE CUENTA LOS GIROS
        let girosContador = 0;

        // CREAMOS UN VARIABLE QUE GUARDA LA SUMATORIA DEL VALOR DE CADA GIRO
        let valorGiros = 0;

        // USAMOS UN VAR AUX PARA GUARDAR LOS GIROS TOTALES
        const giros = datos.giros;

        // RECORREMOS EL VECTOR GIROS
        for (const giro of giros) {
            giro.fechaEnvio.replace(/\b(\d+)\/(\d+)\/(\d+)\b/, (coincidencia, dia, mes, ano) => {
                // SI LA FECHA DEL GIRO CORRESPONDE A LA FECHA DE HOY EJECUTARA UNA LOGICA
                if ((new Date()).toLocaleDateString() === coincidencia) {
                    // AGREGA EL VALOR DEL GIRO 
                    girosContador++;
                    // AÑADIMOS EL VALOR DEL GIRO
                    valorGiros += giro.valorGiro;
                }
            });
        }
        return {
            longitud: girosContador,
            total: currencyFormatter.format(valorGiros)
        }
    }
    setInterval(() => {
        setHora(new Date().toLocaleTimeString());
    }, 1000);

    // LO QUE MUESTRA CUANDO CARGA
    if (loading) return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
    // LO QUE MUESTRA EN CASO DE ERROR
    if (error) return (
        `Error! ${error}`
    );
    return (
        <>

            <div className="p-0 text-center mb-3">
                <Row>
                    {hora}
                </Row>
                <Row className="justify-content-center mb-3">
                    <p>
                        En esta seccion podras ver las estadisticas de tu aplicación.
                    </p>
                </Row>
                <Row className="justify-content-center mb-3 px-3"  >
                    <Col
                        md="12"
                        style={{
                            scrollBehavior: "auto",
                            display: "inline-block",
                            whiteSpace: "nowrap",
                            overflowX: "auto",
                            overflowY: "hidden"
                        }}>
                        <Chart
                            chartType="Bar"
                            width="100%"
                            height="400px"
                            data={[
                                ["", "Asesores", "Usuarios"],
                                ["Actual", datos.asesores.length, datos.usuarios.length],
                            ]}
                            options={{
                                chart: {
                                    title: "Numero de Usuarios",
                                    subtitle: "Muestra la cantidad de usuarios y asesores registrados en la aplicacion",
                                },
                            }}
                        />
                    </Col>
                </Row>
            </div>
        </>
    )
}