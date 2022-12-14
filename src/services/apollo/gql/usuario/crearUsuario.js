import { gql } from "@apollo/client";

export const CREAR_USUARIO= gql`
    mutation crearUsuario(
        $asesor: ID!
        $nombres: String!
        $apellidos: String!
        $tipoDocumento: String!
        $numeroDocumento: String!
        $clave: String!
        $saldo: Float!
        #$deuda: Float!
        $capacidadPrestamo: Float!
        #$estado: String!
        #$tasaVenta: Float!
    ){
        crearUsuario(
            asesor: $asesor,
            nombres: $nombres,
            apellidos: $apellidos,
            tipoDocumento: $tipoDocumento,
            numeroDocumento: $numeroDocumento,
            clave: $clave,
            saldo: $saldo,
            #deuda: $deuda,
            capacidadPrestamo: $capacidadPrestamo,
            #estado: $estado
            #tasaVenta: $tasaVenta
            ){
                id
                nombres
                apellidos
                tipoDocumento
                numeroDocumento
                clave
                saldo
                deuda
                capacidadPrestamo
                estado
                tasaPreferencial
                usarTasaPreferencial
        }
    }
`;