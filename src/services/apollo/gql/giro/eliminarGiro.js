import { gql } from "@apollo/client";

export const ELIMINAR_GIRO = gql`
    mutation eliminarGiro($id: ID!){
        eliminarGiro(id: $id){
            id
        }
    }
`;
