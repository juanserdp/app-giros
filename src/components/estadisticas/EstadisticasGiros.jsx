import { useQuery } from "@apollo/client";
import { Backdrop, Card, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { useCargarDataChart } from "../../hooks/useCargarDataChart";
import { OBTENER_DATOS } from "../../services/apollo/gql/obtenerDatos";
import { OBTENER_DATOS_POR_ASESOR } from "../../services/apollo/gql/obtenerDatosPorAsesor";
import { currencyFormatter } from "../../util/currencyFormatter";
import { Sesion } from "../../util/Sesion";

export function EstadisticasGiros() {
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

  const enviosHoy = () => {
    // CREAMOS UN VARIABLE QUE CUENTA LOS GIROS
    let girosContador = 0;

    // CREAMOS UN VARIABLE QUE GUARDA LA SUMATORIA DEL VALOR DE CADA GIRO
    let valorGiros = 0;

    // USAMOS UN VAR AUX PARA GUARDAR LOS GIROS TOTALES
    const giros = datos.giros;

    // RECORREMOS EL VECTOR GIROS
    for (const giro of giros) {
      giro.fechaEnvio.replace(
        /\b(\d+)\/(\d+)\/(\d+)\b/,
        (coincidencia, dia, mes, ano) => {
          // SI LA FECHA DEL GIRO CORRESPONDE A LA FECHA DE HOY EJECUTARA UNA LOGICA
          if (new Date().toLocaleDateString() === coincidencia) {
            // AGREGA EL VALOR DEL GIRO
            girosContador++;
            // AÑADIMOS EL VALOR DEL GIRO
            valorGiros += giro.valorGiro;
          }
        }
      );
    }
    return {
      longitud: girosContador,
      total: currencyFormatter.format(valorGiros),
    };
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

          <Col
            md="6"
            className="d-flex mb-3"
            style={{
              justifyContent: "center",
            }}
          >
            <Card
              className="d-flex  bg-body"
              style={{
                borderRadius: "100%",
                width: "250px",
                height: "250px",
                margin: "",
              }}
            >
              <span
                style={{
                  flex: "auto",
                  alignSelf: "center",
                  fontSize: "50px",
                  margin: "auto",
                }}
              >
                <span>Giros:</span>
                <br />
                {enviosHoy().longitud}
              </span>
            </Card>
          </Col>
          <Col
            className="d-flex mb-3"
            md="6"
            style={{
              justifyContent: "center",
            }}
          >
            <Card
              className="d-flex bg-body"
              style={{
                borderRadius: "100%",
                width: "250px",
                height: "250px",
              }}
            >
              <span
                style={{
                  flex: "auto",
                  alignSelf: "center",
                  fontSize: "30px",
                }}
              >
                <span>Total:</span>
                <br />
                {enviosHoy().total}
              </span>
            </Card>
          </Col>
        </Row>

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
            <Chart
              chartType="AreaChart"
              width="100%"
              height="400px"
              data={totalGirosPorMes(data.giros)}
              options={{
                title: "Valor Total de Giros por Mes",
                hAxis: { title: "Mes", titleTextStyle: { color: "#333" } },
                vAxis: { minValue: 0 },
                chartArea: { width: "70%", height: "70%" },
              }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
