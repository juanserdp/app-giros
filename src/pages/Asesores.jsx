// HOOKS
import React, { useState } from "react";
import { useQuery } from '@apollo/client';

// COMPONENTES
import { ModalAsesor } from "../components/asesores/ModalAsesor";
import { TablaAsesores } from "../components/asesores/TablaAsesores";

// CONSULTAS
import { OBTENER_ASESORES } from '../services/apollo/gql/asesor/obtenerAsesores';
import { ErrorFetch } from "../components/errors/ErrorFetch";


export default function Asesores() {
    // CONST
    const INITIAL_STATE_ASESORES = {
        asesores: []
    }

    // HOOKS
    const { loading, error, data, refetch } = useQuery(OBTENER_ASESORES);

    const [show, setShow] = useState(false);

    const estadoInicialIds = {
        asesor: null
    };

    const [ids, setIds] = useState(estadoInicialIds);

    const borrarIds = () => setIds(estadoInicialIds);

    const asesores = data || INITIAL_STATE_ASESORES;

    // MANEJADORES
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (error) return <ErrorFetch error={error} />;

    return (
        <React.Fragment>
            <TablaAsesores
                asesores={asesores.asesores}
                refetch={refetch}
                loading={loading}
                handleShow={handleShow}
                setIds={setIds} />
            {show && !loading ? <ModalAsesor
                asesores={asesores.asesores}
                refetch={refetch}
                loading={loading}
                handleClose={handleClose}
                show={show}
                ids={ids}
                borrarIds={borrarIds} /> : null}
        </React.Fragment>
    );
};