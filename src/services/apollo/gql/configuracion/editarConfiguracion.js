import { gql } from "@apollo/client";

export const EDITAR_CONFIGURACION =gql`
    mutation EditarConfiguracion(
        $buzon: [String]
        $valorMinimoGiro: Float
        $valorMinimoRecarga: Float
        ){
        configuracion: editarConfiguracion(
            buzon: $buzon,
            valorMinimoGiro: $valorMinimoGiro,
            valorMinimoRecarga: $valorMinimoRecarga
        ){
            buzon
            valorMinimoGiro
            valorMinimoRecarga
        }
    }
`