import '@testing-library/jest-dom';
import { InMemoryCache } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { mocks } from "../mocks/mocks";
import { SesionProvider } from "../providers/SesionProvider";
import Usuarios from "./Usuarios";
import { getAllByRole, waitFor, findByText } from '@testing-library/dom';
const cache = new InMemoryCache();

describe("Usuarios", () => {
    it("Obtener usuarios como administrador y mostrarlos por la tabla", async () => {
        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <SesionProvider urol="ADMINISTRADOR" uid="123">
                    <MemoryRouter initialEntries={["/usuarios"]}>
                        <Routes>
                            <Route path="/usuarios" element={
                                <Usuarios />
                            } />
                        </Routes>
                    </MemoryRouter>
                </SesionProvider>
            </MockedProvider>
        );
        screen.debug();

        // const rows2 = await screen.findAllByRole((content, element)=>{
        //     return element.className === "MuiDataGrid-row"
        // })
        // const rows = await screen.findAllByRole("row");
        // const array = document.querySelector(".MuiDataGrid-main");

        // expect(await findByText(array, "Delgado")).toBeInTheDocument();
        // screen.logTestingPlaygroundURL()
        // expect(await screen.findByText("Diego")).toBeInTheDocument();
        // expect(await screen.findByText("usuario33")).toBeInTheDocument();
        // expect(await screen.findByText("Jimenez")).toBeInTheDocument();
        // console.log(rows[0].innerHTML);
        // console.log(rows2.length);
        // await waitFor(() => {
        //     screen.getByText("Delgado");
        //     //screen.getByText("109583511");
        //     screen.getByText("Edinson Sebastian");
        //     screen.getByText(/Gerarado/i);
        // })
        // await waitFor(()=>{
        //     const array = document.querySelector(".MuiDataGrid-main");
        //     const rows3 = getAllByRole(array, "row");

        //     const rows4 = getAllByRole(array,(content, element)=>{
        //         return element.className === "MuiDataGrid-row"
        //     })
        //     console.log(rows4.length);
        //     console.log(rows3.length);
        //     console.log(array.innerHTML);
        // });

    })
});