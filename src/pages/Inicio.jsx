import { NavBar } from "../components/NavBar";
import { Sesion } from "../util/Sesion";
import { InicioAdmin } from "../components/InicioAdmin";
import { InicioAsesor } from "../components/asesores/InicioAsesor";
import { InicioUsuario } from "../components/usuarios/InicioUsuario";
import { Footer } from "../components/Footer";
import { useEffect } from "react";

export default function Inicio() {
    const sesion = new Sesion();
    const rol = sesion.getRol();

    
    if (rol === "ADMINISTRADOR") {
        return (
            <>
                <NavBar />
                <InicioAdmin />
                <Footer />
            </>
        )
    }
    else if (rol === "ASESOR") {
        return (
            <>
                <NavBar />
                <InicioAsesor />
                <Footer />
            </>
        )
    }
    else {
        return (
            <>
                <NavBar />
                <InicioUsuario />
                <Footer />
            </>
        )
    }
}