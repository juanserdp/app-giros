import { gql } from "@apollo/client";

export const EDITAR_USUARIO = gql`
    mutation editarUsuario(
        $id: ID!
        $usuario: UsuarioForUpdateInput!
    ){
        editarUsuario(
            id: $id,
            usuario: $usuario
            ){
                id
        }
    }
`;