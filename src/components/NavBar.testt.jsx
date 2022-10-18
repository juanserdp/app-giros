import { screen, render } from "@testing-library/react";
import Asesores from "../pages/Asesores";
import { NavBar } from "./NavBar";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const httpLink = createHttpLink({
    uri: 'http://192.168.0.24:4000/graphql'
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
});

describe("NavBar Test", () => {
    it("Muestra las opciones si el usuario es un asesor", () => {
        render(
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                    
                            <NavBar />
                      
                    } />
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
        );
        expect(screen.getByText("inicio")).toBeInTheDocument();
    })
})