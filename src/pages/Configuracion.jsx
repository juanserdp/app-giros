
// HOOKS
import { useState } from "react";
// COMPONENTES
import { FormClave } from "../components/configuracion/FormClave";
import { EstadisticasGiros } from "../components/estadisticas/EstadisticasGiros";
import { EstadisticasUsuarios } from "../components/estadisticas/EstadisticasUsuarios";
// COMPONENTES LIBRERIAS
import { Avatar, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
// ICONOS
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import ReplyIcon from '@mui/icons-material/Reply';
import PasswordIcon from '@mui/icons-material/Password';
import { blue } from "@mui/material/colors";

export function Configuracion() {

    const styleAvatar = {
        width: "150px",
        height: "150px",
        borderRadius: "100%",
    };
    // ESTADOS 
    const [option, setOption] = useState(null);
    const [open, setOpen] = useState(false);

    // MANEJADORES
    const handleClick = () => setOpen(!open);

    return (
        <Container>
            <Row>
                <Col md="3" className="mt-3">
                    <Row className="justify-content-center">
                        <Avatar
                            sx={{ bgcolor: blue[600] }}
                            style={styleAvatar}>
                            ADMIN
                        </Avatar>
                    </Row>
                    <Row>
                        <List sx={{
                            width: '100%',
                            maxWidth: 360,
                            bgcolor: 'background.paper',
                        }} component="nav" aria-label="mailbox folders">

                            <ListItem
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
                            </Collapse>
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
                        </List>
                    </Row>
                </Col>
                <Col md="9" className="mt-3">
                    {option}
                </Col>
            </Row>
        </Container>
    )
}