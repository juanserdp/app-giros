import { gql } from "@apollo/client";

export const CREAR_GIRO = gql`
    mutation crearGiro(
        $usuario: ID!
        $nombres: String!
        $apellidos: String!
        $tipoDocumento: String!
        $numeroDocumento: String!
        $banco: String!
        $tipoCuenta: String!
        $numeroCuenta: String!
        $valorGiro: Float!
    ){
        crearGiro(
            usuario: $usuario,
            nombres: $nombres,
            apellidos: $apellidos,
            tipoDocumento: $tipoDocumento,
            numeroDocumento: $numeroDocumento,
            banco: $banco,
            tipoCuenta: $tipoCuenta,
            numeroCuenta: $numeroCuenta,
            valorGiro: $valorGiro
            ){
                usuario
                nombres
                apellidos
                tipoDocumento
                numeroDocumento
                banco
                tipoCuenta
                numeroCuenta
                valorGiro
                comprobantePago
                fechaEnvio
            }
        }

`