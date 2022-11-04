// HOOKS
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

// COMPONENTES
import { TablaGiros } from "../components/giros/TablaGiros";
import { ModalGiro } from "../components/giros/ModalGiro";

// CONSULTAS
import { OBTENER_GIROS_POR_ID_USUARIO } from "../services/apollo/gql/giro/obtenerGirosPorIdUsuario";
import { OBTENER_GIROS } from "../services/apollo/gql/giro/obtenerGiros";
import { OBTENER_GIROS_POR_USUARIOS_POR_ID_ASESOR } from "../services/apollo/gql/giro/obtenerGirosPorUsuariosPorIdAsesor";
import { ErrorFetch } from "../components/errors/ErrorFetch";

export default function Giros() {
  // CONSTANTES
  const { usuario, asesor } = useParams();
  const initialStateGiros = {
    giros: [],
  };

  // CONSULTAS
  const { loading, error, data, refetch } = useQuery(
    usuario
      ? OBTENER_GIROS_POR_ID_USUARIO
      : asesor
        ? OBTENER_GIROS_POR_USUARIOS_POR_ID_ASESOR
        : OBTENER_GIROS,
    { variables: { id: usuario || asesor } }
  );

  const giros = data || initialStateGiros;


  const [show, setShow] = useState(false);

  const estadoInicialIds = {
    giro: null,
    usuario: null
  };

  const [ids, setIds] = useState(estadoInicialIds);

  const borrarIds = () => setIds(estadoInicialIds);

  // MANEJADORES
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (error) return <ErrorFetch />

  return (
    <React.Fragment>
      <TablaGiros
        giros={giros.giros}
        refetch={refetch}
        loading={loading}
        handleShow={handleShow}
        setIds={setIds}
      />
      {show && !loading ? <ModalGiro
        giros={giros.giros}
        refetch={refetch}
        loading={loading}
        handleClose={handleClose}
        show={show}
        ids={ids}
        borrarIds={borrarIds}
      /> : null}

    </React.Fragment>
  );
}
