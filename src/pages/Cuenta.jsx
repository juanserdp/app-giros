// COMPONENTES LIBRERIAS
import { Col, Container, Row } from "react-bootstrap";
import {
  Avatar,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// HOOKS
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
// CONSULTAS
import { OBTENER_ASESOR_POR_ID } from "../services/apollo/gql/asesor/obtenerAsesorPorId";
import { OBTENER_USUARIO_POR_ID } from "../services/apollo/gql/usuario/obtenerUsuarioPorId";
// COMPONENTES
import { FormClave } from "../components/configuracion/FormClave";
import { FormEnvios } from "../components/configuracion/FormEnvios";
import { EstadisticasGiros } from "../components/estadisticas/EstadisticasGiros";
import { EstadisticasUsuarios } from "../components/estadisticas/EstadisticasUsuarios";
import { FormDatosPersonales } from "../components/configuracion/FormDatosPersonales";
// ICONOS MATERIAL
import PasswordIcon from "@mui/icons-material/Password";
import BarChartIcon from "@mui/icons-material/BarChart";
import ReplyIcon from "@mui/icons-material/Reply";
import PeopleIcon from "@mui/icons-material/People";
import { blue } from "@mui/material/colors";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { CircularProgressAnimation } from "../components/CircularProgressAnimation";
import { ErrorFetch } from "../components/errors/ErrorFetch";
import { useSesionContext } from "../providers/SesionProvider";

export default function Cuenta() {

  // CONSTANTES
  const styleAvatar = {
    width: "150px",
    height: "150px",
    borderRadius: "100%",
  };

  const styleList = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  const initial = {
    usuario: {
      nombres: "",
      apellidos: "",
      tipoDocumento: "",
      numeroDocumento: "",
      clave: "",
      valorMinimoGiro: ""
    }
  };

  // HOOKS
  const { sesionData: { id, rol } } = useSesionContext();
  const { loading, data, error, refetch } = useQuery(
    rol === "USUARIO" ? OBTENER_USUARIO_POR_ID : OBTENER_ASESOR_POR_ID,
    { variables: { id } }
  );
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState(null);

  const atributoNombreRol = rol === "USUARIO" ? "usuario" : "asesor";

  const datosPersonales = data || initial;

  // MANEJADORES
  const handleClick = () => setOpen(!open);

  if (loading) return <CircularProgressAnimation />

  if (error) return <ErrorFetch />

  return (
    <Container className="my-3">
      <Row className="mb-3">
        <Col md="3">

          <Row className="my-3 justify-content-center">
            <Avatar
              sx={{ bgcolor: blue[600] }}
              style={styleAvatar}>
              {(datosPersonales) ?
                datosPersonales?.[atributoNombreRol]?.nombres["0"]?.toUpperCase() +
                datosPersonales?.[atributoNombreRol]?.apellidos["0"]?.toUpperCase() :
                null}
            </Avatar>
          </Row>

          <Row>
            <List
              sx={styleList}
              component="nav"
              aria-label="mailbox folders">
              {rol === "ASESOR" || rol === "ADMINISTRADOR" ? (
                <React.Fragment>
                  <ListItem disablePadding onClick={handleClick}>
                    <ListItemButton>
                      <ListItemIcon>
                        <BarChartIcon />
                      </ListItemIcon>
                      <ListItemText primary="Estadisticas" />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </ListItem>

                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => setOption(<EstadisticasGiros />)}>

                        <ListItemIcon>
                          <ReplyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Giros" />
                      </ListItemButton>
                      <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => setOption(<EstadisticasUsuarios />)}>

                        <ListItemIcon>
                          <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Usuarios" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </React.Fragment>
              ) : null}

              {rol === "ASESOR" ? (
                <ListItem
                  disablePadding
                  onClick={() => setOption(
                    <FormEnvios
                      datosPersonalesUsuario={data?.[atributoNombreRol]}
                      refetch={refetch} />)}>

                  <ListItemButton>
                    <ListItemIcon>
                      <ReplyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Envios" />
                  </ListItemButton>
                </ListItem>
              ) : null}

              <ListItem
                disablePadding
                onClick={() => setOption(
                  <FormClave />)}>

                <ListItemButton>
                  <ListItemIcon>
                    <PasswordIcon />
                  </ListItemIcon>
                  <ListItemText primary="Contraseña" />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                onClick={() => setOption(
                  <FormDatosPersonales
                    datosPersonalesUsuario={data?.[atributoNombreRol]}
                    refetch={refetch} />)}>

                <ListItemButton>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Datos Personales" />
                </ListItemButton>
              </ListItem>
            </List>
          </Row>

        </Col>
        <Col md="9">
          {option}
        </Col>
      </Row>
    </Container>
  );
};