import { gql } from "@apollo/client";

export const OBTENER_USUARIO_POR_ID = gql`
query obtenerUsuarioPorId($id: ID!){
    obtenerUsuarioPorId(id: $id){
        id,
        asesor{
            saldo
        }
        nombres,
        apellidos,
        tipoDocumento,
        numeroDocumento,
        clave,
        saldo,
        deuda,
        capacidadPrestamo,
        estado,
        giros{
            id
        }
    }
}
`;