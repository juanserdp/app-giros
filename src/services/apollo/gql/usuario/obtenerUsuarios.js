import { gql } from "@apollo/client";

export const OBTENER_USUARIOS = gql`
    query{
        obtenerUsuarios{
            id,
            asesor,
            nombres,
            apellidos,
            tipoDocumento,
            numeroDocumento,
            clave,
            saldo,
            deuda,
            capacidadPrestamo,
            estado
        }
    }
`;