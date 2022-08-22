import swal from "sweetalert";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FormAsesor } from "./FormAsesor";
import { handleError } from "../../util/handleError";

export function ModalAsesor({ asesores, show, handleClose, crearAsesor, editarAsesor, refetch }) {

  // OBTENGO EL ID DE UN ASESOR CON EL ENLACE
  const { id } = useParams();

  // SI HAY UN ID ENTONCES EL REALIZA UNA BUSQUEDA Y DEVUELVE
  // EL ASESOR CON ESE ID EN CASO CONTRARIO DEVUELVE UN UNDEFINED
  const asesorPorId = asesores.obtenerAsesores.filter(asesor => asesor.id === id);
  // ^^ DEVUELVE UN ARRAY CON UN SOLO OBJETO 

  // DEFINIMOS LOS CAMPOS INICIALES DE MI FORMULARIO
  const initialState = {
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    clave: "",
    saldo: "",
    estado: ""
  };

  // GUARDAMOS ESOS CAMPOS EN UNA VARIABLE asesor 
  // SI EN LA BUSQUEDA DEL ID SE ENCUENTRA UN ASESOR ENTONCES
  // LOS DATOS DE EL SE LE PASAN AL FORMULARIO PARA EDITARLO
  // EN CASO CONTRARIO SE PONENE LOS CAMPOS INICIALES
  const [asesor, setAsesor] = useState(asesorPorId[0] || initialState);

  const [validated, setValidated] = useState(false);
  // ESTE MANEJADOR DESPONDE AL BOTON "ACEPTAR" DEL MODAL
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    // VALIDO QUE LOS CAMPOS SEAN DIFERENTES A UNDEFINED
    if (asesor.nombres !== "" &&
      asesor.apellidos !== "" &&
      asesor.tipoDocumento !== "" &&
      asesor.numeroDocumento !== "" &&
      asesor.clave !== "" &&
      asesor.saldo !== "" && 
      asesor.estado !== ""
    ) {
      // AQUI HAY UNA BIFURCACION, SI EL ID EXISTE ESO QUIERE DECIR QUE
      // SE LE FUE PROPORCIONADO PORQUE SE LE VA A EDITAR LOS DATOS DEL
      // ASESOR
      if (id) {
        // EJECUTAMOS LA MUTATION PARA EDITAR EL ASESOR
        await editarAsesor({
          variables: {...asesor, saldo: Number(asesor.saldo)}, // LE SUMINISTRAMOS LOS DATOS DEL ASESOR A MODIFICAR
          onCompleted: () => {
            refetch();
            swal("Editado!", "El asesor ha sido editado.", "success");
            // DEJAMOS EL VALIDADOR DE CAMPOS COMO AL PRINCIPIO Y CERRAMOS MODAL
            setValidated(false);
            handleClose();
          },
          onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
        });
      }
      // EN CASO DE QUE NO SE LE HAYA SUMINISTRADO UN ID QUIERE DECIR
      // QUE DEBE CREARDE UN ASESOR
      else {
        await crearAsesor({
          variables: {...asesor, saldo: Number(asesor.saldo)}, // SUMINISTRAMOS LOS DATOS DEL ASESOR A CREAR
          onCompleted: () => {
            refetch();
            swal("Creado!", "El asesor ha sido creado.", "success");
            // DEJAMOS EL VALIDADOR DE CAMPOS COMO AL PRINCIPIO Y CERRAMOS MODAL
            setValidated(false);
            handleClose();
          },
          onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
        });
      }
      refetch();
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
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{(id)?"Editar Asesor":"Crear Asesor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* LE PASAMOS EL asesorPorId AL FORMULARIO COMO TAL PARA 
          QUE SI LLEGA A EXISTIR ENTONCES SE MUESTREN EN LOS CAMPOS */}
          <FormAsesor
            initialState={initialState}
            handleSubmit={handleSubmit}
            validated={validated}
            asesorPorId={asesorPorId}
            isNotAllowedChangeInputBalance={false}
            setAsesor={setAsesor}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="success" onClick={handleSubmit}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}