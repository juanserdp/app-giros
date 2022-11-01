import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { handleError } from "../../util/handleError";
import { validarCamposNotNull } from "../../util/validarCamposNotNull";
import { FormUsuario } from "./FormUsuario";
import { dateJSONupdate } from "../../util/dateJSONupdate";
import { Cargando } from "../Cargando";

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
    const voyAeditarUnUsuario = (id && asesor) ? true : false;
    const loading = crearUsuarioData.loading || editarUsuarioData.loading;
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

    const estadoInicialUsuario = (voyAeditarUnUsuario) ? initialStateUsuario : initialStateUsuarioFormCrear;

    // HOOKS
    const [usuario, setUsuario] = useState(estadoInicialUsuario);
    const [validated, setValidated] = useState(false);

    // FUNCIONES
    const reiniciarEstados = () => {
        setValidated(false);
        handleClose();
        navigate(`/usuarios/${asesor}`);
        setUsuario(estadoInicialUsuario);
    };

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
                        swal("Editado!", "El usuario ha sido editado.", "success");
                        reiniciarEstados();
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
                        swal("Creado!", "El usuario ha sido creado.", "success");
                        reiniciarEstados();
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
                    usuario={usuarioSeleccionado || estadoInicialUsuario}
                    setUsuario={setUsuario}
                    isNotAllowedChangeInputBalance={false}
                    isEditing={voyAeditarUnUsuario} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => reiniciarEstados()}>
                    Cerrar
                </Button>

                <Button variant="success" disabled={loading} onClick={handleSubmit}>
                    {(loading) ? <Cargando /> : "Aceptar"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}