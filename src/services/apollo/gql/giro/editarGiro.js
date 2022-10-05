import { gql } from "@apollo/client";

export const EDITAR_GIRO = gql`
    mutation editarGiro(
        $id: ID!,
        $giro: GiroForUpdateInput!
    ){
        editarGiro(
            id:$id,
            giro:$giro
            ){
                id
            }
        }

`