import { gql } from "@apollo/client";
export const RECARGAR_USUARIO = gql`
    mutation RecargarUsuario(
        $numeroDocumento: String!,
        $valorRecarga: Float!
        ){
        usuario: recargarUsuario(
            numeroDocumento: $numeroDocumento,
            valorRecarga: $valorRecarga
            ){
            nombres
            saldo
        }
    }
`;