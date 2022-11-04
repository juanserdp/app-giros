import { useQuery } from "@apollo/client";
import { Backdrop, CircularProgress, Paper } from "@mui/material";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { styleParrafo } from "../../assets/styles/fuentes";
import { useCargarDataChart } from "../../hooks/useCargarDataChart";
import { useSesionContext } from "../../providers/SesionProvider";
import { OBTENER_DATOS } from "../../services/apollo/gql/obtenerDatos";
import { OBTENER_DATOS_POR_ASESOR } from "../../services/apollo/gql/obtenerDatosPorAsesor";
import { Sesion } from "../../util/Sesion";
import { CircularProgressAnimation } from "../CircularProgressAnimation";
import { ErrorFetch } from "../errors/ErrorFetch";

export function EstadisticasUsuarios() {

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
  const [hora, setHora] = useState(new Date().toLocaleTimeString());

  // HOOKS
  const { sesionData: { id, rol } } = useSesionContext();
  const { loading, data, error } = useQuery(
    rol === "ADMINISTRADOR" ? OBTENER_DATOS : OBTENER_DATOS_POR_ASESOR,
    { variables: { id } }
  );
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
      giro.fechaEnvio.replace(
        /\b(\d+)\/(\d+)\/(\d+)\b/,
        (coincidencia, dia, mes, ano) => {
          // SI EL GIRO ESTA EN EL AÑO ACTUAL ENTONCES LO CONSIDERA
          if (new Date().getFullYear().toString() === ano) {
            // EL VALOR DEL GIRO SE AGREGA AL NUMERO DEL MES DEL VECTOR DATACHART
            dataChart[Number(mes)][1] += giro.valorGiro;
          }
        }
      );
    }
    return dataChart;
  };

  setInterval(() => {
    setHora(new Date().toLocaleTimeString());
  }, 1000);

  // LO QUE MUESTRA CUANDO CARGA
  if (loading) return <CircularProgressAnimation />

  // LO QUE MUESTRA EN CASO DE ERROR
  if (error) return <ErrorFetch error={error} />;

  return (
    <React.Fragment>
      <p style={styleParrafo}>En esta seccion podras ver las estadisticas de tu aplicación sobre los usuarios.</p>
      <div className="p-0 text-center mb-3">
        <Row className="justify-content-center mb-3">
        </Row>
        <Row className="justify-content-center mb-3 px-3">
          <Col
            md="12"
            style={{
              scrollBehavior: "auto",
              display: "inline-block",
              whiteSpace: "nowrap",
              overflowX: "auto",
              overflowY: "hidden",
            }}>
            <Paper elevation={3} className="p-3">
              <Chart
                chartType="Bar"
                width={rol === "ADMINISTRADOR" ? "80%" : "80%"}
                height="400px"
                data={
                  rol === "ADMINISTRADOR"
                    ? [
                      ["", "Asesores", "Usuarios"],
                      ["Actual", datos.asesores.length, datos.usuarios.length],
                    ]
                    : [
                      ["", "Usuarios"],
                      ["Actual", datos.usuarios.length],
                    ]
                }
                options={{
                  chart: {
                    title: "Numero de Usuarios",
                  },
                }}
              />
            </Paper>
            <br />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}
