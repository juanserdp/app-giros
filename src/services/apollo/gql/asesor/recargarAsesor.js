import { gql } from "@apollo/client";
export const RECARGAR_ASESOR =gql`
    mutation RecargarAsesor(
        $numeroDocumento: String!,
        $valorRecarga: Float!
    ){
        usuario: recargarAsesor(
            numeroDocumento: $numeroDocumento,
            valorRecarga: $valorRecarga
            ){
            nombres
            saldo
        }
    }
`;