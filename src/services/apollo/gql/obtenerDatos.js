import { gql } from "@apollo/client";

export const OBTENER_DATOS = gql`
    query{
        asesores: obtenerAsesores{
            id
            #nombres
            #apellidos
            #tipoDocumento
            numeroDocumento
            #clave
            #saldo
            #estado
        }
        usuarios: obtenerUsuarios{
            id
            #asesor
            #nombres
            #apellidos
            #tipoDocumento
            #numeroDocumento
            #clave
            #saldo
            #deuda
            #capacidadPrestamo
            #estado
        }
        giros: obtenerGiros{
            id
            #usuario
            #nombres
            #apellidos
            #tipoDocumento
            #numeroDocumento
            #banco
            #tipoCuenta
            #numeroCuenta
            valorGiro
            #comprobantePago
            fechaEnvio
        }
    }
`;