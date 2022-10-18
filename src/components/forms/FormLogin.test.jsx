import TestRenderer from 'react-test-renderer';
import { FormLogin } from './FormLogin';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/Login';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { buscarTagHtml } from '../../util/buscarElementoHtml';

const httpLink = createHttpLink({
    uri: 'http://192.168.0.24:4000/graphql'
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
});
describe("FormLogin", () => {
    it('Muestra un modal de error al pasarle una contraseña mala', () => {
        const component = TestRenderer.create(
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
        let tree = component.toJSON();
        // RECORDARME -> INGRESAR
        TestRenderer.act(() => {
            const inputs = buscarTagHtml(tree, "input");
            const checkbox = inputs.filter(i => i.props.type === "checkbox");
            console.log(checkbox)
            checkbox[0].props.defaultChecked = true;
        })
        TestRenderer.act(() => {
            const button = buscarTagHtml(tree, "button");
            button[0].props.onClick();
        });
        expect(tree).toMatchSnapshot();

        // NO RECORDARME -> INGRESAR
        TestRenderer.act(() => {
            const inputs = buscarTagHtml(tree, "input");
            const checkbox = inputs.filter(i => i.props.type === "checkbox");
            console.log(checkbox)
            checkbox[0].props.defaultChecked = false;
        })
        TestRenderer.act(() => {
            const button = buscarTagHtml(tree, "button");
            button[0].props.onClick();
        });
        expect(tree).toMatchSnapshot();
    });
    it('Muestra un modal de error al pasarle una contraseña mala', () => {
        const component = TestRenderer.create(
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
        let tree = component.toJSON();
        // NO RECORDARME -> INGRESAR
        TestRenderer.act(() => {
            const inputs = buscarTagHtml(tree, "input");
            const checkbox = inputs.filter(i => i.props.type === "checkbox");
            console.log(checkbox)
            checkbox[0].props.defaultChecked = false;
        })
        TestRenderer.act(() => {
            const button = buscarTagHtml(tree, "button");
            button[0].props.onClick();
        });
        expect(tree).toMatchSnapshot();
    });
})
