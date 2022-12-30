import { gql } from "@apollo/client";

export const OBTENER_GIROS = gql`
    query {
        giros: obtenerGiros{
            id
            usuario
            nombres
            nombresRemitente
            apellidos
            apellidosRemitente
            tipoDocumento
            tipoDocumentoRemitente
            numeroDocumento
            numeroDocumentoRemitente
            banco
            tipoCuenta
            numeroCuenta
            valorGiro
            comprobantePago
            fechaEnvio
            estadoGiro
            tasaCompra
        }
    }
`;