import { useMutation } from "@apollo/client";
import { Button, Col } from "react-bootstrap";
import swal from "sweetalert";
import { CREAR_MENSAJE } from "../../services/apollo/gql/mensaje/crearMensaje";
import { EDITAR_MENSAJE } from "../../services/apollo/gql/mensaje/editarMensaje";
import { handleError } from "../../util/handleError";
import { validarCamposNotNull } from "../../util/validarCamposNotNull";
import { Cargando } from "../Cargando";


const style = {
    borderRadius: "0px",
    width: "100%",
    height: "100%"
}

export function BotonAceptarMensaje({
    id,
    mensaje,
    setAutoFocusMensaje,
    setIsNewMensaje,
    isNewMensaje,
    refetch,
    setMensaje,
    initialStateMensaje
}) {

    // HOOKS
    const [crearMensaje, crearMensajeMutation] = useMutation(CREAR_MENSAJE);
    const [editarMensaje, editarMensajeMutation] = useMutation(EDITAR_MENSAJE);
    const loading = crearMensajeMutation.loading || editarMensajeMutation.loading;
    // MANEJADORES
    const handleSubmitMensaje = async () => {
        if (isNewMensaje) {
            if (mensaje.mensaje !== "" || mensaje.imagen !== "") {
                await crearMensaje({
                    variables: mensaje,
                    onCompleted: () => {
                        swal("Añadido!", "Su mensaje ha sido añadido al buzon", "success");
                        setMensaje(initialStateMensaje);

                    },
                    onError: ({ graphQLErrors, networkError, error }) => handleError({ graphQLErrors, networkError })
                });
            }
            else swal("Error", "El mensaje debe contener algun texto o imagen", "error");
        }
        else {
            if (validarCamposNotNull(mensaje)) {
                await editarMensaje({
                    variables: { id, mensaje },
                    onCompleted: () => {
                        swal("Editado!", "Su mensaje ha sido editado", "success");
                        setMensaje(initialStateMensaje);
                        setIsNewMensaje(true);
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                });
            }
            else swal("Error!", "Debe seleccionar un mensaje para editarlo", "error");
        };
        setAutoFocusMensaje(false);
        refetch();
    };

    return (
        <Button
            onClick={handleSubmitMensaje}
            style={style}
            disabled={loading}>
            {(loading) ? (
                <Cargando />
            ) : "Aceptar"}
        </Button>
    )
}