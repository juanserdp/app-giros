import '@testing-library/jest-dom';
import { screen, render } from "@testing-library/react";
import { InMemoryCache } from "@apollo/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MockedProvider } from "@apollo/client/testing";
import { InicioUsuario } from './InicioUsuario';
import { mocks } from '../../mocks/mocks';
import { SesionProvider } from '../../providers/SesionProvider';
import { currencyFormatter } from '../../util/currencyFormatter';
import userEvent from '@testing-library/user-event';

const cache = new InMemoryCache();

describe("InicioUsuario", () => {
    it("Obtiene las tarjetas del inicio", async () => {
        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <SesionProvider urol="USUARIO" uid={mocks[2].result.data.usuario.id}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={
                                <InicioUsuario />
                            } />
                        </Routes>
                    </BrowserRouter>
                </SesionProvider>
            </MockedProvider>
        );


        expect(await screen.findByText(/Saldo/i)).toBeInTheDocument();
        expect(await screen.findByText(currencyFormatter.format(mocks[2].result.data.usuario.saldo))).toBeInTheDocument();

        expect(await screen.findByText(/Tasa de Venta/i)).toBeInTheDocument();
        expect(await screen.findByText(mocks[2].result.data.usuario.tasaVenta)).toBeInTheDocument();

        expect(await screen.findByText(/Deuda/i)).toBeInTheDocument();
        expect(await screen.findByText(currencyFormatter.format(mocks[2].result.data.usuario.deuda))).toBeInTheDocument();

        expect(await screen.findByText(/Aquí puedes enviar giros a las personas/i)).toBeInTheDocument();

        screen.debug();
    });

    it("Muestra una advertencia si el campo esta vacio y se presiona enviar", async () => {
        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <SesionProvider urol="USUARIO" uid={mocks[2].result.data.usuario.id}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={
                                <InicioUsuario />
                            } />
                        </Routes>
                    </BrowserRouter>
                </SesionProvider>
            </MockedProvider>
        );
        const enviar = await screen.findByRole('button', { name: "Enviar" });

        userEvent.click(enviar);

        expect(await screen.findByText(/Este campo es obligatorio/i)).toBeInTheDocument();

        userEvent.type(screen.findByPlaceholderText("Ingrese el valor..."), "12000");

        expect(screen.getByText(/Okey!/)).toBeInTheDocument();

        screen.debug();
    });

    it("Muestra una alerta si el monto es menor al valor minimo del giro", async () => {
        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <SesionProvider urol="USUARIO" uid={mocks[2].result.data.usuario.id}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={
                                <InicioUsuario />
                            } />
                        </Routes>
                    </BrowserRouter>
                </SesionProvider>
            </MockedProvider>
        );
        const enviar = await screen.findByRole('button', { name: "Enviar" });

        userEvent.type(await screen.findByPlaceholderText("Ingrese el valor..."), "10100");

        userEvent.click(enviar);

        expect(await screen.findByText(/No puede hacer un giro con ese valor!/)).toBeInTheDocument();

        screen.debug();
    });

    it("Direcciona a la pantalla enviar giro con el valor del giro", async () => {
        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <SesionProvider urol="USUARIO" uid={mocks[2].result.data.usuario.id}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={
                                <InicioUsuario />
                            } />
                            <Route path="/enviar-giro/:id/:valorGiro" element={
                                <h1>Datos de la persona que recibe el giro</h1>
                            } />
                        </Routes>
                    </BrowserRouter>
                </SesionProvider>
            </MockedProvider>
        );
        const monto = 12000;

        const enviar = await screen.findByRole('button', { name: "Enviar" });

        const input = await screen.findByPlaceholderText("Monto en bolivares...");

        userEvent.type(await screen.findByPlaceholderText("Ingrese el valor..."), "12000");


        expect(input.value).toBe(currencyFormatter.format(monto / mocks[2].result.data.usuario.tasaVenta))

        userEvent.click(enviar);

        expect(await screen.findByText("Datos de la persona que recibe el giro")).toBeInTheDocument();
        expect(window.location.pathname).toBe(`/enviar-giro/${mocks[2].result.data.usuario.id}/${monto}`);

    });


})