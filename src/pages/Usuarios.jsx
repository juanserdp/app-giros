// HOOKS
import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from "react";
import { useParams } from 'react-router-dom';

// COMPONENTES
import { NavigationBar } from "../components/NavigationBar";
import { ModalUsuario } from "../components/usuarios/ModalUsuario";
import { TablaUsuarios } from "../components/usuarios/TablaUsuarios";

// CONSULTAS
import { OBTENER_USUARIOS } from "../services/apollo/gql/usuario/obtenerUsuarios";
import { CREAR_USUARIO } from "../services/apollo/gql/usuario/crearUsuario";
import { EDITAR_USUARIO } from "../services/apollo/gql/usuario/editarUsuario";
import { ELIMINAR_USUARIO } from "../services/apollo/gql/usuario/eliminarUsuario";
import { OBTENER_USUARIOS_POR_ID_ASESOR } from '../services/apollo/gql/usuario/obtenerUsuarioPorIdAsesor';
import { ErrorFetch } from '../components/errors/ErrorFetch';

export default function Usuarios() {

    // CONSTANTES
    const { asesor } = useParams();

    // CONSULTAS
    const { loading, error, data, refetch } = useQuery(
        (asesor) ?
            OBTENER_USUARIOS_POR_ID_ASESOR :
            OBTENER_USUARIOS,
        { variables: { id: asesor } });

    // CONSTANTES
    const initialStateUsuarios = {
        usuarios: []
    };
    const usuarios = data || initialStateUsuarios;

    // MUTACIONES
    const [crearUsuario, crearUsuarioData] = useMutation(CREAR_USUARIO);
    const [editarUsuario, editarUsuarioData] = useMutation(EDITAR_USUARIO);
    const [eliminarUsuario] = useMutation(ELIMINAR_USUARIO);

    // ESTADOS
    const [show, setShow] = useState(false);

    // FUNCIONES
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // ERROR
    if (error) return <ErrorFetch error={error} />;

    return (
        <React.Fragment>
            <TablaUsuarios
                usuarios={usuarios.usuarios}
                eliminarUsuario={eliminarUsuario}
                refetch={refetch}
                handleShow={handleShow}
                loading={loading}
            />
            <ModalUsuario
                usuarios={usuarios.usuarios}
                show={show}
                handleClose={handleClose}
                crearUsuario={crearUsuario}
                crearUsuarioData={crearUsuarioData}
                editarUsuario={editarUsuario}
                editarUsuarioData={editarUsuarioData}
                refetch={refetch}
            />
        </React.Fragment>
    );
};