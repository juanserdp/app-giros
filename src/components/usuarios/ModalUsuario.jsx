import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { handleError } from "../../util/handleError";
import { validarCamposNotNull } from "../../util/validarCamposNotNull";
import { FormUsuario } from "./FormUsuario";

export function ModalUsuario({ usuarios, show, handleClose, crearUsuario, editarUsuario, refetch }) {
    const navigate = useNavigate();
    const { id, asesor } = useParams();

    let usuarioPorId = [];
    const { obtenerUsuariosPorIdAsesor } = usuarios;
    if (obtenerUsuariosPorIdAsesor && id) {
        usuarioPorId = obtenerUsuariosPorIdAsesor.filter(usuario => usuario.id === id);
    };
    const initialState = {
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
    const [usuario, setUsuario] = useState(usuarioPorId[0] || initialState);
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (validarCamposNotNull(usuario)) {
            if (id && asesor) {
                await editarUsuario({
                    variables: {
                        ...usuario,
                        saldo: Number(usuario.saldo),
                        deuda: Number(usuario.deuda),
                        capacidadPrestamo: Number(usuario.capacidadPrestamo),
                        asesor: asesor
                    },
                    onCompleted: () => {
                        refetch();
                        swal("Editado!", "El usuario ha sido editado.", "success");
                        setValidated(false);
                        handleClose();
                        navigate(`/usuarios/${asesor}`);
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                });
            }
            else if (asesor) {
                await crearUsuario({
                    variables: {
                        ...usuario,
                        saldo: Number(usuario.saldo),
                        deuda: Number(usuario.deuda),
                        capacidadPrestamo: Number(usuario.capacidadPrestamo),
                        asesor: asesor
                    },
                    onCompleted: () => {
                        refetch();
                        swal("Creado!", "El usuario ha sido creado.", "success");
                        setValidated(false);
                        handleClose();
                        navigate(`/usuarios/${asesor}`);
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                });
            }
        }
        else swal("Error!", "Todos los campos son obligatorios!", "error");
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
                        initialState={initialState}
                        handleSubmit={handleSubmit}
                        validated={validated}
                        usuarioPorId={usuarioPorId}
                        isNotAllowedChangeInputBalance={false}
                        setUsuario={setUsuario} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose();
                        navigate(`/usuarios/${asesor}`);
                    }}>
                        Cerrar
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}