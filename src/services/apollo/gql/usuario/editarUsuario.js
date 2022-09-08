import { gql } from "@apollo/client";

export const EDITAR_USUARIO= gql`
    mutation editarUsuario(
        $id: ID!
        $nombres: String!
        $apellidos: String!
        $tipoDocumento: String!
        $numeroDocumento: String!
        $clave: String!
        $saldo: Float!
        $deuda: Float!
        $capacidadPrestamo: Float!
        $estado: String!
    ){
        editarUsuario(
            id: $id,
            nombres: $nombres,
            apellidos: $apellidos,
            tipoDocumento: $tipoDocumento,
            numeroDocumento: $numeroDocumento,
            clave: $clave,
            saldo: $saldo,
            deuda: $deuda,
            capacidadPrestamo: $capacidadPrestamo,
            estado: $estado
            ){
                nombres
                apellidos
                tipoDocumento
                numeroDocumento
                clave
                saldo
                deuda
                capacidadPrestamo
                estado
        }
    }
`;