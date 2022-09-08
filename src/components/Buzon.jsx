import { Carousel } from "react-bootstrap"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import "../assets/styles/buzon.css";

export function Buzon({ rol,
    configuracion,
    editarMensaje,
    eliminarMensaje,
    setIsNewMensaje,
    setMensaje,
    setAutoFocusMensaje }) {

    const mensajeStyle = {
        fontWeight: "300",
        fontSize: "1.2rem",
        fontFamily: "'Roboto Slab', serif",
    }
    // FUNCIONES
    const noHayMensajes = () => {
        // EN CASO DE QUEDARSE SIN MENSAJES
        // SI ES ADMIN MOSTRARA:
        if (rol === "ADMINISTRADOR") return (
            < Carousel.Item >
                <h5 style={mensajeStyle}>No hay mensajes. Agrega un nuevo mensaje!</h5>
                <AddIcon
                    color="action"
                    className="iconos-buzon shadow-sm"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        // SE RENDERIZA EL COMPONENTE CON EL NUEVO ESTADO MENSAJE CON UN CONTENIDO
                        setMensaje({ contenido: "Escribe aquí tu nuevo mensaje..." });
                        // SE RENDERIZA EL COMPENENTE CON EL ESTADO DE ISNEWMENSAJE ES TRUE Y LE DIRA
                        // AL BOTON ACEPTAR QUE DEBE USARSE PARA AGREGAR UN NUEVO MENSAJE
                        setIsNewMensaje(true);
                        setAutoFocusMensaje(true);
                    }} />
                <br /><br /><br />
            </Carousel.Item >
        );
        // SI NO ES ADMIN VERA:
        else return (
            <Carousel.Item >
                <h5>No hay mensajes para mostrar</h5>
                <br /><br /><br />
            </Carousel.Item>
        );
    }

    return (
        <Carousel variant="dark">
            {
                // EN CASO DE QUE HALLAN MENSAJE EN EL BUZON:
                (configuracion.buzon.length > 0) ? (
                    // LE AÑADIMOS UN ELEMENTO VACIO PARA QUE LO IGNORE A PROPOSITO
                    [...configuracion.buzon, ""].map((mensaje, i) => {
                        // SI EL MENSAJE NO ESTA VACIO MOSTRARA ESTO
                        if (mensaje !== "") return (
                            <Carousel.Item key={i} interval={4000}>
                                <h5 style={mensajeStyle}>{mensaje}</h5>
                                {(rol === "ADMINISTRADOR") ?
                                    (
                                        <>
                                            <EditIcon
                                                color="action"
                                                className="iconos-buzon shadow-sm"
                                                style={{ cursor: "pointer" }}
                                                // ESTA FUNCION EDITARMENSAJE LO QUE HACE ES PONERLE AL ESTADO MENSAJE
                                                // EL CONTENIDO Y EL INDICE DEL MENSAJE A EDITAR
                                                onClick={() => {
                                                    editarMensaje(i);
                                                    setIsNewMensaje(false);
                                                    setAutoFocusMensaje(true);
                                                }} />
                                            <DeleteIcon
                                                color="action"
                                                className="iconos-buzon shadow-sm"
                                                style={{ cursor: "pointer" }}
                                                // ESTA FUNCION RECIBE EL ID QUE VA A ELIMINAR DEL BUZON
                                                onClick={() => eliminarMensaje(i)} />
                                            <br />
                                        </>
                                    ) :
                                    null}
                                <br /><br />
                            </Carousel.Item>
                        );
                        else if (rol !== "ADMINISTRADOR") {
                            return null;
                        }
                        // CUANDO LEA EL ELEMENTO VACIO "" MOSTRARA LO SIGUIENTE
                        else return (
                            <Carousel.Item key={i} interval={4000}>
                                {/* SI ES ADMIN MOSTRARA LO SIGUIENTE */}
                                {(rol === "ADMINISTRADOR") ? (
                                    <>
                                        <h5 style={mensajeStyle}>Agrega un nuevo mensaje!</h5>
                                        <AddIcon
                                            color="action"
                                            className="iconos-buzon shadow-sm"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                // SE RENDERIZA EL COMPONENTE CON EL NUEVO ESTADO MENSAJE CON UN CONTENIDO
                                                setMensaje({ contenido: "Escribe aquí tu nuevo mensaje..." });
                                                // SE RENDERIZA EL COMPENENTE CON EL ESTADO DE ISNEWMENSAJE ES TRUE Y LE DIRA
                                                // AL BOTON ACEPTAR QUE DEBE USARSE PARA AGREGAR UN NUEVO MENSAJE
                                                setIsNewMensaje(true);
                                                setAutoFocusMensaje(true);
                                            }} />
                                    </>
                                    // SI NO ES ADMIN MOSTRARA ESTO A LOS DEMAS
                                ) : null}
                                <br /><br /><br />
                            </Carousel.Item>
                        );
                        // EN CASO DE QUE NO HALLAN MENSAJES EN EL BUZON MOSTRARA ESTO
                    })) : (noHayMensajes())
            }
        </Carousel >
    )
}