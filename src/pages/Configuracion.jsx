import { Avatar, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Estadisticas } from "../components/Estadisticas";
import { NavBar } from "../components/NavBar";
import BarChartIcon from '@mui/icons-material/BarChart';
import ReplyIcon from '@mui/icons-material/Reply';
import PasswordIcon from '@mui/icons-material/Password';
import { Envios } from "../components/Envios";
import { Clave } from "./Clave";
import { Footer } from "../components/Footer";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
export function Configuracion() {

    // ESTADOS 
    const [option, setOption] = useState(function () {
        return (
            <Estadisticas />
        )
    });
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
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

                                <ListItem disablePadding onClick={() => setOption(function () { return (<Estadisticas />) })}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <BarChartIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Estadisticas" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding onClick={() => setOption(function () { return (<Envios />) })}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ReplyIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Envios" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding onClick={() => setOption(function () { return (<Clave />) })}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PasswordIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Contraseña" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItemButton onClick={handleClick}>
                                    <ListItemIcon>
                                        <PasswordIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Inbox" />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{ pl: 4 }}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText primary="Starred" />
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                            </List>
                        </Row>
                    </Col>
                    <Col md="9" className="mt-3">
                        {option}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}