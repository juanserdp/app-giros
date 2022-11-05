import { Carousel } from "react-bootstrap"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import "../../assets/styles/buzon.css";
import { useSesionContext } from "../../providers/SesionProvider";
import React from "react";
import { CircularProgressAnimation } from "../CircularProgressAnimation";
import { ErrorFetch } from "../errors/ErrorFetch";
import { useMutation } from "@apollo/client";
import { ELIMINAR_MENSAJE } from "../../services/apollo/gql/mensaje/eliminarMensaje";
import { handleError } from "../../util/handleError";
import swal from "sweetalert";
import { IconButton } from '@mui/material';
import { Cargando } from "../Cargando";

export function Buzon({
    setIsNewMensaje,
    setMensaje,
    setAutoFocusMensaje,
    mensajes,
    loading,
    error,
    refetch,
    setIdMensajeEditar,
    initialStateMensaje
}) {

    // CONSTANTES
    const mensajeStyle = {
        fontWeight: "300",
        fontSize: "1.2rem",
        fontFamily: "'Roboto Slab', serif",
    }

    // HOOKS
    const { sesionData: { rol } } = useSesionContext();
    const [eliminarMensaje, eliminarMensajeMutation] = useMutation(ELIMINAR_MENSAJE);

    // MANEJADORES
    const handleDeleteIconButton = async (id) => {
        await eliminarMensaje({
            variables: { id },
            onCompleted: () => {
                swal("Eliminado!", "El mensajes ha sido eliminado.", "success");
                refetch();
            },
            onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
        })
    };

    const agregaUnNuevoMensaje = (mensajeStyle) => {
        return (
            <React.Fragment>
                <h5 style={mensajeStyle}>Agrega un nuevo mensaje!</h5>
                <IconButton onClick={() => {
                    setIsNewMensaje(true);
                    setAutoFocusMensaje(true);
                    setMensaje(initialStateMensaje);
                }}>
                    <AddIcon />
                </IconButton>
            </React.Fragment>
        )
    };

    const noHayMensajes = (rol, mensajeStyle) => {
        return (
            <Carousel.Item className="py-5">
                {(rol === "ADMINISTRADOR") ? (
                    agregaUnNuevoMensaje(mensajeStyle)
                ) : <h5 style={mensajeStyle}>No hay mensajes para mostrar</h5>}
            </Carousel.Item >
        )
    };

    if (loading) return <CircularProgressAnimation />;

    if (error) return <ErrorFetch error={error} />;

    return (
        <React.Fragment>
            {(eliminarMensajeMutation.loading) ? (
                <Cargando />
            ) : (
                <Carousel variant="dark">
                    {(mensajes.length > 0) ? (
                        mensajes.map((mensaje, index) => {
                            if (mensaje.mensaje !== "") return (
                                <Carousel.Item key={index} interval={3000} className="py-5">
                                    <h5 style={mensajeStyle}>{mensaje.mensaje}</h5>
                                    {(rol === "ADMINISTRADOR") ?
                                        (
                                            <React.Fragment>
                                                <IconButton onClick={() => {
                                                    setIdMensajeEditar(mensaje.id);
                                                    setMensaje({ mensaje: mensaje.mensaje });
                                                    setIsNewMensaje(false);
                                                    setAutoFocusMensaje(true);
                                                }} >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteIconButton(mensaje.id)} >
                                                    <DeleteIcon />
                                                </IconButton>
                                                <br />
                                            </React.Fragment>
                                        ) :
                                        null}
                                </Carousel.Item>
                            );
                            else return null;
                        })) : (noHayMensajes(rol, mensajeStyle))}
                    {(rol === "ADMINISTRADOR") ? (
                        <Carousel.Item interval={4000} className="py-5">
                            {agregaUnNuevoMensaje(mensajeStyle)}
                        </Carousel.Item>
                    ) : null}
                </Carousel >
            )}
        </React.Fragment >
    )
}