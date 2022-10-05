import { gql } from "@apollo/client";

export const OBTENER_BUZON =gql`
    query ObtenerBuzon{
        configuracion: obtenerConfiguraciones{
            buzon
        }
    }
`;