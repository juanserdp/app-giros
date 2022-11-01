// COMPONENTS
import { InicioAdmin } from "../components/administrador/InicioAdmin";
import { InicioAsesor } from "../components/asesores/InicioAsesor";
import { InicioUsuario } from "../components/usuarios/InicioUsuario";
import { Footer } from "../components/Footer";
import { NavigationBar } from "../components/NavigationBar";

// FUNCIONES 
import { Sesion } from "../util/Sesion";
import React from "react";

export default function Inicio() {
    // INSTANCIAS
    const sesion = new Sesion();

    // CONSTANTES
    const rol = sesion.getRol();

    // FUNCIONES
    const inicio = (rol) => {
        switch (rol) {
            case "ADMINISTRADOR":
                return <InicioAdmin />;
            case "ASESOR":
                return <InicioAsesor />;
            case "USUARIO":
                return <InicioUsuario />;
            default:
                return null;
        }
    };

    return (
        <React.Fragment>
            <NavigationBar />
            {inicio(rol)}
            <Footer />
        </React.Fragment>
    )
}