import { useMutation, useQuery } from '@apollo/client';
import { useState } from "react";
import { NavBar } from "../components/NavBar";
import { useParams } from 'react-router-dom';
import { OBTENER_GIROS_POR_ID_USUARIO } from '../services/apollo/gql/giro/obtenerGirosPorIdUsuario';
import { OBTENER_GIROS } from '../services/apollo/gql/giro/obtenerGiros';
import { CREAR_GIRO } from '../services/apollo/gql/giro/crearGiro';
import { EDITAR_GIRO } from '../services/apollo/gql/giro/editarGiro';
import { ELIMINAR_GIRO } from '../services/apollo/gql/giro/eliminarGiro';
import { TablaGiros } from '../components/giros/TablaGiros';
import { ModalGiro } from '../components/giros/ModalGiro';

export default function Giros() {
    const { usuario } = useParams();
    const { loading, error, data, refetch } = useQuery((usuario) ? OBTENER_GIROS_POR_ID_USUARIO : OBTENER_GIROS, { variables: { id: usuario } });

    const [crearGiro] = useMutation(CREAR_GIRO);
    const [editarGiro] = useMutation(EDITAR_GIRO);
    const [eliminarGiro] = useMutation(ELIMINAR_GIRO);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    if (error) return (
        `Error! ${error}`
    );
    return (
        <>
            <NavBar />
            <TablaGiros
                giros={data || {
                    obtenerGiros: []
                }}
                eliminar={eliminarGiro}
                handleShow={handleShow}
                loading={loading}
                refetch={refetch}
            />
            <ModalGiro
                giros={data || {
                    obtenerGiros: []
                }}
                show={show}
                handleClose={handleClose}
                crearUsuario={crearGiro}
                editarUsuario={editarGiro}
                refetch={refetch}
            />
        </>
    );
};