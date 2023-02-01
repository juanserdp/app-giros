import { gql } from "@apollo/client";

export const OBTENER_ASESOR_POR_ID = gql`
query obtenerAsesorPorId($id: ID!){
    asesor: obtenerAsesorPorId(id: $id){
        id
        nombres,
        apellidos,
        tipoDocumento,
        numeroDocumento,
        clave,
        saldo,
        estado,
        usuarios{
            id,
            nombres
        },
        tasaVenta
        valorMinimoGiro,
        tasaPreferencial,
        usarTasaPreferencial,
        movimientos{
            id,
            valor,
            saldo, 
            deuda,
            fechaEnvio,
            sentido,
            concepto
        }
    }
}
`;