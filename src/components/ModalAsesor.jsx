import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FormAsesor } from "./FormAsesor";
import swal from "sweetalert";
import { handleError } from "../util/handleError";
import { useParams } from "react-router-dom";
// import { OBTENER_ASESOR_POR_ID } from "../services/apollo/gql/asesor/obtenerAsesorPorId";
// import { useLazyQuery } from '@apollo/client';

export function ModalAsesor({ asesores, show, handleClose, crearAsesor, editarAsesor, refetch }) {
  const { id } = useParams();

  const asesorPorId = asesores.obtenerAsesores.filter(asesor => asesor.id === id);
  const [asesor, setAsesor] = useState({
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    clave: "",
    saldo: 0,
    estado: ""
  });
  const handleSubmit = async () => {
    if (asesor.nombres == "" ||
      asesor.apellidos == "" ||
      asesor.tipoDocumento == "" ||
      asesor.numeroDocumento == "" ||
      asesor.estado == ""
    ) swal("Error!", "Todos los campos son obligatorios!", "error");
    else {
      if (id) {
        await editarAsesor({
          variables: asesor,
          onCompleted: () => {
            refetch();
            swal("Creado!", "El asesor ha sido editado.", "success");
            handleClose();
          },
          onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
        });
      }
      else {
        await crearAsesor({
          variables: asesor,
          onCompleted: () => {
            refetch();
            swal("Creado!", "El asesor ha sido creado.", "success");
            handleClose();
          },
          onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
        });
      }
      refetch();
    }
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
          <Modal.Title>Crear Asesor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAsesor asesorPorId={asesorPorId} isNotAllowedChangeInputBalance={false} setAsesor={setAsesor} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}