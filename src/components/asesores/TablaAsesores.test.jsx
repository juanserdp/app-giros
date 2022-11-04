import { InMemoryCache } from "@apollo/client"
import { MockedProvider } from "@apollo/client/testing"
import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { mocks } from "../../mocks/mocks"
import { SesionProvider } from "../../providers/SesionProvider";
import { TablaAsesores } from "./TablaAsesores";


const cache = new InMemoryCache();

describe("Tabla Asesores", () => {
    it("Muestra los datos de los usuarios por filas", () => {

        const asesores = [{
            id: "63327c60a5a3ec9c7dafded8",
            nombres: "falcon",
            apellidos: "perez",
            tipoDocumento: "Tarjeta de Identidad",
            numeroDocumento: "111111111",
            clave: "Tequiero11111111111111",
            saldo: 12345154,
            estado: "ACTIVO"
        }];

        const refetch = jest.fn();
        const loading = false;
        const handleShow = jest.fn();

        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <SesionProvider>
                    <MemoryRouter initialEntries={["/asesores"]}>
                        <Routes >
                            <Route
                                path="/asesores"
                                element={
                                    <TablaAsesores
                                        asesores={asesores}
                                        refetch={refetch}
                                        loading={loading}
                                        handleShow={handleShow}
                                    />
                                } />
                        </Routes>
                    </MemoryRouter>
                </SesionProvider>
            </MockedProvider>
        );
    })
})