import { gql } from "@apollo/client";

export const EDITAR_ASESOR = gql`
    mutation EditarAsesor(
        $id: ID!
        $asesor: AsesorForUpdateInput!
    ){
        asesor: editarAsesor(
            id: $id,
            asesor: $asesor
            ){
                id
                nombres
                apellidos
                tipoDocumento
                numeroDocumento
                clave
                saldo
                estado
        }
    }
`;