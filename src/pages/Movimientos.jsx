// HOOKS
import React, { useState } from "react";
import { useQuery } from '@apollo/client';

// COMPONENTES
import { TablaMovimientos } from "../components/movimientos/TablaMovimientos";

// CONSULTAS
import { ErrorFetch } from "../components/errors/ErrorFetch";
import { OBTENER_ASESOR_POR_ID } from "../services/apollo/gql/asesor/obtenerAsesorPorId";
import { useSesionContext } from "../providers/SesionProvider";


export default function Movimientos() {
    // CONST
    const INITIAL_STATE_MOVIMIENTOS = {
        movimientos: []
    }

    // HOOKS
    const { sesionData: { id } } = useSesionContext();
    const { loading, error, data, refetch } = useQuery(OBTENER_ASESOR_POR_ID, { variables: { id } });

    const movimientos = data?.asesor?.movimientos || [];
    
    console.log(data)
    
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