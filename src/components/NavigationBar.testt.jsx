import '@testing-library/jest-dom';
import { screen, render } from "@testing-library/react";
import { NavigationBar } from "./NavigationBar";
import { InMemoryCache } from "@apollo/client";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { MockedProvider } from "@apollo/client/testing";
import { PrivatizarPorRol } from "../routes/PrivatizarPorRol";
import Inicio from "../pages/Inicio";
import { InicioUsuario } from "./usuarios/InicioUsuario";
import { mocks } from "../mocks/mocks";
import { Footer } from './Footer';
import ErrorBoundary from "./errors/ErrorBoundary";


const cache = new InMemoryCache();

describe("NavBar", () => {
    it("Muestra las opciones si el usuario es un asesor", () => {
        localStorage.setItem("jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzJkMmExNzFhOTZlNWM4YWVjNzFmNDciLCJlc3RhZG8iOiJBQ1RJVk8iLCJyb2wiOiJVU1VBUklPIiwiaWF0IjoxNjY2NjYzNTIxLCJleHAiOjE2NjY2ODUxMjF9.t4m6zUPjxQBaXknB83LqaWZMHH6Lxsj330jeUoHnwrQ")
        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={
                            <ErrorBoundary>
                                <NavigationBar />
                            </ErrorBoundary>
                        } />
                        {/* <Route path="/inicio" element={
                            <div>inicio</div>
                        } /> */}
                    </Routes>
                </BrowserRouter>
            </MockedProvider>
        );
        screen.debug();
        expect(screen.queryByText(/Inicio/i)).toBeInTheDocument();
    })
})