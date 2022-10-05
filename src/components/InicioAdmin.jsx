import swal from "sweetalert";
import { Backdrop, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { RECARGAR_ASESOR } from "../services/apollo/gql/asesor/recargarAsesor";

import { Buzon } from "./Buzon";
import { handleError } from "../util/handleError";
import { validarCamposNotNull } from "../util/validarCamposNotNull";
import { useQuery, useMutation } from "@apollo/client";
import { useCargarDataForm } from "../hooks/useCargarDataForm";
import { EDITAR_BUZON } from "../services/apollo/gql/buzon/editarBuzon";
import { OBTENER_BUZON } from "../services/apollo/gql/buzon/obtenerBuzon";
import { Mensaje } from "./Mensaje";
import { FormRecargar } from "./FormRecargar";



export function InicioAdmin() {

    // CONSTANTES
    const initialStateMensaje = {
        contenido: "",
        indice: null
    };

    // EFECTOS
    useEffect(() => {
        const button = document.getElementsByClassName("accordion-button collapsed");
        for (let boton of button) {
            boton.style.backgroundColor = "#0d6efd";
            boton.style.borderTopLeftRadius = "0px";
            boton.style.borderTopRightRadius = "0px";
            boton.style.border = "0px";
            boton.style.height = "20px";
            boton.style.outlineStyle = "none";
            boton.style.color = "white";
            boton.style.fontFamily = "'Roboto Slab', serif";
            boton.style.fontWeight = "500";
            boton.style.fontSize = "1.5rem";
            boton.style.padding = "5px";
            boton.style.textAlign = "center"
        }
    });

    // CONSULTAS
    const { loading, data, error } = useQuery(OBTENER_BUZON);

    // MUTACIONES
    const [editarBuzon] = useMutation(EDITAR_BUZON);
    const [recargarAsesor] = useMutation(RECARGAR_ASESOR);

    // ESTADOS
    const [mensaje, setMensaje] = useState(initialStateMensaje);
    const [isNewMensaje, setIsNewMensaje] = useState(true);
    const [autoFocusMensaje, setAutoFocusMensaje] = useState(false);

    // HOOKS
    const [configuracion, setConfiguracion] = useCargarDataForm({ buzon: [] }, data);

    // FUNCIONES
    const agregarMensaje = async () => {
        // VALIDAMOS QUE LOS CAMPOS NO ESTEN VACIOS
        if (mensaje.contenido !== "") {

            // CREAMOS UNA COPIA DEL VECTOR BUZON
            const newBuzon = [...configuracion.buzon];

            // AGREGAMOS EL NUEVO MENSAJE A LA COPIA
            newBuzon.push(mensaje.contenido);

            // EJECUTAMOS LA MUTACION QUE EDITAR EL BUZON DE LA BD
            await editarBuzon({
                // AGREGAMOS LAS VARIABLES QUE SERAN EDITADAS
                variables: { buzon: newBuzon },
                onCompleted: ({ buzon }) => {
                    // EN CASO DE EXITO SE RENDERIZA EL COMPONENTE CON EL NUEVO ESTADO DEL BUZON
                    setConfiguracion(buzon);
                    // SE MUESTRA UN MODAL CON UN MENSAJE EXITOSO
                    swal("Añadido!", "Su mensaje ha sido añadido al buzon", "success");
                    // RENDERIZAMOS CON EL ESTADO MENSAJE CON SU ESTADO INICIAL
                    setMensaje(initialStateMensaje);
                },
                onError: ({ graphQLErrors, networkError, error }) => handleError({ graphQLErrors, networkError })
            });
        }
        // EN CASO DE QUE ESTE VACIO EL FORMULARIO ME MUESTRA UN MODAL CON UN MENSAJE DE ERROR
        else swal("Error", "El mensaje debe contener algun texto", "error");
    };

    const editarMensaje = async () => {

        // VALIDAMOS QUE LOS CAMPOS NO ESTEN VACIOS
        if (validarCamposNotNull(mensaje)) {
            // CREAMOS UNA COPIA DEL VECTOR BUZON
            const newBuzon = [...configuracion.buzon];

            // USANDO EL INDICE Y CONTENIDO DEL ESTADO MENSAJE EDITO LA COPIA DE MI BUZON
            newBuzon[mensaje.indice] = mensaje.contenido;

            // EJECUTAMOS LA MUTACION QUE EDITAR EL BUZON DE LA BD
            await editarBuzon({
                // AGREGAMOS LAS VARIABLES QUE SERAN EDITADAS
                variables: { buzon: newBuzon },
                onCompleted: ({ buzon }) => {
                    // EN CASO DE EXITO SE RENDERIZA EL COMPONENTE CON EL NUEVO ESTADO DEL BUZON
                    setConfiguracion(buzon);
                    // SE MUESTRA UN MODAL CON UN MENSAJE EXITOSO
                    swal("Editado!", "Su mensaje ha sido editado", "success");
                    // RENDERIZAMOS CON EL ESTADO MENSAJE CON SU ESTADO INICIAL
                    setMensaje(initialStateMensaje);
                    // REINICIAMOS EL ESTADO DE ISNEWMENSAJE A TRUE PARA QUE SIGA CREANDO
                    setIsNewMensaje(true);
                },
                onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
            });
        }
        // EN CASO DE QUE ESTE VACIO EL FORMULARIO ME MUESTRA UN MODAL CON UN MENSAJE DE ERROR
        else swal("Error!", "Debe seleccionar un mensaje para editarlo", "error");
    };

    const eliminarMensaje = async (i) => {
        // CREAMOS UNA COPIA DEL VECTOR BUZON
        const newBuzon = [...configuracion.buzon];

        // ELIMINAMOS EL MENSAJE DE LA COPIA
        newBuzon.splice(i, 1);

        // EJECUTAMOS LA MUTACION QUE EDITAR EL BUZON DE LA BD
        await editarBuzon({
            // AGREGAMOS LAS VARIABLES QUE SERAN EDITADAS
            variables: { buzon: newBuzon },
            onCompleted: ({ buzon }) => {
                // EN CASO DE EXITO SE RENDERIZA EL COMPONENTE CON EL NUEVO ESTADO DEL BUZON
                setConfiguracion(buzon);
                // SE MUESTRA UN MODAL CON UN MENSAJE EXITOSO
                swal("Eliminado!", "Su mensaje ha sido eliminado", "success");
                // RENDERIZAMOS CON EL ESTADO MENSAJE CON SU ESTADO INICIAL
                setMensaje(initialStateMensaje);
            },
            onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
        });
    };

    // MANEJADORES DE EVENTOS

    const handleMensaje = async () => {
        // ESTE ES UN MANJADOR PARA EL BOTON ACEPTAR DONDE BIFURCA SEGUN SEA EL CASO DEL ESTADO
        // ISNEWMENSAJE A AGREGAR O EDITAR UN MENSAJE
        if (isNewMensaje) await agregarMensaje();
        else await editarMensaje();
    };

    // LO QUE MUESTRA CUANDO CARGA
    if (loading) return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
    // LO QUE MUESTRA EN CASO DE ERROR
    if (error) return (
        `Error! ${error}`
    );
    return (
        <>
            <Container className="my-4"
                style={{ textAlign: "center" }}>
                <Row className="mb-3 justify-content-center">
                    <Col md="4">
                        <FormRecargar
                            recargar={recargarAsesor}
                        />
                    </Col>
                </Row>
                <hr />
                <Row className="mb-3">
                    <Col md="12">
                        <Buzon
                            rol="ADMINISTRADOR"
                            configuracion={configuracion}
                            // AL EDITAR EL MENSAJE SE CAMBIA EL ESTADO DE MENSAJE CON EL CONTENIDO E INDICE
                            // DEL MENSAJE QUE SE VA A EDITAR
                            editarMensaje={(i) => setMensaje({ contenido: configuracion.buzon[i], indice: i })}
                            eliminarMensaje={eliminarMensaje}
                            setIsNewMensaje={setIsNewMensaje}
                            setMensaje={setMensaje}
                            setAutoFocusMensaje={setAutoFocusMensaje}
                        />
                    </Col>
                </Row>
                <hr />
                <Row className="justify-content-center mb-3">
                    <Col md="4">
                        <Mensaje
                            mensaje={mensaje}
                            setMensaje={setMensaje}
                            isNewMensaje={isNewMensaje}
                            handleMensaje={handleMensaje}
                            autoFocusMensaje={autoFocusMensaje}
                            setAutoFocusMensaje={setAutoFocusMensaje}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}