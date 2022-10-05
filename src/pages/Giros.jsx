// HOOKS
import { useMutation, useQuery } from '@apollo/client';
import { useState } from "react";
import { useParams } from 'react-router-dom';

// COMPONENTES
import { TablaGiros } from '../components/giros/TablaGiros';
import { ModalGiro } from '../components/giros/ModalGiro';
import { NavBar } from "../components/NavBar";

// CONSULTAS
import { OBTENER_GIROS_POR_ID_USUARIO } from '../services/apollo/gql/giro/obtenerGirosPorIdUsuario';
import { OBTENER_GIROS } from '../services/apollo/gql/giro/obtenerGiros';
import { CREAR_GIRO } from '../services/apollo/gql/giro/crearGiro';
import { EDITAR_GIRO } from '../services/apollo/gql/giro/editarGiro';
import { ELIMINAR_GIRO } from '../services/apollo/gql/giro/eliminarGiro';
import { OBTENER_GIROS_POR_USUARIOS_POR_ID_ASESOR } from '../services/apollo/gql/giro/obtenerGirosPorUsuariosPorIdAsesor';

export default function Giros() {

    // CONSTANTES
    const { usuario, asesor } = useParams();
    const initialStateGiros = {
        giros: []
    };

    // CONSULTAS
    const { loading, error, data, refetch } = useQuery(
        (usuario) ?
            OBTENER_GIROS_POR_ID_USUARIO :
            ((asesor) ?
                OBTENER_GIROS_POR_USUARIOS_POR_ID_ASESOR :
                OBTENER_GIROS
            ),
        { variables: { id: usuario || asesor } });
    const giros = data || initialStateGiros;

    // MUTACIONES
    const [crearGiro] = useMutation(CREAR_GIRO);
    const [editarGiro] = useMutation(EDITAR_GIRO);
    const [eliminarGiro] = useMutation(ELIMINAR_GIRO);

    // ESTADOS
    const [show, setShow] = useState(false);

    // MANEJADORES
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    if (error) return (
        `Error! ${error}`
    );
    return (
        <>
            <NavBar />
            <TablaGiros
                giros={giros.giros}
                refetch={refetch}
                eliminar={eliminarGiro}
                handleShow={handleShow}
                loading={loading}
            />
            <ModalGiro
                giros={giros.giros}
                refetch={refetch}
                show={show}
                handleClose={handleClose}
                crearGiro={crearGiro}
                editarGiro={editarGiro}
            />
        </>
    );
};