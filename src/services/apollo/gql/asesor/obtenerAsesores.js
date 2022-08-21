import { gql } from "@apollo/client";

export const OBTENER_ASESORES = gql`
    query{
        obtenerAsesores{
            id
            nombres
            apellidos
            tipoDocumento
            numeroDocumento
            clave
            saldo
            estado
        }
    }
`;