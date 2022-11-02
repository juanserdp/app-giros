import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { handleError } from "../../util/handleError";
import { validarCamposNotNull } from "../../util/validarCamposNotNull";
import { FormGiro } from "./FormGiro";
import { dateJSONupdate } from "../../util/dateJSONupdate";
import { Cargando } from "../Cargando";
import { CircularProgressAnimation } from "../CircularProgressAnimation";

export function ModalGiro({
    giros,
    show,
    handleClose,
    editarGiro,
    refetch,
    editarGiroInfo,
    loading
}) {

    // INTANCIAS DE CLASE
    const navigate = useNavigate();

    // CONSTANTES
    const { id, usuario } = useParams();
    const voyAEditarUnGiro = id && usuario;

    const giroSeleccionado = giros.find(giro => giro.id === id);
    console.log("giro: ", giroSeleccionado);
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

    // FUNCIONES
    const reiniciarEstados = () => {
        setValidated(false);
        handleClose();
        navigate(`/giros/usuario/${usuario}`);
        setGiro(initialStateGiro);
    };

    // MANEJADORES
    const handleSubmit = async (event) => {

        const camposParaEditar = dateJSONupdate(giroSeleccionado, giro);
        const tamanoObjeto = Object.keys(camposParaEditar).length;

        if (tamanoObjeto > 0) {
            if (voyAEditarUnGiro) {
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
            else swal("Error!", "Seleccione un giro!", "error");
        }
        else swal("Error!", "No ha editado ningun campo!", "error");
    };

    return (
        <Modal
            show={loading ? false : show}
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
                    giro={giroSeleccionado}
                    isNotAllowedChangeInput={true}
                    setGiro={setGiro} />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => reiniciarEstados()}>
                    Cerrar
                </Button>

                <Button variant="success" onClick={handleSubmit} disabled={editarGiroInfo.loading}>
                    {editarGiroInfo.loading ? <Cargando /> : "Aceptar"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}