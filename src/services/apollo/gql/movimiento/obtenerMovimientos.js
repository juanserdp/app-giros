import { gql } from "@apollo/client";

export const OBTENER_MOVIMIENTOS = gql`
    query{
        movimientos: obtenerMovimientos{
            id,
            valor,
            saldo,
            deuda,
            fechaEnvio,
            sentido,
            concepto
        }
    }
`;