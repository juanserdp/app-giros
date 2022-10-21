import { FormLogin } from './FormLogin';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/Login';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Inicio from '../../pages/Inicio';
import { PrivatizarPorRol } from '../../routes/PrivatizarPorRol';

const httpLink = createHttpLink({
    uri: 'http://192.168.0.24:4000/graphql'
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
});
describe("FormLogin", () => {
    it('Al dar el boton ingresar sin escribir las credneciales mostrara un error', () => {
        render(
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={
                            <Login>
                                <FormLogin />
                            </Login>
                        } />
                    </Routes>
                </BrowserRouter>
            </ApolloProvider>
            ,
        );
        userEvent.click(screen.getByText(/Ingresar/));
        expect(screen.getByText(/¡Todos los campos son obligatorios!/)).toBeInTheDocument();
    });
    it('Muestra un modal con un error al pasarle unas credenciales incorrectas', async () => {
        render(
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={
                            <Login />
                        } />
                    </Routes>
                </BrowserRouter>
            </ApolloProvider>
            ,
        );
        userEvent.type(screen.getByPlaceholderText(/numero/), 'usuario');
        userEvent.type(screen.getByPlaceholderText(/contraseña/), '123');

        const buttonIngresar = screen.getByText(/Ingresar/);

        userEvent.click(buttonIngresar);

        expect(buttonIngresar).toBeDisabled();
        expect(buttonIngresar).toHaveTextContent("Cargando...");

        expect(await screen.findByText(/Usuario o contraseña incorrectos/)).toBeInTheDocument();
    });

    it('Ingresa al inicio de la aplicacion si las credenciales son correctas', async () => {
        render(
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={
                            <Login>
                                <FormLogin />
                            </Login>
                        } />
                        <Route
                            path="/inicio"
                            element={
                                <PrivatizarPorRol rolAccess="USUARIO">
                                    <Inicio />
                                </PrivatizarPorRol>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </ApolloProvider>,
        );
        screen.debug();

        userEvent.type(screen.getByPlaceholderText("Ingrese el numero"), 'asesor');
        userEvent.type(screen.getByPlaceholderText("Ingrese la contraseña"), '12345');

        const buttonIngresar = screen.getByText(/Ingresar/);

        userEvent.click(buttonIngresar);

        expect(buttonIngresar).toBeDisabled();
        expect(buttonIngresar).toHaveTextContent("Cargando...");
        screen.debug();
        expect(await screen.findByText(/Enviar Giro/)).toBeInTheDocument();
    });

})
