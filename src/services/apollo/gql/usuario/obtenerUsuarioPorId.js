import { gql } from "@apollo/client";

export const OBTENER_USUARIO_POR_ID = gql`
query obtenerUsuarioPorId($id: ID!){
    usuario: obtenerUsuarioPorId(id: $id){
        id,
        asesor{
            tasaVenta
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
        },
        tasaVenta
    }
}
`;