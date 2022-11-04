// HOOKS
import { useQuery } from '@apollo/client';
import React, { useState } from "react";
import { useParams } from 'react-router-dom';

// COMPONENTES
import { ModalUsuario } from "../components/usuarios/ModalUsuario";
import { TablaUsuarios } from "../components/usuarios/TablaUsuarios";

// CONSULTAS
import { OBTENER_USUARIOS } from "../services/apollo/gql/usuario/obtenerUsuarios";
import { OBTENER_USUARIOS_POR_ID_ASESOR } from '../services/apollo/gql/usuario/obtenerUsuarioPorIdAsesor';
import { ErrorFetch } from '../components/errors/ErrorFetch';

export default function Usuarios() {

    // CONSTANTES
    const initialStateUsuarios = {
        usuarios: []
    };
    const { asesor } = useParams();

    // CONSULTAS
    const { loading, error, data, refetch } = useQuery((asesor) ?
        OBTENER_USUARIOS_POR_ID_ASESOR :
        OBTENER_USUARIOS,
        { variables: { id: asesor } });
    const [show, setShow] = useState(false);

    const estadoInicialIds = {
        usuario: null,
        asesor: asesor || null
    };

    const [ids, setIds] = useState(estadoInicialIds);

    const borrarIds = () => setIds(estadoInicialIds);

    const usuarios = data || initialStateUsuarios;

    // MANEJADORES
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // ERROR
    if (error) return <ErrorFetch error={error} />;

    return (
        <React.Fragment>
            <TablaUsuarios
                usuarios={usuarios.usuarios}
                refetch={refetch}
                loading={loading}
                handleShow={handleShow}
                setIds={setIds}
            />
            {show && !loading ? <ModalUsuario // SE RENDERIZA EL MODAL CUANDO SHOW SEA TRUE Y CUANDO TERMINE DE CARGAR LOS DATOS
                usuarios={usuarios.usuarios}
                refetch={refetch}
                loading={loading}
                handleClose={handleClose}
                show={show}
                ids={ids}
                borrarIds={borrarIds}
            /> : null}
        </React.Fragment>
    );
};