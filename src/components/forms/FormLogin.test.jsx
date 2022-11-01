import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/Login';
import { InMemoryCache } from "@apollo/client";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MockedProvider } from "@apollo/client/testing";
import { mocks } from '../../mocks/mocks';

const cache = new InMemoryCache();

describe("FormLogin", () => {
    it("Obtiene un error cuando doy click en el boton: 'ingresar' sin llenar los campos", () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false} cache={cache}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </MockedProvider>
        );
        userEvent.click(screen.getByText(/Ingresar/));
        expect(screen.getByText(/¡Todos los campos son obligatorios!/)).toBeInTheDocument();
    });
    it("Obtiene un error cuando doy click en el boton: 'ingresar' con unas credenciales incorrectas", async () => {
        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </MockedProvider>
        );
        userEvent.type(screen.getByPlaceholderText(/numero/), 'usuario');
        userEvent.type(screen.getByPlaceholderText(/contraseña/), '123456');

        const ingresar = screen.getByText(/Ingresar/);

        userEvent.click(ingresar);

        expect(ingresar).toBeDisabled();
        expect(ingresar).toHaveTextContent("Cargando...");

        expect(await screen.findByText(/Usuario o contraseña incorrectos/)).toBeInTheDocument();
    });
    it('Ingresa al inicio de la aplicacion si las credenciales son correctas', async () => {
        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/inicio" element={
                            <h1>Inicio</h1>
                        } />
                    </Routes>
                </BrowserRouter>
            </MockedProvider>
        );

        userEvent.type(screen.getByPlaceholderText("Ingrese el numero"), 'usuario');
        userEvent.type(screen.getByPlaceholderText("Ingrese la contraseña"), '12345');

        const ingresar = screen.getByText(/Ingresar/);

        userEvent.click(ingresar);
        expect(ingresar).toBeDisabled();
        expect(ingresar).toHaveTextContent("Cargando...");

        expect(await screen.findByText("Inicio")).toBeInTheDocument();
        expect(window.location.pathname).toBe("/inicio");
        expect(localStorage.getItem("jwt")).not.toBeNull();
        screen.debug();
    }, 30000);
})