import { gql } from "@apollo/client";
export const RECARGAR_ASESOR =gql`
    mutation RecargarAsesor(
        $numeroDocumento: String!,
        $valorRecarga: Float!
    ){
        asesor: recargarAsesor(
            numeroDocumento: $numeroDocumento,
            valorRecarga: $valorRecarga
            ){
            saldo
        }
    }
`;