import { gql } from "@apollo/client";

export const EDITAR_GIRO = gql`
    mutation editarGiro(
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
        editarGiro(
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