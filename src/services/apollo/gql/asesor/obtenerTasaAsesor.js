import { gql } from "@apollo/client";

export const OBTENER_TASA_ASESOR = gql`
    query{
        asesor: obtenerTasaAsesorPorId{
            tasaVenta
        }
    }
`;