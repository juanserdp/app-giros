// HOOKS
import { useQuery } from '@apollo/client';
import React, { useState } from "react";
import { useParams } from 'react-router-dom';

// COMPONENTES
import { ModalUsuario } from "../components/usuarios/ModalUsuario";
import { TablaUsuarios } from "../components/usuarios/TablaUsuarios";

// CONSULTAS
import { ErrorFetch } from '../components/errors/ErrorFetch';

export default function Usuarios({ consulta }) {

    // CONSTANTES
    const initialStateUsuarios = {
        usuarios: []
    };
    const { asesor } = useParams();

    const { loading, error, data, refetch } = useQuery(consulta, { variables: { id: asesor } });

    const usuarios = data || initialStateUsuarios;

    const [show, setShow] = useState(false);

    const estadoInicialIds = {
        usuario: null,
        asesor: asesor || null
    };

    const [ids, setIds] = useState(estadoInicialIds);

    const borrarIds = () => setIds(estadoInicialIds);

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
                ids={ids}
                setIds={setIds} />
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