import { gql } from "@apollo/client";

export const ELIMINAR_USUARIO = gql`
    mutation eliminarUsuario($id: ID!){
        eliminarUsuario(id: $id){
            id
        }
    }
`;
