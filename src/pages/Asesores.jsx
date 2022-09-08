import { useState } from "react";
import { useMutation, useQuery } from '@apollo/client';
import { ModalAsesor } from "../components/asesores/ModalAsesor";
import { NavBar } from "../components/NavBar";
import { TablaAsesores } from "../components/asesores/TablaAsesores";
import { OBTENER_ASESORES } from '../services/apollo/gql/asesor/obtenerAsesores';
import { ELIMINAR_ASESOR } from '../services/apollo/gql/asesor/eliminarAsesor';
import { EDITAR_ASESOR } from '../services/apollo/gql/asesor/editarAsesor';
import { CREAR_ASESOR } from "../services/apollo/gql/asesor/crearAsesor";

export default function Asesores() {
    // CONSULTAS
    const { loading, error, data, refetch } = useQuery(OBTENER_ASESORES);
    
    // MUTACIONES
    const [crearAsesor] = useMutation(CREAR_ASESOR);
    const [editarAsesor] = useMutation(EDITAR_ASESOR)
    const [eliminarAsesor] = useMutation(ELIMINAR_ASESOR);

    // ESTADOS
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (error) return (
        `Error! ${error}`
    );
    return (
        <>
            <NavBar />
            <TablaAsesores
                asesores={data || {
                    obtenerAsesores: []
                }}
                eliminarAsesor={eliminarAsesor}
                refetch={refetch}
                handleShow={handleShow}
                loading={loading}
            />
            <ModalAsesor
                show={show}
                handleClose={handleClose}
                crearAsesor={crearAsesor}
                editarAsesor={editarAsesor}
                refetch={refetch}
                asesores={data || {
                    obtenerAsesores: []
                }}
            />
        </>
    );
};