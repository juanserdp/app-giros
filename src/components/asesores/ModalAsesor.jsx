// HOOKS
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// COMPONENTES
import { Cargando } from "../Cargando";
import { Nombres } from "../forms/Nombres";
import { Apellidos } from "../forms/Apellidos";
import { TipoDocumento } from "../forms/TipoDocumento";
import { NumeroDocumento } from "../forms/NumeroDocumento";
import { Clave } from "../forms/Clave";
import { Saldo } from "../forms/Saldo";
import { Estado } from "../forms/Estado";
// UTILIDADES
import { handleError } from "../../util/handleError";
import { validarCamposNotNull } from "../../util/validarCamposNotNull";
import { dateJSONupdate } from "../../util/dateJSONupdate";
// TERCEROS
import { Button, Form, Modal, Row } from "react-bootstrap";
import swal from "sweetalert";
import { useMutation } from "@apollo/client";
import { CREAR_ASESOR } from "../../services/apollo/gql/asesor/crearAsesor";
import { EDITAR_ASESOR } from "../../services/apollo/gql/asesor/editarAsesor";

export function ModalAsesor({
  asesores,
  refetch,
  loading,
  handleClose,
  show
}) {
  // CONSTANTES
  const estadoInicialFormularioNuevoAsesor = { // ESTADO INICIAL DE FORMULARIO SI VOY A CREAR UN NUEVO ASESOR
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    clave: "",
    saldo: "",
    // estado: ""
  };

  // CONSTANTES
  const { id } = useParams(); // ES EL ID DEL ASESOR QUE SE VA A EDITAR

  const voyAEditarUnAsesor = id ? true : false; // SI RECUPERO EL ID SIGNIFICA QUE VOY A EDITAR

  const asesorSeleccionado = asesores.find(asesor => asesor.id === id) || null; // FILTRO DE ENTRE LOS ASESORES EL ASESOR CON EL ID

  const estadoInicialAsesor = asesorSeleccionado || estadoInicialFormularioNuevoAsesor; // EL ESTADO INICIAL SERA IGUAL AL ESTADO CORRESPONDIENTE A EDITAR O CREAR UN ASESOR CORRESPONDIENTEMENTE

  // HOOKS
  const navigate = useNavigate();
  const [asesor, setAsesor] = useState(estadoInicialAsesor);
  const [validated, setValidated] = useState(false); // PARA MOSTRAR LA REVISION DE LOS CAMPOS VACIOS Y LLENOS
  const [crearAsesor, crearAsesorMutation] = useMutation(CREAR_ASESOR);
  const [editarAsesor, editarAsesorMutation] = useMutation(EDITAR_ASESOR);

  const loadingMutation = crearAsesorMutation.loading || editarAsesorMutation.loading;

  // FUNCIONES
  const crear = async () => {
    if (validarCamposNotNull(asesor)) {
      await crearAsesor({
        variables: asesor,
        onCompleted: () => {
          swal("Creado!", "El asesor ha sido creado.", "success");
          handleCerrar();
          refetch();
        },
        onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
      });
    }
    else {
      setValidated(true); // MUESTRA LAS ADVERTENCIAS EN LOS CAMPOS SIN LLENAR
      swal("Error!", "Todos los campos son obligatorios!", "error");
    };
  };

  const editar = async () => {
    if (Object.keys(dateJSONupdate(asesorSeleccionado, asesor)).length > 0) {
      await editarAsesor({
        variables: {
          id,
          asesor: dateJSONupdate(asesorSeleccionado, asesor)
        },
        onCompleted: () => {
          swal("Editado!", "El asesor ha sido editado.", "success");
          handleCerrar();
          refetch();
        },
        onError: ({ graphQLErrors, networkError }) => handleError({ graphQLErrors, networkError })
      });
    }
    else swal("Error!", "No ha editado ningun campo!", "error");
  };

  // MANEJADORES
  const handleCerrar = () => {
    setValidated(false); // BORRA LA REVISION DE LOS CAMPOS DEL FORMULARIO
    handleClose(); // CIERRA EL MODAL - IMPORTANTE QUE CIERRE EL MODAL Y DEJE LA VAR SHOW EN FALSE PARA QUE CUANDO VUELVA A RENDERIZAR ASESORES.JSX NO RENDERICE ESTE COMPONENTE.
    navigate("/asesores"); // NAVEGA HACIA ATRAS Y RENDERIZA ASESORES.JSX
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // PREVIENE UN REINICIO DE PAGINA
    if (voyAEditarUnAsesor) editar();
    else crear();
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setAsesor({ ...asesor, [name]: value });
  };

  return (
    <Modal
      show={loading ? false : show} // NO MUESTRA EL MODAL HASTA QUE HAYA CARGADO LOS DATOS DEL ASESOR
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg" >
      <Modal.Header >
        <Modal.Title>{(id) ? "Editar Asesor" : "Crear Asesor"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form validated={validated}>
          <Row className="mb-3 mx-5">
            <Nombres
              md={6}
              onChange={(e) => handleInputChange(e)}
              value={asesor.nombres} />

            <Apellidos
              md={6}
              onChange={(e) => handleInputChange(e)}
              value={asesor.apellidos} />
          </Row>

          <Row className="mb-3 mx-5">
            <TipoDocumento
              value={asesor.tipoDocumento}
              onChange={(e) => handleInputChange(e)}
              md={6} />

            <NumeroDocumento
              value={asesor.numeroDocumento}
              onChange={(e) => handleInputChange(e)}
              md={6} />
          </Row>

          <Row className="mb-3 mx-5">
            <Clave
              value={asesor.clave}
              onChange={(e) => handleInputChange(e)}
              md={6} />

            <Saldo
              value={asesor.saldo}
              onChange={(e) => handleInputChange(e)}
              md={6} />
          </Row>

          <Row className="mb-3 mx-5">
            {(voyAEditarUnAsesor) ? (
              <Estado
                value={asesor.estado}
                onChange={(e) => handleInputChange(e)}
                md={6} />
            ) : null}
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleCerrar}>
          Cerrar
        </Button>

        <Button
          variant="success"
          disabled={loadingMutation}
          onClick={handleSubmit}>
          {(loadingMutation) ? <Cargando /> : "Aceptar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};