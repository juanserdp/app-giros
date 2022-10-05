import { gql } from "@apollo/client";

export const EDITAR_ASESOR = gql`
    mutation EditarAsesor(
        $id: ID!
        $asesor: AsesorForUpdateInput!
    ){
        editarAsesor(
            id: $id,
            asesor: $asesor
            ){
                id
        }
    }
`;