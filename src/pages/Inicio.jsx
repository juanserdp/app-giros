// COMPONENTS
import { InicioAdmin } from "../components/administrador/InicioAdmin";
import { InicioAsesor } from "../components/asesores/InicioAsesor";
import { InicioUsuario } from "../components/usuarios/InicioUsuario";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";

// FUNCIONES 
import { Sesion } from "../util/Sesion";

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
    else if (rol === "USUARIO") {
        return (
            <>
                <NavBar />
                <InicioUsuario />
                <Footer />
            </>
        )
    }
    else if (rol === "OPERARIO") {
        return (
            <>
                <NavBar />
                <Footer />
            </>
        )
    }
}