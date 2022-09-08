import { gql } from "@apollo/client";

export const OBTENER_CONFIGURACION = gql`
    query{
        configuracion: obtenerConfiguracion{
            buzon,
            valorMinimoGiro,
            valorMinimoRecarga
        }
    }
`