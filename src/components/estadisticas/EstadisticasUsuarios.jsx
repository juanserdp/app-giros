import { useQuery } from "@apollo/client";
import { Paper } from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { styleParrafo } from "../../assets/styles/fuentes";
import { useCargarDataChart } from "../../hooks/useCargarDataChart";
import { useSesionContext } from "../../providers/SesionProvider";
import { OBTENER_DATOS } from "../../services/apollo/gql/obtenerDatos";
import { OBTENER_DATOS_POR_ASESOR } from "../../services/apollo/gql/obtenerDatosPorAsesor";
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

  // HOOKS
  const { sesionData: { id, rol } } = useSesionContext();
  const { loading, data, error } = useQuery(
    rol === "ADMINISTRADOR" ? OBTENER_DATOS : OBTENER_DATOS_POR_ASESOR,
    { variables: { id } }
  );
  const [datos] = useCargarDataChart(initialStateAsesorData, data);

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
                chartType="PieChart"
                width={rol === "ADMINISTRADOR" ? "80%" : "80%"}
                height="400px"
                data={[
                  ["Task", "Hours per Day"],
                  ["Usuarios", datos.usuarios.length],
                  ["Asesores", (rol === "ADMINISTRADOR") ? (datos.asesores.filter(asesor => {
                    if (asesor.numeroDocumento !== "admin" && asesor.numeroDocumento !== "operario") {
                      return asesor;
                    }
                  })).length : 0]]}
                options={{
                  title: "Numero de Usuarios"
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
