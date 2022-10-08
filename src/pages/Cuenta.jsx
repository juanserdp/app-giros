// COMPONENTES LIBRERIAS
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Avatar, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Backdrop, CircularProgress } from "@mui/material";

// HOOKS
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

// CONSULTAS
import { OBTENER_ASESOR_POR_ID } from "../services/apollo/gql/asesor/obtenerAsesorPorId";
import { OBTENER_USUARIO_POR_ID } from "../services/apollo/gql/usuario/obtenerUsuarioPorId";

// FUNCIONES
import { Sesion } from "../util/Sesion";

// COMPONENTES
import { FormClave } from "../components/configuracion/FormClave";
import { NavBar } from "../components/NavBar";
import { FormEnvios } from "../components/configuracion/FormEnvios";
import { EstadisticasGiros } from "../components/EstadisticasGiros";
import { EstadisticasUsuarios } from "../components/EstadisticasUsuarios";
import { FormDatosPersonales } from "../components/configuracion/FormDatosPersonales";

// ICONOS MATERIAL
import PasswordIcon from '@mui/icons-material/Password';
import BarChartIcon from '@mui/icons-material/BarChart';
import ReplyIcon from '@mui/icons-material/Reply';
import PeopleIcon from '@mui/icons-material/People';
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { EDITAR_ASESOR } from "../services/apollo/gql/asesor/editarAsesor";
import { EDITAR_USUARIO } from "../services/apollo/gql/usuario/editarUsuario";
import { dateJSONupdate } from "../util/dateJSONupdate";
import swal from "sweetalert";
import { handleError } from "../util/handleError";
import { useLoadDataFromDB } from "../hooks/useLoadDataFromDB";

export default function Cuenta() {
    // INSTANCIAS DE CLASE
    const sesion = new Sesion();

    // CONSTANTES
    const id = sesion.getUid();
    const rol = sesion.getRol();
    const initialStateDatosPersonales = {
        nombres: "",
        apellidos: "",
        tipoDocumento: "",
        numeroDocumento: ""
    };
    const initialStateClave = {
        clave: ""
    };
    const initialValorMinimoGiro = {
        valorMinimoGiro: ""
    };

    // CONSULTAS
    const { loading, data, error, refetch } = useQuery((rol === "USUARIO") ? OBTENER_USUARIO_POR_ID : OBTENER_ASESOR_POR_ID, { variables: { id } });
    // MUTACIONES
    const [editarAsesor, editarAsesorInfo] = useMutation(EDITAR_ASESOR);
    const [editarUsuario, editarUsuarioInfo] = useMutation(EDITAR_USUARIO);
    const loadingEditar = editarAsesorInfo.loading || editarUsuarioInfo.loading;

    // ESTADOS
    const [open, setOpen] = useState(false); // ABRIR LA PESTAÑA ESTADISTICAS
    const [datosPersonales, setDatosPersonales] = useLoadDataFromDB(initialStateDatosPersonales, data, loading);
    const [valorMinimoGiro, setValorMinimoGiro] = useLoadDataFromDB(initialValorMinimoGiro, data, loading);
    const [clave, setClave] = useState(initialStateClave);
    const [option, setOption] = useState(null);

    // MANEJADORES
    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = async (event) => {
        const camposParaEditar = dateJSONupdate(Object.entries(data)[0][1], {
            ...datosPersonales, ...clave, ...valorMinimoGiro
        });
        console.log(camposParaEditar);
        if (Object.keys(camposParaEditar).length > 0) {
            if (rol === "ASESOR") {
                await editarAsesor({
                    variables: {
                        id,
                        asesor: { ...camposParaEditar }
                    },
                    onCompleted: () => {
                        // EXITO
                        swal("Editado!", "El asesor ha sido editado.", "success");
                        refetch();
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                });
            }
            else if (rol === "USUARIO") {
                await editarUsuario({
                    variables: {
                        id,
                        usuario: camposParaEditar
                    },
                    onCompleted: () => {
                        // EXITO
                        swal("Editado!", "El usuario ha sido editado.", "success");
                        refetch();
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                });
            }
        }
        else swal("Error!", "No ha editado ningun campo!", "error");
    };
    if (loading) return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
    if (error) return (
        `Error! ${error}`
    );
    return (
        <>
            <NavBar />
            <Container className="my-3" >
                <Row className="mb-3">
                    <Col md="3" >
                        <Row className="my-3 justify-content-center">
                            <Avatar style={{ width: "150px", height: "150px", borderRadius: "100%" }}>{
                                (datosPersonales.apellidos) ? (datosPersonales.nombres["0"].toUpperCase() + datosPersonales.apellidos["0"].toUpperCase()) : ""
                            }</Avatar>
                        </Row>
                        <Row>
                            <List sx={{
                                width: '100%',
                                maxWidth: 360,
                                bgcolor: 'background.paper',
                            }} component="nav" aria-label="mailbox folders">

                                {(rol === "ASESOR" || rol === "ADMINISTRADOR") ? (<><ListItem
                                    disablePadding
                                    onClick={handleClick}>
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
                                            <ListItemButton sx={{ pl: 4 }} onClick={() => setOption(function () { return (<EstadisticasGiros />) })}>
                                                <ListItemIcon>
                                                    <ReplyIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Giros" />
                                            </ListItemButton>
                                            <ListItemButton sx={{ pl: 4 }} onClick={() => setOption(function () { return (<EstadisticasUsuarios />) })}>
                                                <ListItemIcon>
                                                    <PeopleIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Usuarios" />
                                            </ListItemButton>
                                        </List>
                                    </Collapse></>) : null}



                                {(rol === "ASESOR") ? (<ListItem disablePadding onClick={() => setOption(<>
                                    <FormEnvios
                                        valorMinimoGiro={valorMinimoGiro}
                                        setValorMinimoGiro={setValorMinimoGiro}
                                    /></>)}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ReplyIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Envios" />
                                    </ListItemButton>
                                </ListItem>) : null}

                                <ListItem disablePadding onClick={() => setOption(<>
                                    <FormClave
                                        clave={clave}
                                        setClave={setClave} />
                                </>)}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PasswordIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Contraseña" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem
                                    disablePadding
                                    onClick={() => setOption(<FormDatosPersonales
                                        datosPersonales={datosPersonales}
                                        setDatosPersonales={setDatosPersonales}
                                    />)}>
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
                    <Col md="9" >
                        {(option) ? (<>{option}<Button className="m-3" variant="primary" onClick={handleSubmit} disabled={loadingEditar}>
                            {(loadingEditar) ? (
                                <><Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> &nbsp;Enviando...</>
                            ) : "Editar"}
                        </Button></>) : null}
                    </Col>
                </Row>
            </Container >
        </>
    );
}