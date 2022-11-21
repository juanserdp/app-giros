import { gql } from "@apollo/client";


export const CREAR_MENSAJE = gql`
    mutation CrearMensaje(
            $mensaje: String,
            $imagen: String
            ){
            mensaje: crearMensaje(
                mensaje: $mensaje,
                imagen: $imagen
                ){
                    id
                    mensaje
                    imagen
                    fechaCreacion
                    fechaUltimaModificacion
                }
            }
`;