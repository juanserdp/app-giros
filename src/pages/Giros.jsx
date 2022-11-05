// HOOKS
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

// COMPONENTES
import { TablaGiros } from "../components/giros/TablaGiros";
import { ModalGiro } from "../components/giros/ModalGiro";

// CONSULTAS
import { ErrorFetch } from "../components/errors/ErrorFetch";

export default function Giros({ consulta }) {

  // CONSTANTES
  const { usuario, asesor } = useParams();
  const initialStateGiros = {
    giros: [],
  };

  const { loading, error, data, refetch } = useQuery(consulta, { variables: { id: usuario || asesor } });

  const giros = data || initialStateGiros;

  const [show, setShow] = useState(false);

  const estadoInicialIds = {
    giro: null,
    usuario: usuario || null
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
        ids={ids}
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
