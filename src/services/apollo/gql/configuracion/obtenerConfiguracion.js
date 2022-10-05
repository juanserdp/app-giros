import { gql } from "@apollo/client";

export const OBTENER_CONFIGURACION = gql`
    query{
        configuracion: obtenerConfiguraciones{
            buzon,
            valorMinimoGiro,
            valorMinimoRecarga
        }
    }
`