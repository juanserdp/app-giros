import { gql } from "@apollo/client";

export const OBTENER_GIROS_POR_ID_USUARIO =gql`
    query obtenerGirosPorIdUsuario($id:ID!){
        giros: obtenerGirosPorIdUsuario(id:$id){
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
