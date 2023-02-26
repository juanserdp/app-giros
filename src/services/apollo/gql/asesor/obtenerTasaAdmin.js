import { gql } from "@apollo/client";

export const OBTENER_TASA_ADMIN = gql`
    query{
        admin: obtenerTasaAdmin{
            tasaVenta
        }
    }
`;