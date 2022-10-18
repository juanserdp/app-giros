
// HOOKS
import { useState } from "react";

// COMPONENTES
import { FormClave } from "../components/configuracion/FormClave";
import { Footer } from "../components/Footer";
import { EstadisticasGiros } from "../components/estadisticas/EstadisticasGiros";
import { EstadisticasUsuarios } from "../components/estadisticas/EstadisticasUsuarios";
import { Estadisticas } from "../components/estadisticas/Estadisticas";
import { NavBar } from "../components/NavBar";

// COMPONENTES LIBRERIAS
import { Avatar, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";

// ICONOS
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import ReplyIcon from '@mui/icons-material/Reply';
import PasswordIcon from '@mui/icons-material/Password';
import { EDITAR_ASESOR } from "../services/apollo/gql/asesor/editarAsesor";
import { useMutation } from "@apollo/client";
import { dateJSONupdate } from "../util/dateJSONupdate";
import { handleError } from "../util/handleError";
import swal from "sweetalert";
import { Sesion } from "../util/Sesion";

export function Configuracion() {

    // INSTANCIAS DE CLASE
    const sesion = new Sesion();

    // CONSTANTES
    const id = sesion.getUid();
    const initialStateClave = {
        clave: ""
    };
    // ESTADOS 
    const [option, setOption] = useState(<Estadisticas />);
    const [open, setOpen] = useState(false);
    const [clave, setClave] = useState(initialStateClave);
    const handleClick = () => {
        setOpen(!open);
    };
    const [editarAsesor, editarAsesorInfo] = useMutation(EDITAR_ASESOR);
    const handleSubmit = async (event) => {
        await editarAsesor({
            variables: {
                id,
                asesor: { clave }
            },
            onCompleted: () => {
                // EXITO
                swal("Editado!", "El asesor ha sido editado.", "success");
            },
            onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
        });
    };
    return (
        <>
            <NavBar />
            <Container>
                <Row>
                    <Col md="3" className="mt-3">
                        <Row className="justify-content-center">
                            <Avatar style={{ width: "150px", height: "150px", borderRadius: "100%" }}>ADMIN</Avatar>
                        </Row>
                        <Row>
                            <List sx={{
                                width: '100%',
                                maxWidth: 360,
                                bgcolor: 'background.paper',
                            }} component="nav" aria-label="mailbox folders">

                                <ListItem
                                    disablePadding
                                    onClick={handleClick}
                                >
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
                                </Collapse>
                                <ListItem
                                    disablePadding
                                    onClick={() => setOption(<FormClave
                                        clave={clave}
                                        setClave={setClave}
                                    />)}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PasswordIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Contraseña" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Row>
                    </Col>
                    <Col md="9" className="mt-3">
                        {option}
                        <Button className="m-3" variant="primary" onClick={handleSubmit} disabled={editarAsesorInfo.loading}>
                            {(editarAsesorInfo.loading) ? (
                                <><Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> &nbsp;Enviando...</>
                            ) : "Editar"}
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}