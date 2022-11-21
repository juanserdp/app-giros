import { gql } from "@apollo/client";

export const OBTENER_DATOS_POR_ASESOR = gql`
  query obtenerDatosPorAsesor($id:ID!){
        usuarios:obtenerUsuariosPorIdAsesor(id:$id){
            id,
            asesor{
                id
            },
            nombres,
            apellidos,
            tipoDocumento,
            numeroDocumento,
            clave,
            saldo,
            deuda,
            capacidadPrestamo,
            estado,
            #tasaVenta
        }
    giros: obtenerGirosPorUsuariosPorIdAsesor(id: $id){
                id,
                usuario,
                nombres,
                apellidos,
                tipoDocumento,
                numeroDocumento,
                banco,
                tipoCuenta,
                numeroCuenta,
                valorGiro,
                comprobantePago,
                fechaEnvio,
                #tasaCompra,
                estadoGiro
        }
  }
`;
