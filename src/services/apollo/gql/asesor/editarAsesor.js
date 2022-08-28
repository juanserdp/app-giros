import { gql } from "@apollo/client";

export const EDITAR_ASESOR = gql`
    mutation editarAsesor(
        $id: ID!
        $nombres: String!
        $apellidos: String!
        $tipoDocumento: String!
        $numeroDocumento: String!
        $clave: String!
        $saldo: Float!
        $estado: String!
        $tasaVenta: Float!
    ){
        editarAsesor(
            id: $id,
            nombres: $nombres,
            apellidos: $apellidos,
            tipoDocumento: $tipoDocumento,
            numeroDocumento: $numeroDocumento,
            clave: $clave,
            saldo: $saldo,
            estado: $estado
            tasaVenta: $tasaVenta
            ){
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