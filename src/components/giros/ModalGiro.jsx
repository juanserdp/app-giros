import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { handleError } from "../../util/handleError";
import { validarCamposNotNull } from "../../util/validarCamposNotNull";
import { FormGiro } from "./FormGiro";
import { dateJSONupdate } from "../../util/dateJSONupdate";

export function ModalGiro({
    giros,
    show,
    handleClose,
    editarGiro,
    refetch
}) {

    // INTANCIAS DE CLASE
    const navigate = useNavigate();

    // CONSTANTES
    const { id, usuario } = useParams();
    const giroSeleccionado = giros.find(giro => giro.id === id);
    const initialStateGiro = {
        nombres: "",
        apellidos: "",
        tipoDocumento: "",
        numeroDocumento: "",
        banco: "",
        tipoCuenta: "",
        numeroCuenta: "",
        valorGiro: "",
        estadoGiro: "",
    };

    // ESTADOS
    const [giro, setGiro] = useState(initialStateGiro);
    const [validated, setValidated] = useState(false);

    // MANEJADORES
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (() => {
            let isFull;
            for (const prop in giro) {
                if(prop === "comprobantePago") continue;
                if (giro[prop] === "" || giro[prop] == null) return false;
                else isFull = true;
            }
            return isFull;
        }) {
            if (id && usuario) {
                await editarGiro({
                    variables: {
                        id,
                        giro: dateJSONupdate(giroSeleccionado, giro)
                    },
                    onCompleted: () => {
                        refetch();
                        swal("Editado!", "El giro ha sido editado.", "success");
                        setValidated(false);
                        handleClose();
                        navigate(`/giros/usuario/${usuario}`);
                    },
                    onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
                });
            }
        }
        else {
            swal("Error!", "Todos los campos son obligatorios!", "error");
            setValidated(true);
        }
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
                        validated={validated}
                        giro={giroSeleccionado || initialStateGiro}
                        isNotAllowedChangeInput={true}
                        setGiro={setGiro} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose();
                        navigate(`/giros/usuario/${usuario}`);
                    }}>
                        Cerrar
                    </Button>
                    <Button  variant="success" onClick={handleSubmit}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}