import { gql } from "@apollo/client";

export const CREAR_ASESOR = gql`
    mutation crearAsesor(
        $nombres: String!
        $apellidos: String!
        $tipoDocumento: String!
        $numeroDocumento: String!
        $clave: String!
        $saldo: Float!
    ){
        asesor: crearAsesor(
            nombres: $nombres,
            apellidos: $apellidos,
            tipoDocumento: $tipoDocumento,
            numeroDocumento: $numeroDocumento,
            clave: $clave,
            saldo: $saldo,
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