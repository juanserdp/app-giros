import { gql } from "@apollo/client";


export const ELIMINAR_MENSAJE = gql`
    mutation EliminarMensaje(
        $id: ID!
    ){
        mensaje: eliminarMensaje(id: $id){
            id
            mensaje
            fechaCreacion
            fechaUltimaModificacion
        }
    }
`;