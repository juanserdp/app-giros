import { gql } from "@apollo/client";

export const OBTENER_GIROS = gql`
    query {
        giros: obtenerGiros{
            id,
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
            fechaEnvio,
            tasaCompra,
            estadoGiro
        }
    }
`;