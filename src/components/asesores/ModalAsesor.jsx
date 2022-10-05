import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { FormAsesor } from "./FormAsesor";
import { handleError } from "../../util/handleError";
import { validarCamposNotNull } from "../../util/validarCamposNotNull";
import { dateJSONupdate } from "../../util/dateJSONupdate";

export function ModalAsesor({
  asesores,
  show,
  handleClose,
  crearAsesor,
  crearAsesorData,
  editarAsesor,
  editarAsesorData,
  refetch
}) {
  // INSTANCIAS
  const navigate = useNavigate();

  // CONSTANTES
  const { id } = useParams();

  const asesorSeleccionado = asesores.find(asesor => asesor.id === id);

  const initialStateAsesor = {
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    clave: "",
    saldo: "",
    estado: ""
  };

  const initialStateAsesorFormCrear = {
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    clave: "",
    saldo: ""
  }

  // ESTADOS
  const [asesor, setAsesor] = useState((id) ? initialStateAsesor : initialStateAsesorFormCrear);
  const [validated, setValidated] = useState(false);

  // MANEJADORES
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // VALIDACION
    if (id) {
      if (validarCamposNotNull(asesor)) {
        await editarAsesor({
          variables: {
            id,
            asesor: dateJSONupdate(asesorSeleccionado, asesor)
          },
          onCompleted: () => {
            // EXITO
            swal("Editado!", "El asesor ha sido editado.", "success");
            // RESETEAR
            setValidated(false);
            // CERRAR
            handleClose();
            // REGRESAR
            navigate("/asesores");
            // LIMPIAR
            setAsesor(initialStateAsesor);
            setValidated(false);
          },
          onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
        });
      }
      else {
        // ERROR
        swal("Error!", "No ha editado ningun campo!", "error");
      }
    }
    else {
      if (validarCamposNotNull(asesor)) {
        await crearAsesor({
          variables: { ...asesor, saldo: Number(asesor.saldo) },
          onCompleted: () => {

            // EXITO
            swal("Creado!", "El asesor ha sido creado.", "success");
            // RESETEAR
            setValidated(false);
            // CERRAR
            handleClose();
            // REGRESAR
            navigate("/asesores");
            // LIMPIAR
            setAsesor(initialStateAsesor);
            setValidated(false);
          },
          onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
        });
      }
      else {
        // ADVERTENCIAS
        setValidated(true);
        // ERROR
        swal("Error!", "Todos los campos son obligatorios!", "error");
      }
    }
    // RECARGAR
    refetch();
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header
        // closeButton
        >
          <Modal.Title>{(id) ? "Editar Asesor" : "Crear Asesor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* LE PASAMOS EL asesorSeleccionado AL FORMULARIO COMO TAL PARA 
          QUE SI LLEGA A EXISTIR ENTONCES SE MUESTREN EN LOS CAMPOS */}
          <FormAsesor
            handleSubmit={handleSubmit}
            validated={validated}
            asesor={asesorSeleccionado || ((id) ? initialStateAsesor : initialStateAsesorFormCrear)}
            isNotAllowedChangeInputBalance={false}
            setAsesor={setAsesor}
            isEditing={id}
          />
        </Modal.Body>
        <Modal.Footer>
          



          <Button variant="secondary" onClick={() => {
            // CERRAR
            handleClose();
            // REGRESAR
            navigate("/asesores");
            // LIMPIAR
            setAsesor(asesor);
          }}>
            Cerrar
          </Button>
          {(crearAsesorData.loading || editarAsesorData.loading) ? (
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
//crearAsesorData

