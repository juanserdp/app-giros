import { gql } from "@apollo/client";


export const CREAR_MENSAJE = gql`
    mutation CrearMensaje(
            $mensaje: String!
            ){
            mensaje: crearMensaje(
                mensaje: $mensaje,
                ){
                    id
                    mensaje
                    fechaCreacion
                    fechaUltimaModificacion
                }
            }
`;