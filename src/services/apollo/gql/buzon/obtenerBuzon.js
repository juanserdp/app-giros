import { gql } from "@apollo/client";

export const OBTENER_BUZON =gql`
    query ObtenerBuzon{
        configuracion: obtenerConfiguracion{
            buzon
        }
    }
`;