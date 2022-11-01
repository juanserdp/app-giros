import { gql } from "@apollo/client";

export const OBTENER_MENSAJES = gql`
    query {
        mensajes: obtenerMensajes{
            id
            mensaje
            fechaCreacion
            fechaUltimaModificacion
        }
    }
`;