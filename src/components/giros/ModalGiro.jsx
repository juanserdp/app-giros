import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { handleError } from "../../util/handleError";
import { validarCamposNotNull } from "../../util/validarCamposNotNull";
import { FormGiro } from "./FormGiro";

export function ModalGiro({ giros, show, handleClose, crearUsuario, editarUsuario, refetch }) {
    const navigate = useNavigate();
    const { id, usuario } = useParams();
    let giroPorId = [];

    const { obtenerGirosPorIdUsuario } = giros;

    if (obtenerGirosPorIdUsuario && id) {
        giroPorId = obtenerGirosPorIdUsuario.filter(giro => giro.id === id);
    };
    const initialState = {
        nombres: "",
        apellidos: "",
        tipoDocumento: "",
        numeroDocumento: "",
        banco: "",
        tipoCuenta: "",
        numeroCuenta: "",
        valorGiro: ""
    };
    const [giro, setGiro] = useState(giroPorId[0] || initialState);
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (validarCamposNotNull(giro)) {
            if (id && usuario) {
                await editarUsuario({
                    variables: {
                        ...giro,
                        valorGiro: Number(giro.valorGiro),
                        usuario: usuario
                    },
                    onCompleted: () => {
                        refetch();
                        swal("Editado!", "El usuario ha sido editado.", "success");
                        setValidated(false);
                        handleClose();
                        navigate(`/giros/${usuario}`);
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                });
            }
            // else if (asesor) {
            //     await crearUsuario({
            //         variables: {
            //             ...giro,
            //             valorGiro: Number(giro.valorGiro),
            //             usuario: usuario
            //         },
            //         onCompleted: () => {
            //             refetch();
            //             swal("Creado!", "El usuario ha sido creado.", "success");
            //             setValidated(false);
            //             handleClose();
            //             navigate(`/giros/${usuario}`);
            //         },
            //         onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
            //     });
            // }
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
                    <Modal.Title>Editar Giro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGiro
                        initialState={initialState}
                        handleSubmit={handleSubmit}
                        validated={validated}
                        giroPorId={giroPorId}
                        isNotAllowedChangeInput={false}
                        setGiro={setGiro} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose();
                        navigate(`/giros/${usuario}`);
                    }}>
                        Cerrar
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}