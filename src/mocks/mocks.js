import { GraphQLError } from "graphql";
import { LOGIN } from "../services/apollo/gql/login";
export const mocks = [
    {
        request: {
            query: LOGIN,
            variables: {
                numeroDocumento: "usuario",
                clave: "123456"
            }
        },
        result: {
            data: {
                login: {
                    token: null,
                    error: "Usuario o contraseña incorrectos",
                    __typename: 'login'
                }
            },
        },
    },
    {
        request: {
            query: LOGIN,
            variables: {
                numeroDocumento: "usuario",
                clave: "12345"
            }
        },
        result: {
            data: {
                "login": {
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzJkMmExNzFhOTZlNWM4YWVjNzFmNDciLCJlc3RhZG8iOiJBQ1RJVk8iLCJyb2wiOiJVU1VBUklPIiwiaWF0IjoxNjY2NjYzNTIxLCJleHAiOjE2NjY2ODUxMjF9.t4m6zUPjxQBaXknB83LqaWZMHH6Lxsj330jeUoHnwrQ",
                    "error": null
                }
            }
        }
    }
];