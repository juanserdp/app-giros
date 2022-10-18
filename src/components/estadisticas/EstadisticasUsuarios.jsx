import { useQuery } from "@apollo/client";
import { Backdrop,  CircularProgress } from "@mui/material";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { useCargarDataChart } from "../../hooks/useCargarDataChart";
import { OBTENER_DATOS } from "../../services/apollo/gql/obtenerDatos";
import { OBTENER_DATOS_POR_ASESOR } from "../../services/apollo/gql/obtenerDatosPorAsesor";
import { Sesion } from "../../util/Sesion";

export function EstadisticasUsuarios() {
  const sesion = new Sesion();
  const rol = sesion.getRol();
  const id = sesion.getUid();

  // DEFINO EL ESTADO INICIAL PARA LOS DATOS
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

  // QUERYS
  const { loading, data, error } = useQuery(
    rol === "ADMINISTRADOR" ? OBTENER_DATOS : OBTENER_DATOS_POR_ASESOR,
    { variables: { id } }
  );

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
  if (loading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  // LO QUE MUESTRA EN CASO DE ERROR
  if (error) return `Error! ${error}`;
  return (
    <>
      <div className="p-0 text-center mb-3">
        <Row>{hora}</Row>
        <Row className="justify-content-center mb-3">
          <p>En esta seccion podras ver las estadisticas de tu aplicación.</p>
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
            }}
          >
            <Chart
              chartType="Bar"
              width={rol === "ADMINISTRADOR" ? "100%" : "80%"}
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
                  subtitle:
                    "Muestra la cantidad de usuarios y asesores registrados en la aplicacion",
                },
              }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
