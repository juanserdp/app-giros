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
    console.log(mensajes);
    let mensajesOrdenados = [];
    if(mensajes.length > 0){
        mensajesOrdenados = [...mensajes];
        mensajesOrdenados.reverse();
        mensajesOrdenados.sort(function (a, b) {
            const fechaA = a.fechaUltimaModificacion.replace(
                /\b(\d+)\/(\d+)\/(\d+)\b/,
                (coincidencia, dia, mes, ano) => {
                    return mes + "/" + dia + "/" + ano;
                });
            // const fechaA = a.fechaUltimaModificacion;
            // const fechaB = b.fechaUltimaModificacion;
            const fechaB = b.fechaUltimaModificacion.replace(
                /\b(\d+)\/(\d+)\/(\d+)\b/,
                (coincidencia, dia, mes, ano) => {
                    return mes + "/" + dia + "/" + ano;
                });
            const dateA = new Date(fechaA);
            const numberA = Number(dateA);
            const dateB = new Date(fechaB);
            const numberB = Number(dateB);
            if (numberA < numberB) return 1;
            if (numberA > numberB) return -1;
            return 0;
        })
    }

    // CONSTANTES
    const mensajeStyle = {
        fontWeight: "300",
        fontSize: "1.4rem",
        fontFamily: "'Roboto Slab', serif"
    };

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
                <Carousel variant="dark" style={{ height: "280px" }}>
                    <br /><br /><br /><br />
                    <Cargando />
                </Carousel>
            ) : (
                <Carousel variant="dark" style={{ height: "280px" }}>
                    {(mensajes.length > 0) ? (
                        mensajesOrdenados.map((mensaje, index) => {
                            if (mensaje.mensaje !== "" && (mensaje.imagen === "" || mensaje.imagen === null)) return (
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
                            else if (mensaje.imagen) {
                                const binaryString = mensaje.imagen;
                                const length = binaryString.length;
                                const array = new Uint8Array(length);

                                for (let i = 0; i < length; i++) {
                                    array[i] = binaryString.charCodeAt(i);
                                };
                                const blob = new Blob([array], { type: "image/jpeg" });
                                return (
                                    <Carousel.Item key={index} interval={3000} className="pb-5">
                                        <img src={URL.createObjectURL(blob)} height="200px" /><br />
                                        {(rol === "ADMINISTRADOR") ?
                                            (
                                                <React.Fragment>
                                                    <IconButton onClick={() => handleDeleteIconButton(mensaje.id)} >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <br />
                                                </React.Fragment>
                                            ) :
                                            null}
                                    </Carousel.Item>
                                )
                            }
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