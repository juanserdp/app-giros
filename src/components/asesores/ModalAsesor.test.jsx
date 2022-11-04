import '@testing-library/jest-dom';
import { InMemoryCache } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { mocks } from '../../mocks/mocks';
import { SesionProvider } from '../../providers/SesionProvider';
import userEvent from '@testing-library/user-event';
import { ModalAsesor } from './ModalAsesor';
const cache = new InMemoryCache();

const asesor1231 = {
    id: "632d09bde690d71065208f78",
    nombres: "xxx",
    apellidos: "xxx",
    tipoDocumento: "xxx",
    numeroDocumento: "admin",
    clave: "$2b$12$Kuxh62R9pVjVstpPWREgA.LVNYaXF8YKWsH41gGrr687o2qPcLooS",
    saldo: 0,
    usuarios: [],
    estado: "ACTIVO",
    tasaVenta: 0,
    valorMinimoGiro: 1
};

const asesor = {
    id: "",
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    clave: "",
    saldo: ""
};

describe("Modal Asesor", () => {
    it("Envia un formulario exitoso para crear un asesor", async () => {
        const asesores = [{}];
        const refetch = jest.fn();
        const loading = false;
        const handleClose = jest.fn();

        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <SesionProvider urol="ADMINISTRADOR" uid="123">
                    <MemoryRouter initialEntries={["/asesores/crear"]}>
                        <Routes>
                            <Route
                                path="/asesores/crear"
                                element={
                                    <ModalAsesor
                                        asesores={asesores}
                                        refetch={refetch}
                                        loading={loading}
                                        handleClose={handleClose}
                                        show={true} />
                                } />
                        </Routes>
                    </MemoryRouter>
                </SesionProvider>
            </MockedProvider>
        );

        const datosParaCrearAsesor = mocks[4].request.variables;

        const nombresInput = screen.getByLabelText("Nombres");
        const apellidosInput = screen.getByLabelText("Apellidos");
        const tipoDocumentoInput = screen.getByLabelText("Tipo de Documento");
        const numeroDocumentoInput = screen.getByLabelText("Numero de Documento");
        const claveInput = screen.getByLabelText("Contraseña");
        const saldoInput = screen.getByLabelText("Saldo");

        userEvent.type(nombresInput, datosParaCrearAsesor.nombres);
        userEvent.type(apellidosInput, datosParaCrearAsesor.apellidos);
        userEvent.selectOptions(tipoDocumentoInput, datosParaCrearAsesor.tipoDocumento);
        userEvent.type(numeroDocumentoInput, datosParaCrearAsesor.numeroDocumento);
        userEvent.type(claveInput, datosParaCrearAsesor.clave);
        // userEvent.type(saldoInput, datosParaCrearAsesor.saldo);

        fireEvent.change(saldoInput, { target: { value: datosParaCrearAsesor.saldo } });

        const botonAceptar = screen.getByRole("button", { name: "Aceptar" });

        userEvent.click(botonAceptar);
        expect(botonAceptar).toBeDisabled();
        expect(botonAceptar).toHaveTextContent("Cargando...");

        expect(await screen.findByText(/El asesor ha sido creado/i)).toBeInTheDocument();
        expect(handleClose).toHaveBeenCalledTimes(1);
        expect(refetch).toHaveBeenCalledTimes(1);
    });

    it("Muestra un venta de error si intenta enviar el formulario con campos vacios", async () => {
        const asesores = [{}];
        const refetch = jest.fn();
        const loading = false;
        const handleClose = jest.fn();

        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <SesionProvider urol="ADMINISTRADOR" uid="123">
                    <MemoryRouter initialEntries={["/asesores/crear"]}>
                        <Routes>
                            <Route
                                path="/asesores/crear"
                                element={
                                    <ModalAsesor
                                        asesores={asesores}
                                        refetch={refetch}
                                        loading={loading}
                                        handleClose={handleClose}
                                        show={true} />
                                } />
                        </Routes>
                    </MemoryRouter>
                </SesionProvider>
            </MockedProvider>
        );

        const botonAceptar = screen.getByRole("button", { name: "Aceptar" });
        const botonCerrar = screen.getByRole("button", { name: "Cerrar" });

        userEvent.click(botonAceptar);

        expect(await screen.findByText(/Todos los campos son obligatorios!/i)).toBeInTheDocument();
        expect(handleClose).toHaveBeenCalledTimes(0);
        expect(refetch).toHaveBeenCalledTimes(0);

    });

    it("Envia un formulario exitoso para editar un asesor", async () => {

        const refetch = jest.fn();
        const loading = false;
        const handleClose = jest.fn();

        const { id, asesor } = mocks[5].request.variables;

        const asesores = [{
            id: id,
            nombres: "falcon",
            apellidos: "perez",
            tipoDocumento: "Tarjeta de Identidad",
            numeroDocumento: "111111111",
            clave: "Tequiero11111111111111",
            saldo: 12345154,
            estado: "ACTIVO"
        }];

        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <SesionProvider urol="ADMINISTRADOR" uid="123">
                    <MemoryRouter initialEntries={[`/asesores/editar/${id}`]}>
                        <Routes>
                            <Route
                                path="/asesores/editar/:id"
                                element={
                                    <ModalAsesor
                                        asesores={asesores}
                                        refetch={refetch}
                                        loading={loading}
                                        handleClose={handleClose}
                                        show={true} />
                                } />
                        </Routes>
                    </MemoryRouter>
                </SesionProvider>
            </MockedProvider>
        );

        expect(screen.getByText(/Editar Asesor/i)).toBeInTheDocument();

        const nombresInput = screen.getByLabelText("Nombres");
        const apellidosInput = screen.getByLabelText("Apellidos");
        const tipoDocumentoInput = screen.getByLabelText("Tipo de Documento");
        const numeroDocumentoInput = screen.getByLabelText("Numero de Documento");
        const claveInput = screen.getByLabelText("Contraseña");
        const saldoInput = screen.getByLabelText("Saldo");
        const estado = screen.getByLabelText("Estado");

        fireEvent.change(nombresInput, { target: { value: asesor.nombres } });
        fireEvent.change(apellidosInput, { target: { value: asesor.apellidos } });
        userEvent.selectOptions(tipoDocumentoInput, asesor.tipoDocumento);
        fireEvent.change(numeroDocumentoInput, { target: { value: asesor.numeroDocumento } });
        fireEvent.change(claveInput, { target: { value: asesor.clave } });
        fireEvent.change(saldoInput, { target: { value: asesor.saldo } });
        userEvent.selectOptions(estado, asesor.estado);

        const botonAceptar = screen.getByRole("button", { name: "Aceptar" });
        userEvent.click(botonAceptar);
        expect(botonAceptar).toBeDisabled();
        expect(botonAceptar).toHaveTextContent("Cargando...");

        expect(await screen.findByText(/El asesor ha sido editado/i)).toBeInTheDocument();
        expect(handleClose).toHaveBeenCalledTimes(1);
        expect(refetch).toHaveBeenCalledTimes(1);
    });

    it("Muestra un venta de error si intenta enviar el formulario sin editar un campo", async () => {
        const refetch = jest.fn();
        const loading = false;
        const handleClose = jest.fn();

        const { id } = mocks[5].request.variables;

        const asesores = [{
            id: id,
            nombres: "falcon",
            apellidos: "perez",
            tipoDocumento: "Tarjeta de Identidad",
            numeroDocumento: "111111111",
            clave: "Tequiero11111111111111",
            saldo: 12345154,
            estado: "ACTIVO"
        }];

        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <SesionProvider urol="ADMINISTRADOR" uid="123">
                    <MemoryRouter initialEntries={[`/asesores/editar/${id}`]}>
                        <Routes>
                            <Route
                                path="/asesores/editar/:id"
                                element={
                                    <ModalAsesor
                                        asesores={asesores}
                                        refetch={refetch}
                                        loading={loading}
                                        handleClose={handleClose}
                                        show={true} />
                                } />
                        </Routes>
                    </MemoryRouter>
                </SesionProvider>
            </MockedProvider>
        );

        const botonAceptar = screen.getByRole("button", { name: "Aceptar" });
        screen.debug();

        userEvent.click(botonAceptar);

        expect(screen.getByText(/No ha editado ningun campo!/i)).toBeInTheDocument();
        expect(handleClose).toHaveBeenCalledTimes(0);
        expect(refetch).toHaveBeenCalledTimes(0);
    });

    it("Cierra el modal exitosamente", async () => {
        const asesores = [{}];
        const refetch = jest.fn();
        const loading = false;
        const handleClose = jest.fn();

        render(
            <MockedProvider mocks={mocks} cache={cache}>
                <SesionProvider urol="ADMINISTRADOR" uid="123">
                    <MemoryRouter initialEntries={["/asesores/crear"]}>
                        <Routes>
                            <Route
                                path="/asesores/crear"
                                element={
                                    <ModalAsesor
                                        asesores={asesores}
                                        refetch={refetch}
                                        loading={loading}
                                        handleClose={handleClose}
                                        show={true} />
                                } />
                            <Route
                                path="/asesores"
                                element={
                                    <div>Asesores</div>
                                } />
                        </Routes>
                    </MemoryRouter>
                </SesionProvider>
            </MockedProvider>
        );

        const botonCerrar = screen.getByRole("button", { name: "Cerrar" });

        userEvent.click(botonCerrar);

        expect(screen.getByText(/Asesores/i)).toBeInTheDocument();
        expect(handleClose).toHaveBeenCalledTimes(1);
        expect(refetch).toHaveBeenCalledTimes(0);
    });
});