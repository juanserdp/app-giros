import { gql } from "@apollo/client";


export const EDITAR_MENSAJE = gql`
    mutation EditarMensaje(
            $id: ID!,
            $mensaje: MensajeForUpdateInput!
            ){
            mensaje: editarMensaje(
                id: $id,
                mensaje: $mensaje,
                ){
                    id
                    mensaje
                    imagen
                    fechaCreacion
                    fechaUltimaModificacion
                }
            }
`;