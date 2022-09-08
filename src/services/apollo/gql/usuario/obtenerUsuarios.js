import { gql } from "@apollo/client";

export const OBTENER_USUARIOS = gql`
    query{
        obtenerUsuarios{
            id,
            asesor{
                id
            }
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