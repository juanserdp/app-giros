import { gql } from "@apollo/client";

export const CREAR_GIRO = gql`
    mutation crearGiro(
        $usuario: ID!
        $nombres: String!
        $nombresRemitente: String!
        $apellidos: String!
        $apellidosRemitente: String!
        $tipoDocumento: String!
        $tipoDocumentoRemitente: String!
        $numeroDocumento: String!
        $numeroDocumentoRemitente: String!
        $banco: String!
        $tipoCuenta: String!
        $numeroCuenta: String!
        $valorGiro: Float!
        $tasaCompra: Float!
    ){
        crearGiro(
            usuario: $usuario,
            nombres: $nombres,
            nombresRemitente: $nombresRemitente,
            apellidos: $apellidos,
            apellidosRemitente: $apellidosRemitente,
            tipoDocumento: $tipoDocumento,
            tipoDocumentoRemitente: $tipoDocumentoRemitente,
            numeroDocumento: $numeroDocumento,
            numeroDocumentoRemitente: $numeroDocumentoRemitente,
            banco: $banco,
            tipoCuenta: $tipoCuenta,
            numeroCuenta: $numeroCuenta,
            valorGiro: $valorGiro,
            tasaCompra: $tasaCompra
            ){
                id
            }
        }

`