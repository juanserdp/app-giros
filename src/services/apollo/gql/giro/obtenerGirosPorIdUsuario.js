import { gql } from "@apollo/client";

export const OBTENER_GIROS_POR_ID_USUARIO =gql`
    query obtenerGirosPorIdUsuario($id:ID!){
        obtenerGirosPorIdUsuario(id:$id){
            id,
            usuario,
            nombres,
            apellidos,
            tipoDocumento,
            numeroDocumento,
            banco,
            tipoCuenta,
            numeroCuenta,
            valorGiro,
            comprobantePago,
            fechaEnvio
            tasaCompra
        }
    }
`;
