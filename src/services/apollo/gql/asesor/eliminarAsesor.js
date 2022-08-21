import { gql } from "@apollo/client";

export const ELIMINAR_ASESOR = gql`
    mutation eliminarAsesor($id: ID!){
        eliminarAsesor(id: $id){
            id
        }
    }
`;
