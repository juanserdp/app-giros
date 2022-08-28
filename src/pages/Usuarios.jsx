import { useMutation, useQuery } from '@apollo/client';
import { useState } from "react";
import { NavBar } from "../components/NavBar";
import { ModalUsuario } from "../components/usuarios/ModalUsuario";
import { TablaUsuarios } from "../components/usuarios/TablaUsuarios";
import { OBTENER_USUARIOS } from "../services/apollo/gql/usuario/obtenerUsuarios";
import { CREAR_USUARIO } from "../services/apollo/gql/usuario/crearUsuario";
import { EDITAR_USUARIO } from "../services/apollo/gql/usuario/editarUsuario";
import { ELIMINAR_USUARIO } from "../services/apollo/gql/usuario/eliminarUsuario";
import { useParams } from 'react-router-dom';
import { OBTENER_USUARIOS_POR_ID_ASESOR } from '../services/apollo/gql/usuario/obtenerUsuarioPorIdAsesor';

export default function Usuarios() {
    const { asesor } = useParams();

    const { loading, error, data, refetch } = useQuery((asesor) ? OBTENER_USUARIOS_POR_ID_ASESOR : OBTENER_USUARIOS, { variables: { id: asesor } });

    const [crearUsuario] = useMutation(CREAR_USUARIO);
    const [editarUsuario] = useMutation(EDITAR_USUARIO);
    const [eliminarUsuario] = useMutation(ELIMINAR_USUARIO);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    if (error) return (
        `Error! ${error}`
    );
    return (
        <>
            <NavBar />
            <TablaUsuarios
                usuarios={data || {
                    obtenerUsuarios: []
                }}
                eliminarUsuario={eliminarUsuario}
                refetch={refetch}
                handleShow={handleShow}
                loading={loading}
            />
            <ModalUsuario
                show={show}
                handleClose={handleClose}
                crearUsuario={crearUsuario}
                editarUsuario={editarUsuario}
                refetch={refetch}
                usuarios={data || {
                    obtenerUsuarios: []
                }}
            />
        </>
    );
};