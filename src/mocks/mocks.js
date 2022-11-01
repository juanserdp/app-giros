import { GraphQLError } from "graphql";
import { LOGIN } from "../services/apollo/gql/login";
import { OBTENER_USUARIO_POR_ID } from "../services/apollo/gql/usuario/obtenerUsuarioPorId";
import { OBTENER_USUARIOS } from "../services/apollo/gql/usuario/obtenerUsuarios";
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
    },
    {
        request: {
            query: OBTENER_USUARIO_POR_ID,
            variables: {
                id: "632d2a171a96e5c8aec71f47"
            }
        },
        result: {
            data: {
                "usuario": {
                    "id": "632d2a171a96e5c8aec71f47",
                    "asesor": {
                        "tasaVenta": 1,
                        "valorMinimoGiro": 11000
                    },
                    "nombres": "Juan",
                    "apellidos": "Rodriguez",
                    "tipoDocumento": "Cedula de Ciudadania",
                    "numeroDocumento": "109586",
                    "clave": "12345",
                    "saldo": 100000,
                    "deuda": 5000,
                    "capacidadPrestamo": 50000,
                    "estado": "ACTIVO",
                    "giros": {
                        "id": "612d10541a96e5c8aec23d1d"
                    },
                    "tasaVenta": 0.5
                }
            }
        }
    },
    {
        request: {
            query: OBTENER_USUARIOS,
            variables: {
                id: undefined
            }
        },
        result: {
            data: {
                "usuarios": [
                    {
                        "id": "632d10541a96e5c8aec71d1d",
                        "asesor": {
                            "id": "632d0bbe1a96e5c8aec71cea"
                        },
                        "nombres": "Diego Jaramillo",
                        "apellidos": "Delgado",
                        "tipoDocumento": "Cedula de Ciudadania",
                        "numeroDocumento": "109583511",
                        "clave": "$2b$12$fBEOF8BNtuJ9/hJsh9jaDOdRhCYwNKCrf5aMYM.VrHKnJc7quLV.u",
                        "saldo": 1500000,
                        "deuda": 0,
                        "capacidadPrestamo": 150000,
                        "estado": "ACTIVO",
                        "tasaVenta": 0.02
                    },
                    {
                        "id": "632d10a91a96e5c8aec71d28",
                        "asesor": {
                            "id": "632d0bbe1a96e5c8aec71cea"
                        },
                        "nombres": "Edinson Sebastian",
                        "apellidos": "Estupiñan Salazar",
                        "tipoDocumento": "Cedula de Ciudadania",
                        "numeroDocumento": "1095835122",
                        "clave": "$2b$12$fBEOF8BNtuJ9/hJsh9jaDOdRhCYwNKCrf5aMYM.VrHKnJc7quLV.u",
                        "saldo": 1250000,
                        "deuda": 5,
                        "capacidadPrestamo": 151000,
                        "estado": "ACTIVO",
                        "tasaVenta": 0.029
                    },
                    {
                        "id": "632d24f11a96e5c8aec71de7",
                        "asesor": {
                            "id": "632d0bda1a96e5c8aec71cf0"
                        },
                        "nombres": "Fabian",
                        "apellidos": "Fernandez",
                        "tipoDocumento": "Cedula de Ciudadania",
                        "numeroDocumento": "1095835123",
                        "clave": "$2b$12$fBEOF8BNtuJ9/hJsh9jaDOdRhCYwNKCrf5aMYM.VrHKnJc7quLV.u",
                        "saldo": 150000,
                        "deuda": 0,
                        "capacidadPrestamo": 45000,
                        "estado": "ACTIVO",
                        "tasaVenta": 0.002
                    },
                    {
                        "id": "632d25641a96e5c8aec71dfc",
                        "asesor": {
                            "id": "632d0c151a96e5c8aec71d07"
                        },
                        "nombres": "Gerarado",
                        "apellidos": "Gutierrez",
                        "tipoDocumento": "Cedula de Ciudadania",
                        "numeroDocumento": "1095835134",
                        "clave": "$2b$12$fBEOF8BNtuJ9/hJsh9jaDOdRhCYwNKCrf5aMYM.VrHKnJc7quLV.u",
                        "saldo": 500000,
                        "deuda": 2,
                        "capacidadPrestamo": 52000,
                        "estado": "ACTIVO",
                        "tasaVenta": 0.045
                    },
                    {
                        "id": "632d2a171a96e5c8aec71f47",
                        "asesor": {
                            "id": "632d29d71a96e5c8aec71f43"
                        },
                        "nombres": "xxx",
                        "apellidos": "xxx",
                        "tipoDocumento": "xxx",
                        "numeroDocumento": "usuario",
                        "clave": "$2b$12$fBEOF8BNtuJ9/hJsh9jaDOdRhCYwNKCrf5aMYM.VrHKnJc7quLV.u",
                        "saldo": 12888000,
                        "deuda": 0,
                        "capacidadPrestamo": 500000,
                        "estado": "ACTIVO",
                        "tasaVenta": 0.01
                    },
                    {
                        "id": "632d2cba1a96e5c8aec71f7d",
                        "asesor": {
                            "id": "632d0bbe1a96e5c8aec71cea"
                        },
                        "nombres": "Inez",
                        "apellidos": "in",
                        "tipoDocumento": "Cedula de Ciudadania",
                        "numeroDocumento": "1095835136",
                        "clave": "$2b$12$fBEOF8BNtuJ9/hJsh9jaDOdRhCYwNKCrf5aMYM.VrHKnJc7quLV.u",
                        "saldo": 123,
                        "deuda": 0,
                        "capacidadPrestamo": 2500,
                        "estado": "ACTIVO",
                        "tasaVenta": 0.02
                    },
                    {
                        "id": "632d32571a96e5c8aec71fd0",
                        "asesor": {
                            "id": "632d29d71a96e5c8aec71f43"
                        },
                        "nombres": "Jaime",
                        "apellidos": "Jimenez",
                        "tipoDocumento": "Cedula de Ciudadania",
                        "numeroDocumento": "1095835137",
                        "clave": "$2b$12$fBEOF8BNtuJ9/hJsh9jaDOdRhCYwNKCrf5aMYM.VrHKnJc7quLV.u",
                        "saldo": 625000,
                        "deuda": 0,
                        "capacidadPrestamo": 70000,
                        "estado": "ACTIVO",
                        "tasaVenta": 0.025
                    },
                    {
                        "id": "63327c60a5a3ec9c7dafded8",
                        "asesor": {
                            "id": "632d29d71a96e5c8aec71f43"
                        },
                        "nombres": "Piter",
                        "apellidos": "Perez",
                        "tipoDocumento": "Cedula de Ciudadania",
                        "numeroDocumento": "1095",
                        "clave": "$2b$12$zedBMKqoDfr4cBCCDei9guD1X0gP5S/zlUkGutAFn3DhFfT8QzVfK",
                        "saldo": 900000,
                        "deuda": 0,
                        "capacidadPrestamo": 2000,
                        "estado": "ACTIVO",
                        "tasaVenta": 0.15
                    },
                    {
                        "id": "633de4db2d0f6c9a2ca079e8",
                        "asesor": {
                            "id": "633ca067d0a35e729bc52078"
                        },
                        "nombres": "usuario33",
                        "apellidos": "usuario33",
                        "tipoDocumento": "Cedula de Ciudadania",
                        "numeroDocumento": "10955",
                        "clave": "$2b$12$79KsIr88ZoZ9ClyrgTPjP.vjBGl8fJ/u3VlLyUk5j5gG8p8V7mRg.",
                        "saldo": 500000,
                        "deuda": 0,
                        "capacidadPrestamo": 0,
                        "estado": "ACTIVO",
                        "tasaVenta": 1
                    },
                    {
                        "id": "6349860b62f4b07df384772a",
                        "asesor": {
                            "id": "632d29d71a96e5c8aec71f43"
                        },
                        "nombres": "Tadeo",
                        "apellidos": "Triana",
                        "tipoDocumento": "Cedula de Ciudadania",
                        "numeroDocumento": "109583",
                        "clave": "$2b$12$np9F12E.yA2kpNPPgNGbx.jrwLQf5tkox8Vo49fpHEoaVza7aUtZ6",
                        "saldo": 1,
                        "deuda": 0,
                        "capacidadPrestamo": 1,
                        "estado": "ACTIVO",
                        "tasaVenta": 1
                    }
                ]
            }
        }
    }
];