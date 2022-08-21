import { gql } from "@apollo/client";

export const OBTENER_ASESOR_POR_ID = gql`
query obtenerAsesorPorId($id: ID!){
    obtenerAsesorPorId(id: $id){
        id
        nombres,
        apellidos,
        tipoDocumento,
        numeroDocumento,
        clave,
        saldo
    }
}
`;
