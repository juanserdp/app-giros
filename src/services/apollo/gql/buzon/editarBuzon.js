import { gql } from "@apollo/client";

export const EDITAR_BUZON = gql`
    mutation EditarBuzon($buzon: [String!]){
        buzon: editarConfiguracion(buzon: $buzon){
            buzon
        }
    }
`;