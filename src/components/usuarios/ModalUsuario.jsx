import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { handleError } from "../../util/handleError";
import { validarCamposNotNull } from "../../util/validarCamposNotNull";
import { FormUsuario } from "./FormUsuario";
import { dateJSONupdate } from "../../util/dateJSONupdate";

export function ModalUsuario({
    usuarios,
    show,
    handleClose,
    crearUsuario,
    crearUsuarioData,
    editarUsuario,
    editarUsuarioData,
    refetch
}) {

    // INSTANCIAS
    const navigate = useNavigate();

    // CONSTANTES
    const { id, asesor } = useParams();
    const usuarioSeleccionado = usuarios.find(usuario => usuario.id === id);
    const initialStateUsuario = {
        nombres: "",
        apellidos: "",
        tipoDocumento: "",
        numeroDocumento: "",
        clave: "",
        saldo: "",
        deuda: "",
        capacidadPrestamo: "",
        estado: ""
    };

    const initialStateUsuarioFormCrear = {
        nombres: "",
        apellidos: "",
        tipoDocumento: "",
        numeroDocumento: "",
        clave: "",
        saldo: "",
        capacidadPrestamo: "",
        tasaVenta: ""
    };

    // HOOKS
    const [usuario, setUsuario] = useState((id && asesor) ? initialStateUsuario : initialStateUsuarioFormCrear);
    const [validated, setValidated] = useState(false);

    // MANEJADORES
    const handleSubmit = async (event) => {
        if (id && asesor) {
            if (validarCamposNotNull(usuario)) {
                await editarUsuario({
                    variables: {
                        id,
                        usuario: dateJSONupdate(usuarioSeleccionado, usuario)
                    },
                    onCompleted: () => {
                        // CERRAR
                        handleClose();
                        // NAVEGAR
                        navigate(`/usuarios/${asesor}`);
                        // EXITO
                        swal("Editado!", "El usuario ha sido editado.", "success");
                        // LIMPIAR
                        setValidated(false);
                        setUsuario(initialStateUsuario);
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                });
            }
            else swal("Error!", "No ha editado ningun campo!", "error");
        }
        else if (asesor) {
            if (validarCamposNotNull(usuario)) {
                await crearUsuario({
                    variables: {
                        ...usuario,
                        saldo: Number(usuario.saldo),
                        deuda: Number(usuario.deuda),
                        capacidadPrestamo: Number(usuario.capacidadPrestamo),
                        tasaVenta: Number(usuario.tasaVenta),
                        asesor: asesor
                    },
                    onCompleted: () => {
                        handleClose();
                        navigate(`/usuarios/${asesor}`);
                        swal("Creado!", "El usuario ha sido creado.", "success");
                        setValidated(false);
                        setUsuario(initialStateUsuario);
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                });
            }
            else {
                setValidated(true);
                swal("Error!", "Todos los campos son obligatorios!", "error");
            }
        }
        refetch();
    }
    
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg">
                <Modal.Header>
                    <Modal.Title>{(id) ? "Editar Usuario" : "Crear Usuario"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormUsuario
                        handleSubmit={handleSubmit}
                        validated={validated}
                        usuario={usuarioSeleccionado || ((id && asesor) ? initialStateUsuario : initialStateUsuarioFormCrear)}
                        setUsuario={setUsuario}
                        isNotAllowedChangeInputBalance={false}
                        isEditing={(id && asesor)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose();
                        navigate(`/usuarios/${asesor}`);
                    }}>
                        Cerrar
                    </Button>
                    {(crearUsuarioData.loading || editarUsuarioData.loading) ? (
                        <Button variant="success" disabled>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> &nbsp;
                            Enviando...
                        </Button>
                    ) : (
                        <Button variant="success" onClick={handleSubmit}>Aceptar</Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
}