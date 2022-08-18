import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation login(
        $numeroDocumento: String!,
        $clave: String!
    ){
        login(numeroDocumento: $numeroDocumento, clave: $clave){
            token
            error
        }
    }
`;