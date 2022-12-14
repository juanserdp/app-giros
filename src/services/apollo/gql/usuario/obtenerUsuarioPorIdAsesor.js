import { gql } from "@apollo/client";

export const OBTENER_USUARIOS_POR_ID_ASESOR = gql`
    query obtenerUsuariosPorIdAsesor($id:ID!){
        usuarios:obtenerUsuariosPorIdAsesor(id:$id){
            id,
            asesor{
                id
            },
            nombres,
            apellidos,
            tipoDocumento,
            numeroDocumento,
            clave,
            saldo,
            deuda,
            capacidadPrestamo,
            estado,
            tasaPreferencial,
            usarTasaPreferencial,
            tasaVenta
        }
    }
`;

