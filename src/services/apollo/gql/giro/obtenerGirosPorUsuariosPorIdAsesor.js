import { gql } from "@apollo/client";

export const OBTENER_GIROS_POR_USUARIOS_POR_ID_ASESOR = gql`
    query ObtenerGirosPorUsuariosPorIdAsesor($id: ID!){
        giros: obtenerGirosPorUsuariosPorIdAsesor(id: $id){
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


