import { gql } from "@apollo/client";

export const EDITAR_TASA_VENTA = gql`
    mutation editarAsesor(
        $id: ID!
        $tasaVenta: Float!
    ){
        tasa: editarAsesor(
            id: $id,
            tasaVenta: $tasaVenta,
        ){
            tasaVenta
        }
    }
`;