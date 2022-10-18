// HOOKS
import { useState } from "react";
import { useMutation, useQuery } from '@apollo/client';

// COMPONENTES
import { ModalAsesor } from "../components/asesores/ModalAsesor";
import { NavBar } from "../components/NavBar";
import { TablaAsesores } from "../components/asesores/TablaAsesores";

// CONSULTAS
import { OBTENER_ASESORES } from '../services/apollo/gql/asesor/obtenerAsesores';
import { ELIMINAR_ASESOR } from '../services/apollo/gql/asesor/eliminarAsesor';
import { EDITAR_ASESOR } from '../services/apollo/gql/asesor/editarAsesor';
import { CREAR_ASESOR } from "../services/apollo/gql/asesor/crearAsesor";


export default function Asesores() {
    // CONST
    const INITIAL_STATE_ASESORES = {
        asesores: []
    }

    // HOOKS
    // CONSULTAS
    const { loading, error, data, refetch } = useQuery(OBTENER_ASESORES);
    // MUTACIONES
    const [crearAsesor, crearAsesorData] = useMutation(CREAR_ASESOR);
    const [editarAsesor, editarAsesorData] = useMutation(EDITAR_ASESOR)
    const [eliminarAsesor, eliminarAsesorData] = useMutation(ELIMINAR_ASESOR);
    // ESTADOS
    const [show, setShow] = useState(false);

    // VAR
    const asesores = data || INITIAL_STATE_ASESORES;

    // MANEJADORES
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (error) return `Error! ${error}`;

    return (
        <>
            <NavBar />
            <TablaAsesores
                asesores={asesores.asesores}
                refetch={refetch}
                loading={loading}
                eliminarAsesor={eliminarAsesor}
                eliminarAsesorData={eliminarAsesorData}
                handleShow={handleShow}
            />
            <ModalAsesor
                asesores={asesores.asesores}
                refetch={refetch}
                show={show}
                crearAsesor={crearAsesor}
                crearAsesorData={crearAsesorData}
                editarAsesor={editarAsesor}
                editarAsesorData={editarAsesorData}
                handleClose={handleClose}
            />
        </>
    );
};