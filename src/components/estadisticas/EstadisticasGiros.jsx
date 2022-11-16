import { useQuery } from "@apollo/client";
import { Paper } from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { styleH3, styleParrafo } from "../../assets/styles/fuentes";
import { useCargarDataChart } from "../../hooks/useCargarDataChart";
import { useSesionContext } from "../../providers/SesionProvider";
import { OBTENER_DATOS } from "../../services/apollo/gql/obtenerDatos";
import { OBTENER_DATOS_POR_ASESOR } from "../../services/apollo/gql/obtenerDatosPorAsesor";
import { currencyFormatter } from "../../util/currencyFormatter";
import { CircularProgressAnimation } from "../CircularProgressAnimation";
import { ErrorFetch } from "../errors/ErrorFetch";

export function EstadisticasGiros() {

  // CONSTANTES
  const initialStateAsesorData = {
    asesores: [],
    usuarios: [],
    giros: [
      {
        valorGiro: 0,
        fechaEnvio: "",
      },
    ],
  };

  // HOOKS
  const { sesionData: { id, rol } } = useSesionContext();
  const { loading, data, error } = useQuery(
    rol === "ADMINISTRADOR" ? OBTENER_DATOS : OBTENER_DATOS_POR_ASESOR,
    { variables: { id } }
  );
  const [datos] = useCargarDataChart(initialStateAsesorData, data);

  // FUNCIONES
  const totalGirosPorMes = (giros) => {
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
    for (let giro of giros) {
      giro.fechaEnvio.replace(
        /\b(\d+)\/(\d+)\/(\d+)\b/,
        (coincidencia, mes, dia, ano) => {
          if (new Date().getFullYear().toString() === ano) {
            dataChart[Number(mes)][1] += giro.valorGiro;
          }
        });
    }
    return dataChart;
  };

  const enviosHoy = () => {
    let numeroGirosHoy = 0;
    let valorTotalGirosHoy = 0;
    const giros = datos.giros;
    giros.forEach((giro) => {
      giro.fechaEnvio.replace(/\b(\d+)\/(\d+)\/(\d+)\b/, (coincidencia) => {
        if (new Date().toLocaleDateString() === coincidencia) {
          numeroGirosHoy = numeroGirosHoy + 1;
          valorTotalGirosHoy = valorTotalGirosHoy + giro.valorGiro;
        }
      });
    })
    return {
      longitud: numeroGirosHoy,
      total: currencyFormatter.format(valorTotalGirosHoy),
    };
  };

  if (loading) return <CircularProgressAnimation />

  if (error) return <ErrorFetch />

  return (
    <React.Fragment>
      <p style={styleParrafo}>En esta seccion podras ver las estadisticas de tu aplicación sobre los giros realizados el dia de hoy.</p>
      <Row className="justify-content-center mb-3 text-center">
        <Col
          md="6"
          className="d-flex mb-3"
          style={{
            justifyContent: "center",
          }}>
          <Paper elevation={3}>
            <div
              style={styleH3}
              className="p-3">
              Cantidad de giros:
              <br />
              {enviosHoy().longitud}
            </div>
          </Paper>
        </Col>

        <Col
          className="d-flex mb-3"
          md="6"
          style={{
            justifyContent: "center",
          }}>
          <Paper elevation={3}>
            <div
              style={styleH3}
              className="p-3">
              Valor total de giros:
              <br />
              {enviosHoy().total}
            </div>
          </Paper>
        </Col>

      </Row>
      <p style={styleParrafo}>En esta seccion podras ver las estadisticas de tu aplicación sobre los giros realizados el año presente.</p>
      <Row className="justify-content-center mb-3">
        <Col
          md="12"
          style={{
            scrollBehavior: "auto",
            display: "inline-block",
            whiteSpace: "nowrap",
            overflowX: "auto",
            overflowY: "hidden",
          }}
        >
          <Paper elevation={3} className="p-3">
            <Chart
              chartType="AreaChart"
              width="100%"
              height="400px"
              data={totalGirosPorMes(data.giros)}
              options={{
                title: "Valor en Pesos COP",
                hAxis: { title: "Mes", titleTextStyle: { color: "#333" } },
                vAxis: { minValue: 0 },
                chartArea: { width: "70%", height: "70%" },
              }} />
          </Paper>
          <br />
        </Col>
      </Row>
    </React.Fragment>
  );
}
