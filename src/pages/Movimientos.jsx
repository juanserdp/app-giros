// HOOKS
import React, { useState } from "react";
import { useQuery } from '@apollo/client';

// COMPONENTES
import { TablaMovimientos } from "../components/movimientos/TablaMovimientos";

// CONSULTAS
import { ErrorFetch } from "../components/errors/ErrorFetch";
import { OBTENER_ASESOR_POR_ID } from "../services/apollo/gql/asesor/obtenerAsesorPorId";
import { useSesionContext } from "../providers/SesionProvider";
import { OBTENER_USUARIO_POR_ID } from "../services/apollo/gql/usuario/obtenerUsuarioPorId";


export default function Movimientos() {
    // CONST
    const INITIAL_STATE_MOVIMIENTOS = {
        movimientos: []
    }

    // HOOKS
    const { sesionData: { id, rol } } = useSesionContext();
    const { loading, error, data, refetch } = useQuery((rol === "USUARIO") ? OBTENER_USUARIO_POR_ID : OBTENER_ASESOR_POR_ID, { variables: { id } });

    const movimientos = ((rol === "USUARIO") ? (data?.usuario?.movimientos) : (data?.asesor?.movimientos)) || [];

    if (error) return <ErrorFetch error={error} />;

    return (
        <React.Fragment>
            <TablaMovimientos
                movimientos={movimientos}
                refetch={refetch}
                loading={loading}
            />
        </React.Fragment>
    );
};