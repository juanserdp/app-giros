import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { FormAsesor } from "./FormAsesor";
import { handleError } from "../../util/handleError";
import { validarCamposNotNull } from "../../util/validarCamposNotNull";
import { dateJSONupdate } from "../../util/dateJSONupdate";
import { Cargando } from "../Cargando";

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
  const voyAeditarUnASesor = id ? true : false;
  const loading = crearAsesorData.loading || editarAsesorData.loading;
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
  };

  // ESTADOS
  const [asesor, setAsesor] = useState((id) ? initialStateAsesor : initialStateAsesorFormCrear);
  const [validated, setValidated] = useState(false);

  // FUNCIONES
  const reiniciarEstados = () => {
    setValidated(false);
    handleClose();
    navigate("/asesores");
    setAsesor((id) ? initialStateAsesor : initialStateAsesorFormCrear);
  };

  // MANEJADORES
  const handleSubmit = async (event) => {
    if (voyAeditarUnASesor) {
      if (validarCamposNotNull(asesor)) {
        await editarAsesor({
          variables: {
            id,
            asesor: dateJSONupdate(asesorSeleccionado, asesor)
          },
          onCompleted: () => {
            swal("Editado!", "El asesor ha sido editado.", "success");
            reiniciarEstados();
          },
          onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
        });
      }
      else {
        setValidated(true);
        swal("Error!", "No ha editado ningun campo!", "error");
      }
    }
    else {
      if (validarCamposNotNull(asesor)) {
        await crearAsesor({
          variables: { ...asesor, saldo: Number(asesor.saldo) },
          onCompleted: () => {
            swal("Creado!", "El asesor ha sido creado.", "success");
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
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg" >

      <Modal.Header >
        <Modal.Title>{(id) ? "Editar Asesor" : "Crear Asesor"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormAsesor
          handleSubmit={handleSubmit}
          validated={validated}
          asesor={asesorSeleccionado || ((id) ? initialStateAsesor : initialStateAsesorFormCrear)}
          isNotAllowedChangeInputBalance={false}
          setAsesor={setAsesor}
          isEditing={id} />
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
};